import Layout from '$/Layout';
import { NextPage } from 'next';
import Link from 'next/link';

const Index: NextPage = () => (
	<Layout title="Home | Next.js + TypeScript Example">
		<h1>Hello Next.js 👋</h1>
		<p>
			<Link href="/about">
				<a>About</a>
			</Link>
		</p>
	</Layout>
);

export default Index;
