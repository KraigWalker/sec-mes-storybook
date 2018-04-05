import React from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import SecureMessageSummary from "./common/SecureMessageSummary";
import { getMessageType } from "../utils/SecureMessageUtils";
import { sendMessageForAccessibiltiy } from "../actions/AppActions";
import { connect } from "react-redux";
import SvgIcon from './common/GetIcon.js';
import StringsConstants from '../constants/StringsConstants.js';

const MESSAGE_LIMIT = 20;
const SENT = 'sent';
const DRAFTS = 'drafts';
const INBOX = 'inbox';
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
		if(messages.length == 0){
			this.setState({ showThatsAllMessage: false });
		}
		switch (true) {
        case (activeTab === SENT && messagesFetched.fetched):
			this.props.dispatch(
				sendMessageForAccessibiltiy(content.noSentMessages)
			);
		break;
		case (activeTab === DRAFTS && messagesFetched.fetched):
			this.props.dispatch(
				sendMessageForAccessibiltiy(content.noDraftMessages)
			);
		break;
		case (activeTab === INBOX && messagesFetched.fetched):
			this.props.dispatch(
				sendMessageForAccessibiltiy(content.noInboxMessages)
			);
		break;
		default :
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
		const { content, activeTab, messages} = this.props;
		let buttonText = content.showMore;
		if (activeTab === SENT) {
			buttonText = content.showMore;
		} else if (activeTab === DRAFTS) {
			buttonText = content.showMore;
		}
		if (
			this.state.showMoreLimit < messages.length &&
      (activeTab === SENT ||
        activeTab === INBOX ||
        activeTab === DRAFTS)
		) {
			return (
				<button
					type="button"
					onClick={this.showMoreClicked}
					className="c-btn c-btn--default c-modal__button u-margin-bottom-c"
				>
					{buttonText}
				</button>
			);
		}
	}
	renderThatsAllText() {
		let thatsallText = this.props.content.thatsallTextInbox;
		if (this.props.activeTab === SENT) {
			thatsallText = this.props.content.thatsallTextSend;
		} else if (this.props.activeTab === DRAFTS) {
			thatsallText = this.props.content.thatsallTextDraft;
		}
		return thatsallText;
	}
	renderNoMessagesText() {
		if (this.props.activeTab === 'sent') {
			//  this.props.dispatch(sendMessageForAccessibiltiy('You don’t have any sent messages'));
			return (
				<p className="callout callout--msgbottom callout__txt-center">
					{this.props.content.noSentMessages}
				</p>
			);
		} else if (this.props.activeTab === 'drafts') {
			// this.props.dispatch(sendMessageForAccessibiltiy('You haven’t saved any drafts'));
			return (
				<p className="callout callout--msgbottom callout__txt-center">
					{this.props.content.noDraftMessages}
				</p>
			);
		}
		// this.props.dispatch(sendMessageForAccessibiltiy('You don’t have any messages'));
		return (
			<p className="callout callout--msgbottom callout__txt-center">
				{this.props.content.noInboxMessages}
			</p>
		);
	}
	render() {
		const { messagesFetched, messages } = this.props;
		return (
			messagesFetched.fetching ? <div><SvgIcon id="icon-refresh" width="32px" height="32px" className="spinner-loader"/></div> :
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
