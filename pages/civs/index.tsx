import CivList from '$/CivList/CivList';
import ErrorBoundary from '$/ErrorBoundary/ErrorBoundary';
import Layout from '$/Layout/Layout';
import styles from '&/CivsIndex.module.scss';
import { NextPage } from 'next';
import { Suspense } from 'react';

const Index: NextPage = () => {
	return typeof window === 'undefined' ? (
		<Layout title="Civ DB | Civs">
			<div className={styles.main}>
				<h1>Civs</h1>
				<div>Loading Civs...</div>
			</div>
		</Layout>
	) : (
		<Layout title="Civ DB | Civs">
			<div className={styles.main}>
				<h1>Civs</h1>
				<ErrorBoundary fallback={<div>Error Loading Civs...</div>}>
					<Suspense fallback={<div>Loading Civs...</div>}>
						<CivList />
					</Suspense>
				</ErrorBoundary>
			</div>
		</Layout>
	);
};

export default Index;
