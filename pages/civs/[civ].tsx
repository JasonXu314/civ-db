import Layout from '$/Layout/Layout';
import axios from 'axios';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { fetcherFn } from 'swr/dist/types';
import { Civ, WithId } from '/types';

const fetcher: fetcherFn<WithId<Civ>> = async (url) => {
	return (await axios.get<WithId<Civ>>(url)).data;
};

const Index: NextPage = () => {
	const router = useRouter();
	const { data: civ, error } = useSWR(`/api/civs/${router.query.civ}`, fetcher);

	return (
		<Layout title={`Civ DB | ${router.query.civ}`}>
			<div>{civ ? <pre>{JSON.stringify(civ, null, 4)}</pre> : error ? <div>Error Loading Civ Data...</div> : <div>Loading Civ Data...</div>}</div>
		</Layout>
	);
};

export default Index;
