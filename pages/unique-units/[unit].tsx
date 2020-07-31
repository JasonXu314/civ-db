import Layout from '$/Layout/Layout';
import ResourceIcon from '$/ResourceIcon/ResourceIcon';
import YieldIcon from '$/YieldIcon/YieldIcon';
import styles from '&/UniqueUnitsUnit.module.scss';
import axios from 'axios';
import { MongoClient, WithId } from 'mongodb';
import { GetServerSideProps, NextPage } from 'next';
import DefaultErrorPage from 'next/error';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { fetcherFn } from 'swr/dist/types';

const fetcher: fetcherFn<UniqueUnit> = async (url) => {
	return (await axios.get<UniqueUnit>(url)).data;
};

type UnitInitialProps = SuccessInitialProps | ErroredInitialProps;

interface SuccessInitialProps {
	initialUnit: UniqueUnit;
	error: false;
}

interface ErroredInitialProps {
	initialUnit: null;
	error: true;
}

const UniqueUnitPage: NextPage<UnitInitialProps> = ({ initialUnit, error }) => {
	const router = useRouter();
	const { data: unit, error: unitError } = useSWR(`/api/unique-units/${router.query.unit}`, fetcher, {
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
									<h2>Stats</h2>
									<div>
										<h4>Strength:</h4>
										{unit.strength}
									</div>
									{unit.rangedStrength && (
										<div>
											<h4>Ranged Strength:</h4>
											{unit.rangedStrength}
										</div>
									)}
									{unit.bombardStrength && (
										<div>
											<h4>Bombard Strength:</h4>
											{unit.bombardStrength}
										</div>
									)}
									<div>
										<h4>Movement:</h4>
										{unit.movement}
									</div>
									{unit.range && (
										<div>
											<h4>Range:</h4>
											{unit.range}
										</div>
									)}
									<div>
										<h4>Era:</h4>
										{unit.era}
									</div>
									<div>
										<h4>Production Cost:</h4>
										{unit.productionCost} <YieldIcon type="production" />
										{unit.productionResourceCost && ', '}
										{unit.productionResourceCost?.cost}{' '}
										{unit.maintainanceResourceCost && <ResourceIcon type={unit.maintainanceResourceCost.type} />}
									</div>
									<div>
										<h4>Purchase Cost:</h4>
										{unit.purchaseCost} <YieldIcon type="gold" />
									</div>
									<div>
										<h4>Maintainance Cost:</h4>
										{unit.maintainanceCost} <YieldIcon type="gold" />
										{unit.maintainanceResourceCost && ', '}
										{unit.maintainanceResourceCost?.cost}{' '}
										{unit.maintainanceResourceCost && <ResourceIcon type={unit.maintainanceResourceCost.type} />}
									</div>
									<div>
										<h4>Replaces:</h4>
										<Link href="/units/[unit]" as={`/units/${unit.replaces}`}>
											<a>{unit.replaces}</a>
										</Link>
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
			.collection<WithId<UniqueUnit>>('unique-units')
			.find({}, { projection: { _id: false } })
			.toArray()
	).find((unit) => unit.name.toLowerCase() === queryUnit.toLowerCase() || unit.name.toLowerCase().includes(queryUnit.toLowerCase()));

	if (!foundUnit) {
		const unUniqueUnit = (
			await mongoClient
				.db('civ-db')
				.collection<WithId<UniqueUnit>>('units')
				.find({}, { projection: { _id: false } })
				.toArray()
		).find((unit) => unit.name.toLowerCase() === queryUnit.toLowerCase() || unit.name.toLowerCase().includes(queryUnit.toLowerCase()));

		if (!unUniqueUnit) {
			return {
				props: {
					initialUnit: null,
					error: true
				}
			};
		} else {
			res.writeHead(301, {
				Location: `/units/${unUniqueUnit.name}`
			}).end();
			return {
				props: {
					initialUnit: unUniqueUnit,
					error: false
				}
			};
		}
	}

	if (queryUnit !== foundUnit.name) {
		res.writeHead(301, {
			Location: `/unique-units/${foundUnit.name}`
		}).end();
	}

	mongoClient.close();
	return {
		props: {
			initialUnit: foundUnit,
			error: false
		}
	};
};

export default UniqueUnitPage;
