import Link from 'next/link';

const Header: React.FC = () => {
	return (
		<header>
			<nav>
				<Link href="/">
					<a>Home</a>
				</Link>{' '}
				|{' '}
				<Link href="/about">
					<a>About</a>
				</Link>{' '}
				|{' '}
				<Link href="/civs">
					<a>Civs</a>
				</Link>
				|{' '}
				<Link href="/units">
					<a>Units</a>
				</Link>
				|{' '}
				<Link href="/leaders">
					<a>Leaders</a>
				</Link>
			</nav>
		</header>
	);
};

export default Header;
