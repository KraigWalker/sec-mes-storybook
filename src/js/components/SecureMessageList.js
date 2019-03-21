import React from "react";
import _ from "lodash";
import SecureMessageSummary from "./common/SecureMessageSummary";
import { sendMessageForAccessibiltiy } from "../actions/AppActions";
import { connect } from "react-redux";
import SvgIcon from './common/GetIcon';
import { SENT, INBOX, DRAFT, ARCHIVED } from '../constants/StringsConstants';

const MESSAGE_LIMIT = 20;

export class SecureMessageList extends React.Component {
	constructor(props) {
		super(props);
		this.showMoreClicked = this.showMoreClicked.bind(this);
		this.sendAccessibilityMessage = this.sendAccessibilityMessage.bind(this);
		this.state = {
			showMoreLimit: MESSAGE_LIMIT,
			showThatsAllMessage: false,
		};
	}
	componentWillReceiveProps(props) {
		const { messages } = this.props;
		if (messages.length <= MESSAGE_LIMIT) {
			this.setState({ showThatsAllMessage: true });
		}
		if (messages.length == 0) {
			this.setState({ showThatsAllMessage: false });
		}
	}

	componentDidMount()
	{
		const { messages } = this.props;
		if (messages.length === 0)
		{
			this.sendAccessibilityMessage()
		}
	}
	showMessages() {
		const { messages, content } = this.props;
		const msgs = messages.slice(0, this.state.showMoreLimit);
		const allMessages = [];
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
		if (this.state.showMoreLimit < messages.length && 
			(activeTab === SENT || 
			activeTab === INBOX || 
			activeTab === DRAFT ||
			activeTab === ARCHIVED )) {
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
		let thatsallText = content.thatsallTextInbox;
		if (activeTab === SENT) {
			thatsallText = content.thatsallTextSend;
		} else if (activeTab === ARCHIVED) {
			thatsallText = content.thatsallTextArchived;
		} else if (activeTab === DRAFT) {
			thatsallText = content.thatsallTextDraft;
		}
		return thatsallText;
	}
	renderNoMessagesText() {
		const { content, activeTab, dispatch } = this.props;
		switch (activeTab) {
			case SENT:
				return (
					<p className="callout callout--msgbottom callout__txt-center">
						{content.noSentMessages}
					</p>
				);
			case DRAFT:
				return (
					<p className="callout callout--msgbottom callout__txt-center">
						{content.noDraftMessages}
					</p>
				);
			case ARCHIVED:
				return (
					<p className="callout callout--msgbottom callout__txt-center">
						{content.noArchivedMessages}
					</p>
				);
			default:
				return (
					<p className="callout callout--msgbottom callout__txt-center">
						{content.noInboxMessages}
					</p>
				);
		}
	}

	sendAccessibilityMessage() {

		const { activeTab, dispatch, content } = this.props;
		switch (activeTab) {
			case SENT:
				dispatch(sendMessageForAccessibiltiy(content.noSentMessages));
				break;
			case DRAFT:
				dispatch(sendMessageForAccessibiltiy(content.noDraftMessages));
				break;
			case ARCHIVED:
				dispatch(sendMessageForAccessibiltiy(content.noArchivedMessages));
				break;
			default:
				dispatch(sendMessageForAccessibiltiy(content.noInboxMessages));
				break;
				
		}
	}

	render() {
		const { messagesFetched, messages } = this.props;
		return (
			messagesFetched.fetching && !messagesFetched.successModal ? <div style={{ textAlign: "center" }}><SvgIcon id="icon-refresh" width="32px" height="32px" className="spinner-loader" /></div> :
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
