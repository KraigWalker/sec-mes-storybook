import React from "react";
import { compose } from "redux";
import { utils } from "document-management-web-ui";

import _ from "lodash";
import { connect } from "react-redux";
import {
	setViewMessageDetail,
	updateMessageData
} from "../actions/AppActions";
import { getThreadsBL } from "../bl/SecureMessageBL";
import { READ, NEW, READ_ONLY, ARCHIVED } from '../constants/StringsConstants';
import MailMessage from "./MailMessage";
import { withRouter } from "react-router-dom";
import { SubordinatePanel } from 'web-ui-components/lib/molecules/panels';
import { SectionHeading } from 'web-ui-components/lib/molecules/text';


export class ViewMessage extends React.Component {
	constructor(props) {
		super(props);
		this.getThreads = this.getThreads.bind(this);
	}

	componentDidMount() {
		const { messageDetail } = this.props.location;
		const { isWebView, setMessagesMetaData, messages, dispatch } = this.props;

		messageDetail &&
			dispatch(
				setViewMessageDetail(messageDetail)
			); // to set current viewing message
		// Below is to update New message to Read message status.
		if (messageDetail && messageDetail.status === 'NEW') {
			if (!messages.mode === READ_ONLY) {
				dispatch(
					updateMessageData(
						messageDetail,
						messageDetail.id,
						'READ'
					)
				);
			}
			if (isWebView) {
				const unreadMessageCount = messages.messages.filter(message => message.status === "NEW").length
				setMessagesMetaData({ unread: unreadMessageCount - 1 });
			}
		}
		window.scrollTo(0, 0);
	}

	getThreads(messages, currentMessage) {
		const threads = getThreadsBL(messages, currentMessage);
		//TODO: use something unique other than index
		return _.map(threads, (thread, index) => {
			 return (
				<SubordinatePanel key={index}>
					<MailMessage {...this.props} message={{...thread}} />
				</SubordinatePanel>
			 );
		});
	}

	render() {

		const { messageDetail } = this.props.location.messageDetail
			? this.props.location
			: this.props;

		const { readOnly, content } = this.props;
		//DEBT: Before getting here status may still be NEW after user has clicked on email in summary
		//Status should be READ in this instance. We may need to change where/when status is updated...
		const messageStatus = (messageDetail.status === NEW && readOnly !== true) 
						? READ
						: messageDetail.status;

		return (
			<div className="row centralised-container c-card">
				<div className="col-md1-24 col-sm1-24 col-lg1-24">

				<SectionHeading heading1={messageDetail.status === ARCHIVED ? content.archivePageTitle : content.inboxPageTitle}></SectionHeading>

				<MailMessage {...this.props} newMessageStatus={messageStatus} />
					{messageDetail.threadID !== null &&
						this.getThreads(this.props.messages.messages, messageDetail)}
				</div>
			</div>
		);


	}
}


const mapState = state => ({
	readOnly: state.messages.mode === READ_ONLY,
	noReply: state.viewMessage.messageDetail.noReply,
	messages: state.messages,
	messageDetail: state.viewMessage.messageDetail,
	hasAttachment: state.viewMessage.messageDetail.document && state.viewMessage.messageDetail.document.id !== undefined, 
});

export default compose(
	connect(mapState),
	withRouter,
	utils.withNativeBridge(window.navigator.userAgent)
)(ViewMessage);
