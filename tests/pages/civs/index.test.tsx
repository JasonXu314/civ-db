import { america, arabia } from '@/mock-values';
import '@testing-library/jest-dom/extend-expect';
import { cleanup, render, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import CivsIndex from '../../../pages/civs/index';
import axios from '../../__mocks__/axios';

jest.mock('next/router', () => ({
	useRouter: () => ({ pathname: '/civs' })
}));

afterEach(cleanup);

describe('Civs Index  Page', () => {
	it('renders without crashing', async () => {
		axios.get.mockResolvedValueOnce({ data: [america] });

		const { container } = render(<CivsIndex />);

		await waitFor(() => expect(container).toBeInTheDocument());
	});

	it('contains proper links', async () => {
		axios.get.mockResolvedValueOnce({ data: [america] });

		const { container, getByText } = render(<CivsIndex />);

		expect(getByText('Loading Civs...')).toBeInTheDocument();

		await waitFor(() => expect(container).toBeInTheDocument());

		const link = container.querySelector<HTMLAnchorElement>('a.link');
		const text = container.querySelector<HTMLParagraphElement>('p.text');

		expect(link).not.toBeNull();
		expect(text).not.toBeNull();

		expect(link).toHaveAttribute('href', '/civs/America (Teddy)');
		expect(link).toContainElement(text);
		expect(text).toHaveTextContent('America (Teddy)');
	});

	it('displays loading', async () => {
		axios.get.mockResolvedValueOnce({ data: [america] });

		const { getByText } = render(<CivsIndex />);

		const loading = getByText('Loading Civs...');

		expect(loading).toBeInTheDocument();

		await waitForElementToBeRemoved(loading);

		expect(getByText('America (Teddy)')).toBeInTheDocument();
	});

	it('matches snapshot for 1 civ', async () => {
		axios.get.mockResolvedValueOnce({ data: [america] });

		const { container, getByText } = render(<CivsIndex />);

		await waitForElementToBeRemoved(getByText('Loading Civs...'));

		expect(container).toMatchSnapshot();
	});

	it('matches snapshot for 2 civs', async () => {
		axios.get.mockResolvedValueOnce({ data: [america, arabia] });

		const { container, getByText } = render(<CivsIndex />);

		await waitForElementToBeRemoved(getByText('Loading Civs...'));

		expect(container).toMatchSnapshot();
	});
});
