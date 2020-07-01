import axios from 'axios';
import Link from 'next/link';
import useSWR from 'swr';
import { fetcherFn } from 'swr/dist/types';
import { Civ, WithId } from '/types';

const fetcher: fetcherFn<WithId<Civ>[]> = async (url) => {
	return (await axios.get<WithId<Civ>[]>(url)).data;
};

const CivList: React.FC = () => {
	const { data: civs } = useSWR('/api/civs', fetcher, { suspense: true });
	return (
		<ul>
			{civs?.map((civ) => (
				<li key={civ._id}>
					<Link href="/civs/[civ]" as={`/civs/${civ.name}`}>
						<a>
							<h4>{civ.name}</h4>
						</a>
					</Link>
				</li>
			))}
		</ul>
	);
};

export default CivList;
