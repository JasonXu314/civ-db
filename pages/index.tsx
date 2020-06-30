import Layout from '$/Layout/Layout';
import styles from '&/Index.module.scss';
import { NextPage } from 'next';
import Link from 'next/link';

const Index: NextPage = () => (
	<Layout title="Civ DB">
		<div className={styles.main}>
			<h1 className={styles.title}>A wiki for all things Civ</h1>
			<img className={styles.cover} src="maori.jpg"></img>
			<h3 className={styles.header}>Explore:</h3>
			<ul className={styles.links}>
				<li className={styles.item}>
					<Link href="/civs" prefetch>
						<a className={styles.link}>Civs</a>
					</Link>
					<Link href="/units" prefetch>
						<a className={styles.link}>Units</a>
					</Link>
					<Link href="/leaders" prefetch>
						<a className={styles.link}>Leaders</a>
					</Link>
				</li>
			</ul>
		</div>
	</Layout>
);

export default Index;
