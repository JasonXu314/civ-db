import Head from 'next/head';
import { ReactNode } from 'react';
import Footer from './Footer/Footer';
import Header from './Header/Header';
import styles from './Layout.module.scss';

type Props = {
	children?: ReactNode;
	title?: string;
};

const Layout: React.FC<Props> = ({ children, title = 'Civ DB' }) => (
	<div className={styles.main}>
		<Head>
			<title>{title}</title>
			<meta charSet="utf-8" />
			<meta name="viewport" content="initial-scale=1.0, width=device-width" />
		</Head>
		<Header />
		{children}
		<Footer />
	</div>
);

export default Layout;
