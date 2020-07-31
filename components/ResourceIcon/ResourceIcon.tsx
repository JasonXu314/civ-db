import { capitalize } from '@/utils';
import Link from 'next/link';
import styles from './ResourceIcon.module.scss';

interface Props {
	type: ResourceIconType;
}

const ResourceIcon: React.FC<Props> = ({ type }) => {
	return (
		<Link href="/resources/[resource]" as={`/resources/${type}`}>
			<a>
				<img src={`/resources/${type}.png`} alt={capitalize(type)} title={capitalize(type)} className={styles.img} />
			</a>
		</Link>
	);
};

export default ResourceIcon;
