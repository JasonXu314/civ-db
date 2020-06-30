import { User } from '/types';

type Props = {
	user: User;
};

const ListDetail: React.FC<Props> = ({ user }) => (
	<div>
		<h1>Detail for {user.name}</h1>
		<p>ID: {user.id}</p>
	</div>
);

export default ListDetail;
