import List from '$/List';
import { cleanup, render } from '@testing-library/react';
import ReactDOM from 'react-dom';

const testData = [
	{ id: 0, name: 'Jason' },
	{ id: 1, name: 'Jacob' },
	{ id: 2, name: 'Slois' }
];

afterEach(cleanup);

describe('ListDetail Component', () => {
	it('renders without crashing', () => {
		const root = document.createElement('div');

		ReactDOM.render(<List items={testData} />, root);
	});

	it('matches snapshot', () => {
		const { asFragment } = render(<List items={testData} />);

		expect(asFragment()).toMatchSnapshot();
	});
});
