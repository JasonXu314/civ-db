import { Component, PropsWithChildren, ReactNode } from 'react';

interface Props {
	fallback: ReactNode;
}

type P = PropsWithChildren<Props>;

interface State {
	hasErr: boolean;
	err: any | null;
}

export default class ErrorBoundary extends Component<P, State> {
	state = { hasErr: false, err: null };

	static getDerivedStateFromError(err: string): State {
		return {
			hasErr: true,
			err
		};
	}

	render(): ReactNode {
		return this.state.hasErr ? this.props.fallback : this.props.children;
	}
}
