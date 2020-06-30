import Layout from '$/Layout';
import ListDetail from '$/ListDetail';
import { sampleUserData } from '@/sample-data';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { User } from '../../types';

type Props = {
	item?: User;
	errors?: string;
};

const UsersId: NextPage<Props> = ({ item, errors }) => {
	if (errors) {
		return (
			<Layout title="Error | Next.js + TypeScript Example">
				<p>
					<span style={{ color: 'red' }}>Error:</span> {errors}
				</p>
			</Layout>
		);
	}

	return <Layout title={`${item ? item.name : 'User Detail'} | Next.js + TypeScript Example`}>{item && <ListDetail user={item} />}</Layout>;
};

export default UsersId;

export const getStaticPaths: GetStaticPaths = async () => {
	const paths = sampleUserData.map((user) => ({
		params: { id: user.id.toString() }
	}));

	return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
	try {
		const id = params?.id;
		const item = sampleUserData.find((data) => data.id === Number(id));

		return { props: { item } };
	} catch (err) {
		return { props: { errors: err.message } };
	}
};
