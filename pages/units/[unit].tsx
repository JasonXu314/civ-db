import Layout from '$/Layout/Layout';
import styles from '&/UniqueUnitsUnit.module.scss';
import axios from 'axios';
import { MongoClient, WithId } from 'mongodb';
import { GetServerSideProps, NextPage } from 'next';
import DefaultErrorPage from 'next/error';
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
				{(() => {
					if (unit) {
						return (
							<div className={styles.unit}>
								<h1 className={styles.name}>{unit.name}</h1>
								<div className={styles.row}>
									<img src={unit.media.portrait} />
									<img src={unit.media.icon} />
								</div>
								<div className={styles.stats}>
									<div>
										<h4>Strength:</h4>
										{unit.strength}
									</div>
									{unit.rangedStrength && (
										<div>
											<h4>Ranged Strength: </h4> {unit.rangedStrength}
										</div>
									)}
									{unit.bombardStrength && (
										<div>
											<h4>Bombard Strength: </h4> {unit.bombardStrength}
										</div>
									)}
									<h4>Movement: </h4> {unit.movement}
									{unit.range && (
										<div>
											<h4>Range: </h4> {unit.range}
										</div>
									)}
									<div>
										<h4>Era:</h4>
										{unit.era}
									</div>
								</div>
							</div>
						);
					} else if (unitError) {
						return <div className={styles.error}>Error Loading Unit Data...</div>;
					} else {
						return <div className={styles.loading}>Loading Unit Data...</div>;
					}
				})()}
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
