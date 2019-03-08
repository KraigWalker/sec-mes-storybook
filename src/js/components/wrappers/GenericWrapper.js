import React from 'react';
import { connect } from 'react-redux';
import content from '../../content';

import { fetchSecureMessages, getAccounts, getCustomerID } from '../../actions/AppActions';

const getContent = (brand) => {
	switch (brand) {
		case 'CB':
		case 'YB':
			return content.CB;
		case 'DYB':
			return content.DYB;
	}
}

export function withSubscription(WrappedComponent) {
	const mapState = state => ({
		fetched: state.messages.fetched,
	});
	return connect(mapState)(class extends React.PureComponent {
		constructor(props) {
			super(props);
			const { brand } = props.session;

			this.state = {
				content: getContent(brand)
			};
		}
		componentWillMount() {
			const { dispatch, fetched } = this.props;
			dispatch(getAccounts());
			dispatch(getCustomerID());
			!fetched && dispatch(fetchSecureMessages());
		}
		componentWillReceiveProps(nextProps) {
			!nextProps.fetched && this.props.dispatch(fetchSecureMessages());
		}
		render() {
			return (
				<WrappedComponent content={this.state.content} token={this.state.token} {...this.props} />
			);
		}
	});
}
export function accessibilityWrapper(WrappedComponent) {
	let currentMessage = '';
	const mapState = state => ({
		message: state.accessibilityReducer.accessibilityMessage,
		fetched: state.messages.fetched,
	});
	return connect(mapState)(class extends React.Component {
		componentDidUpdate(prevProps, prevState) {
			if (currentMessage) {
				setTimeout(() => {
					currentMessage = '';
				}, 500);
			}
		}
		render() {
			currentMessage = this.props.message;
			return (
				<div>
					<div className="u-visually-hidden off-screen" role="status" aria-live="polite" aria-atomic="true">
						{currentMessage && this.props.fetched ? <span>{currentMessage}</span> : ''}
					</div>
					<WrappedComponent  />
				</div>
			);
		}
	});
}

