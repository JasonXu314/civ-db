import Link from 'next/link';
import styles from './CivList.module.scss';
import { Civ } from '/types';

interface Props {
	civs: Civ[];
}

const CivList: React.FC<Props> = ({ civs }) => {
	return (
		<ul className={styles.main}>
			{civs.map((civ) => (
				<li key={civ.id} className={styles.civ}>
					<Link href="/civs/[civ]" as={`/civs/${civ.name}`}>
						<a className={styles.link}>
							<p className={styles.text}>{civ.name}</p>
						</a>
					</Link>
				</li>
			))}
		</ul>
	);
};

export default CivList;
