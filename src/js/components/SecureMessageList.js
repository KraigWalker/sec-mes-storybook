import React from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import SecureMessageSummary from "./common/SecureMessageSummary";
import { getMessageType } from "../utils/SecureMessageUtils";
import { sendMessageForAccessibiltiy } from "../actions/AppActions";
import { connect } from "react-redux";
import SvgIcon from './common/GetIcon';
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
		const { messages, activeTab, messagesFetched, content, dispatch } = this.props;
		const { SENT, INBOX, DRAFTS } = StringsConstants;
		if (messages.length <= MESSAGE_LIMIT) {
			this.setState({ showThatsAllMessage: true });
		}
		if (messages.length == 0) {
			this.setState({ showThatsAllMessage: false });
		}
		if (messagesFetched.fetched) {
			switch (activeTab) {
				case (activeTab === SENT):
					dispatch(
						sendMessageForAccessibiltiy(content.noSentMessages)
					);
					break;
				case (activeTab === DRAFTS):
					dispatch(
						sendMessageForAccessibiltiy(content.noDraftMessages)
					);
					break;
				case (activeTab === INBOX):
					dispatch(
						sendMessageForAccessibiltiy(content.noInboxMessages)
					);
					break;
				default:
			}
		}
	}
	showMessages() {
		const { messages, content } = this.props;
		const msgs = messages.slice(0, this.state.showMoreLimit);
		const allMessages = [];
		const hasOnClick = true;
		const listFlag = true;
		_.map(msgs, (message, index) => {
			allMessages.push(
				<li key={index} className="c-messagelist__wrapper">
					<SecureMessageSummary message={message} listFlag={listFlag} content={content} />
				</li>
			);
		});
		return allMessages;
	}
	showMoreClicked() {
		const { messages, dispatch, activeTab } = this.props;
		dispatch(sendMessageForAccessibiltiy(`Next 20 messages loaded ${activeTab}`));
		let limit = messages.length;
		this.setState({
			showMoreLimit: limit,
			showThatsAllMessage: true,
		});
	}
	renderShowMoreButton() {
		const { content, activeTab, messages } = this.props;
		const { SENT, INBOX, DRAFTS } = StringsConstants;
		if (this.state.showMoreLimit < messages.length && (activeTab === SENT || activeTab === INBOX || activeTab === DRAFTS)) {
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
		const { content, activeTab } = this.props;
		const { SENT, DRAFTS } = StringsConstants;
		let thatsallText = content.thatsallTextInbox;
		if (activeTab === SENT) {
			thatsallText = content.thatsallTextSend;
		} else if (activeTab === DRAFTS) {
			thatsallText = content.thatsallTextDraft;
		}
		return thatsallText;
	}
	renderNoMessagesText() {
		const { content, activeTab, dispatch } = this.props;
		const { SENT, DRAFTS } = StringsConstants;
		switch (activeTab) {
			case (activeTab === SENT):
				dispatch(sendMessageForAccessibiltiy(content.noSentMessages));
				return (
					<p className="callout callout--msgbottom callout__txt-center">
						{content.noSentMessages}
					</p>
				);
			case (activeTab === DRAFTS):
				dispatch(sendMessageForAccessibiltiy(content.noDraftMessages));
				return (
					<p className="callout callout--msgbottom callout__txt-center">
						{content.noDraftMessages}
					</p>
				);
			default:
				dispatch(sendMessageForAccessibiltiy(content.noInboxMessages));
				return (
					<p className="callout callout--msgbottom callout__txt-center">
						{content.noInboxMessages}
					</p>
				);
		}
	}
	render() {
		const { messagesFetched, messages } = this.props;
		return (
			messagesFetched.fetching && !messagesFetched.successModal ? <div><SvgIcon id="icon-refresh" width="32px" height="32px" className="spinner-loader" /></div> :
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
