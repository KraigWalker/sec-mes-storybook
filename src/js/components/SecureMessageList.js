import React from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import SecureMessageSummary from "./common/SecureMessageSummary";
import { getMessageType } from "../utils/SecureMessageUtils";
import { sendMessageForAccessibiltiy } from "../actions/AppActions";
import { connect } from "react-redux";

class SecureMessageList extends React.Component {
	constructor(props) {
		super(props);
		this.showMoreClicked = this.showMoreClicked.bind(this);
		this.state = {
			showMoreLimit: 20,
		};
	}
	componentWillReceiveProps(props) {
		if (this.props.messages.length <= 20) {
            this.setState({ showThatsAllMessage: true });
        }
		if(this.props.messages.length == 0){
			this.setState({ showThatsAllMessage: false });
		}
		
		if (this.props.activeTab === 'sent' && this.props.messagesFetched) {
			this.props.dispatch(
				sendMessageForAccessibiltiy('You don’t have any sent messages')
			);
		} else if (
			this.props.activeTab === 'drafts' &&
      this.props.messagesFetched
		) {
			this.props.dispatch(
				sendMessageForAccessibiltiy('You haven’t saved any drafts')
			);
		} else if (this.props.activeTab === 'inbox' && this.props.messagesFetched) {
			// this.props.dispatch(sendMessageForAccessibiltiy('You don’t have any messages'));
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
		let buttonText = this.props.content.showMore;
		if (this.props.activeTab === 'sent') {
			buttonText = this.props.content.showMore;
		} else if (this.props.activeTab === 'drafts') {
			buttonText = this.props.content.showMore;
		}
		if (
			this.state.showMoreLimit < this.props.messages.length &&
      (this.props.activeTab === 'sent' ||
        this.props.activeTab === 'inbox' ||
        this.props.activeTab === 'drafts')
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
		if (this.props.activeTab === 'sent') {
			thatsallText = this.props.content.thatsallTextSend;
		} else if (this.props.activeTab === 'drafts') {
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
		const limit = this.props.messages.length;
		return (
			<section>
			{this.props.messages.length === 0 ?
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
	messagesFetched: state.messages.fetched,
});
export default connect(mapState)(SecureMessageList);
