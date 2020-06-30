import Link from 'next/link';
import { User } from '/types';

type Props = {
	data: User;
};

const ListItem: React.FC<Props> = ({ data }) => (
	<Link href="/users/[id]" as={`/users/${data.id}`}>
		<a data-testid="link">
			{data.id}: {data.name}
		</a>
	</Link>
);

export default ListItem;
