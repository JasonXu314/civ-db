import Layout from '$/Layout/Layout';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

const Resource: NextPage = () => {
	const router = useRouter();

	return (
		<Layout title={`Civ DB | Resources - ${router.query.resource}`}>
			<div>{router.query.resource}</div>
		</Layout>
	);
};

export default Resource;
