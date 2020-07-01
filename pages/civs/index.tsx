import Layout from '$/Layout/Layout';
import axios from 'axios';
import { NextPage } from 'next';
import Link from 'next/link';
import useSWR from 'swr';
import { fetcherFn } from 'swr/dist/types';
import { Civ, WithId } from '/types';

const fetcher: fetcherFn<WithId<Civ>[]> = async (url) => {
	return (await axios.get<WithId<Civ>[]>(url)).data;
};

const Index: NextPage = () => {
	const { data: civs, error: civsError } = useSWR('/api/civs', fetcher);

	return (
		<Layout title="Civ DB | Civs">
			<div>
				<h1>Civs</h1>
				{civs ? (
					<ul>
						{civs.map((civ) => (
							<li key={civ._id}>
								<Link href="/civs/[civ]" as={`/civs/${civ.name}`}>
									<a>
										<h4>{civ.name}</h4>
									</a>
								</Link>
							</li>
						))}
					</ul>
				) : civsError ? (
					<div>Error Loading Civs...</div>
				) : (
					<div>Loading Civs...</div>
				)}
			</div>
		</Layout>
	);
};

export default Index;
