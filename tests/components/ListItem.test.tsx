import ListItem from '$/ListItem';
import '@testing-library/jest-dom/extend-expect';
import { cleanup, render } from '@testing-library/react';
import ReactDOM from 'react-dom';

const testData = { id: 0, name: 'Jason' };

afterEach(cleanup);

describe('ListItem Component', () => {
	it('renders without crashing', () => {
		const root = document.createElement('div');
		ReactDOM.render(<ListItem data={testData} />, root);
	});

	it('renders link correctly', () => {
		const { getByTestId } = render(<ListItem data={testData} />);

		expect(getByTestId('link')).toHaveTextContent('0: Jason');
	});

	it('matches snapshot', () => {
		const { asFragment } = render(<ListItem data={testData} />);

		expect(asFragment()).toMatchSnapshot();
	});
});
