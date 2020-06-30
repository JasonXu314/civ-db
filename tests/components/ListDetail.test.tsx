import ListDetail from '$/ListDetail';
import { cleanup, render } from '@testing-library/react';
import ReactDOM from 'react-dom';

const testData = { id: 0, name: 'Jason' };

afterEach(cleanup);

describe('ListDetail Component', () => {
	it('renders without crashing', () => {
		const root = document.createElement('div');

		ReactDOM.render(<ListDetail user={testData} />, root);
	});

	it('matches snapshot', () => {
		const { asFragment } = render(<ListDetail user={testData} />);

		expect(asFragment()).toMatchSnapshot();
	});
});
