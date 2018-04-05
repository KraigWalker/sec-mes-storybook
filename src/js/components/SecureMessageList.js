import React from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import SecureMessageSummary from "./common/SecureMessageSummary";
import { getMessageType } from "../utils/SecureMessageUtils";
import { sendMessageForAccessibiltiy } from "../actions/AppActions";
import { connect } from "react-redux";
import SvgIcon from './common/GetIcon.js';
import StringsConstants from '../constants/StringsConstants';

const MESSAGE_LIMIT = 20;

class SecureMessageList extends React.Component {
	constructor(props) {
		super(props);
		this.showMoreClicked = this.showMoreClicked.bind(this);
		this.state = {
			showMoreLimit: MESSAGE_LIMIT,
		};
	}
	componentWillReceiveProps(props) {
		const { messages, activeTab, messagesFetched, content } = this.props;
		if (messages.length <= MESSAGE_LIMIT) {
			this.setState({ showThatsAllMessage: true });
		}
		if (messages.length == 0) {
			this.setState({ showThatsAllMessage: false });
		}
		switch (true) {
			case (activeTab === StringsConstants.SENT && messagesFetched.fetched):
				this.props.dispatch(
					sendMessageForAccessibiltiy(content.noSentMessages)
				);
				break;
			case (activeTab === StringsConstants.DRAFTS && messagesFetched.fetched):
				this.props.dispatch(
					sendMessageForAccessibiltiy(content.noDraftMessages)
				);
				break;
			case (activeTab === StringsConstants.INBOX && messagesFetched.fetched):
				this.props.dispatch(
					sendMessageForAccessibiltiy(content.noInboxMessages)
				);
				break;
			default:
		}
	}
	showMessages() {
		const msgs = this.props.messages.slice(0, this.state.showMoreLimit);
		const { messages } = this.props;
		const allMessages = [];
		const hasOnClick = true;
		const listFlag = true;
		_.map(msgs, (message, index) => {
			allMessages.push(
				<li key={index} className="c-messagelist__wrapper">
					<SecureMessageSummary message={message} listFlag={listFlag} content={this.props.content} />
				</li>
			);
		});
		return allMessages;
	}
	showMoreClicked() {
		this.props.dispatch(sendMessageForAccessibiltiy(`Next 20 messages loaded ${this.props.activeTab}`));
		let limit = this.props.messages.length;
		this.setState({
			showMoreLimit: limit,
			showThatsAllMessage: true,
		});
	}
	renderShowMoreButton() {
		const { content, activeTab, messages } = this.props;
		if (this.state.showMoreLimit < messages.length && (activeTab === StringsConstants.SENT || activeTab === StringsConstants.INBOX || activeTab === StringsConstants.DRAFTS)) {
			return (
				<button
					type="button"
					onClick={this.showMoreClicked}
					className="c-btn c-btn--default c-modal__button u-margin-bottom-c"
				>
					{content.showMore}
				</button>
			);
		}
	}
	renderThatsAllText() {
		let thatsallText = this.props.content.thatsallTextInbox;
		if (this.props.activeTab === StringsConstants.SENT) {
			thatsallText = this.props.content.thatsallTextSend;
		} else if (this.props.activeTab === StringsConstants.DRAFTS) {
			thatsallText = this.props.content.thatsallTextDraft;
		}
		return thatsallText;
	}
	renderNoMessagesText() {
		const { content, activeTab, dispatch } = this.props;
		if (this.props.activeTab === 'sent') {
			dispatch(sendMessageForAccessibiltiy(content.noSentMessages));
			return (
				<p className="callout callout--msgbottom callout__txt-center">
					{content.noSentMessages}
				</p>
			);
		} else if (activeTab === 'drafts') {
			dispatch(sendMessageForAccessibiltiy(content.noDraftMessages));
			return (
				<p className="callout callout--msgbottom callout__txt-center">
					{content.noDraftMessages}
				</p>
			);
		}
		dispatch(sendMessageForAccessibiltiy(content.noInboxMessages));
		return (
			<p className="callout callout--msgbottom callout__txt-center">
				{content.noInboxMessages}
			</p>
		);
	}
	render() {
		const { messagesFetched, messages } = this.props;
		return (
			messagesFetched.fetching ? <div><SvgIcon id="icon-refresh" width="32px" height="32px" className="spinner-loader" /></div> :
				<section>
					{messages.length === 0 ?
						this.renderNoMessagesText()
						:
						<ol className="c-messagelist">
							{this.showMessages()}
						</ol>
					}
					{this.renderShowMoreButton()}
					{this.state.showThatsAllMessage && <p className="u-margin-bottom-c">{this.renderThatsAllText()}</p>}
				</section>
		);
	}
}

// export default SecureMessageList;
/**
 * Maps the state of the component to the state of the redux store
 * @param {object} state. State of the application
 */
const mapState = state => ({
	messagesubjects: state.subjects,
	messageaccounts: state.accounts,
	messagesFetched: state.messages,
});
export default connect(mapState)(SecureMessageList);
