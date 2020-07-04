import CivList from '$/CivList/CivList';
import { america, arabia } from '@/mock-values';
import '@testing-library/jest-dom/extend-expect';
import { cleanup, render } from '@testing-library/react';

afterEach(cleanup);

describe('Civs List Component', () => {
	it('renders without crashing', () => {
		const { container } = render(<CivList civs={[america]} />);

		expect(container).toBeInTheDocument();
	});

	it('matches snapshot with single civ', () => {
		const { container } = render(<CivList civs={[america]} />);

		expect(container).toMatchSnapshot();
	});

	it('matches snapshot for 2 civs', async () => {
		const { container } = render(<CivList civs={[america, arabia]} />);

		expect(container).toMatchSnapshot();
	});
});
