import { capitalize } from '@/utils';
import Link from 'next/link';
import styles from './YieldIcon.module.scss';

interface Props {
	type: YieldIconType;
}

const YieldIcon: React.FC<Props> = ({ type }) => {
	return (
		<Link href="/yields/[yield]" as={`/yields/${type}`}>
			<a>
				<img src={`/yields/${type}.png`} alt={capitalize(type)} title={capitalize(type)} className={styles.img} />
			</a>
		</Link>
	);
};

export default YieldIcon;
