import Layout from '$/Layout/Layout';
import styles from '&/UnitsIndex.module.scss';
import { eras } from '@/constants';
import { createUnitsTable } from '@/utils';
import axios from 'axios';
import { NextPage } from 'next';
import { useState } from 'react';
import useSWR from 'swr';
import { fetcherFn } from 'swr/dist/types';

const fetcher: fetcherFn<Unit[]> = async (url) => {
	return (await axios.get<Unit[]>(url)).data;
};

const Index: NextPage = () => {
	const [mode, setMode] = useState<ViewMode>('table');
	const { data: units, error: err } = useSWR('/api/units', fetcher);

	return (
		<Layout title="Civ DB | Units">
			<div className={styles.main}>
				<h1>Units</h1>
				<div className={styles.row}>
					<button className={styles.button} onClick={() => setMode('table')}>
						Tabled
					</button>
					<button className={styles.button} onClick={() => setMode('list')}>
						List
					</button>
				</div>
				{mode === 'table' ? (
					<>
						<table className={styles.table}>
							<thead>
								<tr>
									<th>Class</th>
									{eras.map((era, i) => (
										<th key={i}>{era}</th>
									))}
								</tr>
							</thead>
							<tbody>
								{units &&
									Object.entries(createUnitsTable(units)).map(([unitClass, units]) => (
										<tr key={unitClass}>
											<td>{unitClass}</td>
											{units.map((unit, i) =>
												unit ? (
													<td key={unit._id}>
														<a href={`/units/${unit.name}`}>{unit.name}</a>
													</td>
												) : (
													<td key={i}></td>
												)
											)}
										</tr>
									))}
							</tbody>
						</table>
						{err && <div>{err}</div>}
						{!units && !err && <div>Loading Units...</div>}
					</>
				) : (
					<>
						<ul className={styles.list}>
							{units && units.sort((u1, u2) => u1.name.localeCompare(u2.name)).map((unit) => <li key={unit._id}>{unit.name}</li>)}
						</ul>
						{err && <div>{err}</div>}
						{!units && !err && <div>Loading Units...</div>}
					</>
				)}
			</div>
		</Layout>
	);
};

export default Index;
