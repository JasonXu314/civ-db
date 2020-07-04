import '@testing-library/jest-dom/extend-expect';
import { cleanup, render } from '@testing-library/react';
import Index from '../../pages/index';

jest.mock('next/router', () => ({
	useRouter: () => ({ pathname: '/' })
}));

afterEach(cleanup);

describe('Home Page', () => {
	it('renders without crashing', () => {
		const { container } = render(<Index />);

		expect(container).toBeInTheDocument();
	});

	it('matches snapshot', () => {
		const { container } = render(<Index />);

		expect(container).toMatchSnapshot();
	});
});
