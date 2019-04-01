import React from "react";
import _ from "lodash";
import SecureMessageSummary from "./common/SecureMessageSummary";
import { sendMessageForAccessibiltiy } from "../actions/AppActions";
import { connect } from "react-redux";
import SvgIcon from './common/GetIcon';
import { SENT, DRAFT, ARCHIVED } from '../constants/StringsConstants';
import { Button } from 'web-ui-components/lib/atoms/buttons';
import {Row, Container} from "web-ui-components/lib/global/layout";
import { TextBody } from "web-ui-components/lib/atoms/text";

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
				<Row key={index} className="u-padding-left-1">
					<SecureMessageSummary message={message} listFlag={listFlag} content={content} />
				</Row>
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
		const { content, activeTab } = this.props;
		switch (activeTab) {
			case SENT:
				return (
					<TextBody className="callout callout--msgbottom callout__txt-center">
						{content.noSentMessages}
					</TextBody>
				);
			case DRAFT:
				return (
					<TextBody className="callout callout--msgbottom callout__txt-center">
						{content.noDraftMessages}
					</TextBody>
				);
			case ARCHIVED:
				return (
					<TextBody className="callout callout--msgbottom callout__txt-center">
						{content.noArchivedMessages}
					</TextBody>
				);
			default:
				return (
					<TextBody className="callout callout--msgbottom callout__txt-center">
						{content.noInboxMessages}
					</TextBody>
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
		const { messagesFetched, messages, content } = this.props;
		return (
			messagesFetched.fetching && !messagesFetched.successModal ? <div><SvgIcon id="icon-refresh" width="32px" height="32px" className="spinner-loader" /></div> :
				<div className="u-padding-top-2">
					{messages.length === 0 ?
						this.renderNoMessagesText()
						:
						this.showMessages()}
					{this.state.showMoreLimit < messages.length 
						&& <Button display="primary" onClick={this.showMoreClicked}>{content.showMore}</Button>}
					{this.state.showThatsAllMessage && <Row className="u-margin-top-2"><TextBody>{this.renderThatsAllText()}</TextBody></Row>}
				</div>
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
