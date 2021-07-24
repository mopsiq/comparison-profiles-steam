import React from 'react';

export class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = { error: false, errorInfo: null };
	}

	static getDerivedStateFromError(error) {
		return { error: true };
	}

	componentDidCatch(error, errorInfo) {
		this.setState({
			error: error,
			errorInfo: errorInfo,
		});
	}

	render() {
		if (this.state.error) {
			return <h1>Что-то пошло не так.</h1>;
		}

		return this.props.children;
	}
}
