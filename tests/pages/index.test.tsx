import { render } from '@testing-library/react';
import Index from '../../pages/index';

describe('Home Page', () => {
	it('matches snapshot', () => {
		const { asFragment } = render(<Index />);

		expect(asFragment()).toMatchSnapshot();
	});
});
