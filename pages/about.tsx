import Layout from '$/Layout/Layout';
import { NextPage } from 'next';
import Link from 'next/link';

const About: NextPage = () => (
	<Layout title="About | Next.js + TypeScript Example">
		<h1>About</h1>
		<p>This is the about page</p>
		<p>
			<Link href="/">
				<a>Go home</a>
			</Link>
		</p>
	</Layout>
);

export default About;
