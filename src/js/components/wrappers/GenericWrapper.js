import React from 'react';
import { connect } from 'react-redux';
import content from '../../content';
import token from '../../token';

import { fetchSecureMessages, getAccounts, closeDelModal, popupState } from '../../actions/AppActions';

export function withSubscription(WrappedComponent) {
	const mapState = state => ({
		fetched: state.messages.fetched,
	});
	return connect(mapState)(class extends React.PureComponent {
		constructor() {
			super();
			this.state = {
				content: this.getcontentBankID(),
				token: token,
			};
		}
		componentWillMount() {
			this.props.dispatch(getAccounts());
			!this.props.fetched && this.props.dispatch(fetchSecureMessages());
		}
		componentWillReceiveProps(nextProps) {
			!nextProps.fetched && this.props.dispatch(fetchSecureMessages());
		}
		componentWillUnmount() {
			this.props.dispatch(closeDelModal());
			this.props.dispatch(popupState());
		}
		getcontentBankID() {
			switch (token.getContentBankId()) {
				case 'CB':
				case 'YB':
					return content.CB;
				case 'DYB':
					return content.DYB;
			}

		}

		render() {
			return (
				<WrappedComponent content={this.state.content} token={this.state.token} />
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
					<WrappedComponent />
				</div>
			);
		}
	});
}

