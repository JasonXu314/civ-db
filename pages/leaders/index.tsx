import Layout from '$/Layout/Layout';
import axios from 'axios';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';

const Index: NextPage = () => {
	const [leaders, setLeaders] = useState<Leader[] | null>(null);
	const [error, setError] = useState<string | null>(null);
	useEffect(() => {
		axios
			.get<Leader[]>('/api/leaders')
			.then((res) => setLeaders(res.data))
			.catch((err) => setError(err.toString()));
	}, []);

	return (
		<Layout title="Civ DB | Leaders">
			<div>
				<h1>Leaders</h1>
				{leaders ? (
					leaders.map((leader) => <div key={leader._id}>{leader.name}</div>)
				) : error ? (
					<div>Error Loading Civs...</div>
				) : (
					<div>Loading Civs...</div>
				)}
			</div>
		</Layout>
	);
};

export default Index;
