import Layout from '$/Layout/Layout';
import styles from '&/CivsCiv.module.scss';
import axios from 'axios';
import { MongoClient, WithId } from 'mongodb';
import { GetServerSideProps, NextPage } from 'next';
import DefaultErrorPage from 'next/error';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { fetcherFn } from 'swr/dist/types';
import { Civ } from '/types';

const fetcher: fetcherFn<Civ> = async (url) => {
	return (await axios.get<Civ>(url)).data;
};

type IndexInitialProps = SuccessInitialProps | ErroredInitialProps;

interface SuccessInitialProps {
	initialCiv: Civ;
	error: false;
}

interface ErroredInitialProps {
	initialCiv: null;
	error: true;
}

const Index: NextPage<IndexInitialProps> = ({ initialCiv, error }) => {
	const router = useRouter();
	const { data: civ, error: civError } = useSWR(`/api/civs/${router.query.civ}`, fetcher, {
		initialData: initialCiv,
		shouldRetryOnError: !error,
		revalidateOnFocus: !error,
		revalidateOnReconnect: !error
	});

	if (error) {
		return <DefaultErrorPage statusCode={404} />;
	}
	return (
		<Layout title={`Civ DB | ${router.query.civ}`}>
			<div className={styles.main}>
				{(() => {
					if (civ) {
						return (
							<div className={styles.civ}>
								<h1 className={styles.name}>{civ.name}</h1>
								<div className={styles.row}>
									<img src={civ.icon} />
									<img src={civ.leader.portrait} />
								</div>
								<div className={styles.about}>
									<h2>Ability: {civ.abilityName}</h2>
									<p>{civ.ability}</p>
									<h2>Unique Units</h2>
									<ul className={styles.units}>
										{civ.units.map((unit, i) => (
											<li className={styles.unit} key={i}>
												<a href={`/unique-units/${unit.name}`}>{unit.name}</a>
											</li>
										))}
									</ul>
									{civ.building && (
										<div className={styles.unique}>
											<h2>Unique Building:</h2>
											<a href={`/unique-buildings/${civ.building.name}`}>{civ.building.name}</a>
										</div>
									)}
									{civ.district && <pre>{JSON.stringify(civ.district, null, 4)}</pre>}
									{civ.improvement && <pre>{JSON.stringify(civ.improvement, null, 4)}</pre>}
								</div>
							</div>
						);
					} else if (civError) {
						return <div className={styles.error}>Error Loading Civ Data...</div>;
					} else {
						return <div className={styles.loading}>Loading Civ Data...</div>;
					}
				})()}
			</div>
		</Layout>
	);
};

export const getServerSideProps: GetServerSideProps<IndexInitialProps> = async ({ params, res }) => {
	const mongoClient = await MongoClient.connect(process.env.MONGODB_URL!, { useUnifiedTopology: true });

	const queryCiv = params!.civ as string;

	const foundCiv = (await mongoClient.db('civ-db').collection<WithId<Civ>>('civs').find().toArray()).find(
		(civ) => civ.name.toLowerCase() === queryCiv.toLowerCase() || civ.name.toLowerCase().includes(queryCiv.toLowerCase())
	);

	if (!foundCiv) {
		return {
			props: {
				initialCiv: null,
				error: true
			}
		};
	}

	delete foundCiv._id;

	if (queryCiv !== foundCiv.name) {
		res.writeHead(301, {
			Location: `/civs/${foundCiv.name}`
		}).end();
	}

	mongoClient.close();
	return {
		props: {
			initialCiv: foundCiv,
			error: false
		}
	};
};

export default Index;
