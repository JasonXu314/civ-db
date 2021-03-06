import Layout from '$/Layout/Layout';
import UnitDisplay from '$/UnitDisplay/UnitDisplay';
import styles from '&/UnitsUnit.module.scss';
import axios from 'axios';
import { MongoClient, WithId } from 'mongodb';
import { GetServerSideProps, NextPage } from 'next';
import DefaultErrorPage from 'next/error';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { fetcherFn } from 'swr/dist/types';

const fetcher: fetcherFn<Unit> = async (url) => {
	return (await axios.get<Unit>(url)).data;
};

type UnitInitialProps = SuccessInitialProps | ErroredInitialProps;

interface SuccessInitialProps {
	initialUnit: Unit;
	error: false;
}

interface ErroredInitialProps {
	initialUnit: null;
	error: true;
}

const UnitPage: NextPage<UnitInitialProps> = ({ initialUnit, error }) => {
	const router = useRouter();
	const { data: unit, error: unitError } = useSWR(`/api/units/${router.query.unit}`, fetcher, {
		initialData: initialUnit,
		shouldRetryOnError: !error,
		revalidateOnFocus: !error,
		revalidateOnReconnect: !error
	});

	if (error) {
		return <DefaultErrorPage statusCode={404} />;
	}
	return (
		<Layout title={`Civ DB | ${router.query.unit}`}>
			<div className={styles.main}>
				{unit ? (
					<UnitDisplay unit={unit} />
				) : unitError ? (
					<div className={styles.error}>Error Loading Unit Data...</div>
				) : (
					<div className={styles.loading}>Loading Unit Data...</div>
				)}
				<Link href="/units">
					<a>Back to Units</a>
				</Link>
			</div>
		</Layout>
	);
};

export const getServerSideProps: GetServerSideProps<UnitInitialProps> = async ({ params, res }) => {
	const mongoClient = await MongoClient.connect(process.env.MONGODB_URL!, { useUnifiedTopology: true });

	const queryUnit = params!.unit as string;

	const foundUnit = (
		await mongoClient
			.db('civ-db')
			.collection<WithId<Unit>>('units')
			.find({}, { projection: { _id: false } })
			.toArray()
	).find((unit) => unit.name.toLowerCase() === queryUnit.toLowerCase() || unit.name.toLowerCase().includes(queryUnit.toLowerCase()));

	if (!foundUnit) {
		const uniqueUnit = (
			await mongoClient
				.db('civ-db')
				.collection<WithId<Unit>>('unique-units')
				.find({}, { projection: { _id: false } })
				.toArray()
		).find((unit) => unit.name.toLowerCase() === queryUnit.toLowerCase() || unit.name.toLowerCase().includes(queryUnit.toLowerCase()));

		if (!uniqueUnit) {
			return {
				props: {
					initialUnit: null,
					error: true
				}
			};
		} else {
			res.writeHead(301, {
				Location: `/unique-units/${uniqueUnit.name}`
			}).end();
			return {
				props: {
					initialUnit: uniqueUnit,
					error: false
				}
			};
		}
	}

	if (queryUnit !== foundUnit.name) {
		res.writeHead(301, {
			Location: `/units/${foundUnit.name}`
		}).end();
		return {
			props: {
				initialUnit: foundUnit,
				error: false
			}
		};
	}

	mongoClient.close();
	return {
		props: {
			initialUnit: foundUnit,
			error: false
		}
	};
};

export default UnitPage;
