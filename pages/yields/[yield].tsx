import Layout from '$/Layout/Layout';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

const Yield: NextPage = () => {
	const router = useRouter();

	return (
		<Layout title={`Civ DB | Yields - ${router.query.yield}`}>
			<div>{router.query.yield}</div>
		</Layout>
	);
};

export default Yield;
