import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../Layout.module.scss';

const Header: React.FC = () => {
	const router = useRouter();

	return (
		<header className={styles.header}>
			<nav className={styles.nav}>
				<ul className={styles.links}>
					{['', 'about', 'civs', 'leaders', 'units', 'unique-units', 'yields', 'resources', 'compare'].map((route, i) => (
						<li className={(`/${route}` === router.pathname ? [styles.link, styles.current] : [styles.link]).join(' ')} key={i}>
							<Link href={`/${route}`}>
								<a className={styles.text}>{route === '' ? 'home' : route.replace('-', ' ')}</a>
							</Link>
						</li>
					))}
				</ul>
			</nav>
		</header>
	);
};

export default Header;
