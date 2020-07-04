import CivList from '$/CivList/CivList';
import Layout from '$/Layout/Layout';
import styles from '&/CivsIndex.module.scss';
import axios from 'axios';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { Civ, WithId } from '/types';

const CivsIndex: NextPage = () => {
	const [civs, setCivs] = useState<WithId<Civ>[] | null>(null);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		axios
			.get<WithId<Civ>[]>('/api/civs')
			.then((res) => setCivs(res.data))
			.catch((err) => setError(err));
	}, []);

	return (
		<Layout title="Civ DB | Civs">
			<div className={styles.main}>
				<h1 className={styles.heading}>Civilizations</h1>
				{civs ? (
					<CivList civs={civs} />
				) : error ? (
					<div className={styles.error}>Error Loading Civs...</div>
				) : (
					<div className={styles.loading}>Loading Civs...</div>
				)}
			</div>
		</Layout>
	);
};

export default CivsIndex;
