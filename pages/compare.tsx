import Layout from '$/Layout/Layout';
import UnitDisplay from '$/UnitDisplay/UnitDisplay';
import styles from '&/Compare.module.scss';
import axios, { AxiosError } from 'axios';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Compare: NextPage = () => {
	const router = useRouter();
	const [unitNames, setUnitNames] = useState<[string, string]>(
		router.query.units ? ((router.query.units as string).split(',') as [string, string]) : ['', '']
	);
	const [unit1, setUnit1] = useState<Unit | UniqueUnit | null>(null);
	const [unit2, setUnit2] = useState<Unit | UniqueUnit | null>(null);
	const [unit1Unique, setUnit1Unique] = useState<boolean | null>(null);
	const [unit2Unique, setUnit2Unique] = useState<boolean | null>(null);
	const [unit1Error, setUnit1Error] = useState<string | null>(null);
	const [unit2Error, setUnit2Error] = useState<string | null>(null);

	useEffect(() => {
		if (router.query.units) {
			setUnitNames((router.query.units as string).split(',') as [string, string]);
		}
	}, [router]);

	useEffect(() => {
		axios.get<{ unique: boolean }>(`/api/is-unique?unit=${unitNames[0]}`).then((res) => {
			console.log(res.data);
			setUnit1Unique(res.data.unique);
		});
		axios.get<{ unique: boolean }>(`/api/is-unique?unit=${unitNames[1]}`).then((res) => {
			console.log(res.data);
			setUnit2Unique(res.data.unique);
		});
		setUnit1Unique(null);
		setUnit2Unique(null);
	}, [unitNames]);

	useEffect(() => {
		if (unit1Unique !== null) {
			const cancelToken = axios.CancelToken.source();

			axios
				.get<Unit | UniqueUnit>(`/api/${unit1Unique ? 'unique-units' : 'units'}/${unitNames[0]}`)
				.then((res) => {
					setUnit1(res.data);
				})
				.catch((err: AxiosError<string>) => {
					if (!axios.isCancel(err)) {
						setUnit1Error(err.response?.data || 'Error Loading Unit 1 Data');
					}
				});
			setUnit1Error(null);

			return () => {
				cancelToken.cancel();
			};
		}
	}, [unitNames, unit1Unique]);

	useEffect(() => {
		if (unit2Unique !== null) {
			const cancelToken = axios.CancelToken.source();

			axios
				.get<Unit | UniqueUnit>(`/api/${unit2Unique ? 'unique-units' : 'units'}/${unitNames[1]}`)
				.then((res) => {
					setUnit2(res.data);
				})
				.catch((err: AxiosError<string>) => {
					if (!axios.isCancel(err)) {
						setUnit2Error(err.response?.data || 'Error Loading Unit 1 Data');
					}
				});
			setUnit2Error(null);

			return () => {
				cancelToken.cancel();
			};
		}
	}, [unitNames, unit2Unique]);

	return (
		<Layout title="Civ DB | Comparison">
			<div className={styles.main}>
				{unit1 ? <UnitDisplay unit={unit1} /> : unit1Error ? <div className={styles.error}>{unit1Error}</div> : <div>Loading Unit 1 Data...</div>}
				{unit2 ? <UnitDisplay unit={unit2} /> : unit2Error ? <div className={styles.error}>{unit2Error}</div> : <div>Loading Unit 2 Data...</div>}
			</div>
		</Layout>
	);
};

export default Compare;
