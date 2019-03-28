import React from "react";
import SendSecureMessage from "./SendSecureMessage";
import { connect } from "react-redux";
import { updateMessageData, popupState, getCustomerName, sendMessageData, replyMessageData, sendMessageForAccessibiltiy } from "../actions/AppActions"
import { getThreadsBL } from '../bl/SecureMessageBL';
import { PENDING , READ, NEW, DRAFT } from "../constants/StringsConstants";
import SecureMessageSummary from './common/SecureMessageSummary';
import { BuildSendMessageRequestEntity } from '../bl/SecureMessageBL';

class ReplySecureMessageNew extends React.Component {

    constructor(props)
    {
        super(props);
        this.onMount = this.onMount.bind(this);
        this.getThreads = this.getThreads.bind(this);
        this.send = this.send.bind(this);
        this.save = this.save.bind(this);
    }

    onMount() {
        const { customerID } = this.props;
		const { messageDetail } = this.props.location;
		// Below is to update New message to Read message status.
		if (messageDetail && messageDetail.status === NEW) {
			this.props.updateMessageData(
					messageDetail,
					messageDetail.id,
					READ
				);
		}
		this.props.getCustomerName(customerID);
    }

    getThreads(messages, currentMessage) {
		const threads = getThreadsBL(messages.messages, currentMessage);
		return _.map(threads, (thread, index) => {
			return <SecureMessageSummary key={index} message={{...thread}} content={this.props.content} />
	   });
		
	}
    
    send(messageEntity) {
        const {customerDetails, accounts} = this.props;
        const { name} = customerDetails.personal_details;

        const sendRequestMessage = BuildSendMessageRequestEntity(accounts, messageEntity);
        this.props.sendMessageData(
            sendRequestMessage.getMessageRequestData(),
                PENDING,
                name);
    }

    save(messageEntity) {

        const { location, customerDetails, accounts } = this.props;
        const { name } = customerDetails.personal_details;

        const sendRequestMessage = BuildSendMessageRequestEntity(accounts, messageEntity);
        this.props.replyMessageData(
            sendRequestMessage.getMessageRequestData(),
            location.messageDetail,
            DRAFT,
            name || {}
        );
        
    }

    render() {

        const { messageDetail } = this.props.location.messageDetail
            ? this.props.location
            : this.props;

        const { messages } = this.props;
        
        const threads = this.getThreads(this.props.messages, messageDetail);
        return <SendSecureMessage {...this.props} 
            threads={threads} 
            messageInfo={messageDetail}
            onSend={this.send}
            onSave={this.save}
            onMount={this.onMount}
            hasErrors={messages.newMessageError}
            selectedSubject={messageDetail.subject}
            selectedAccount={messageDetail.account.number}/>;
            
    }
};

export const mapState = state => ({
	subjects: state.subjects,
	messages: state.messages,
	accounts: state.accounts,
	messageDetail: state.viewMessage.messageDetail,
	customerID: state.segmentData.segmentData.customers[0].id,
	customerDetails: state.customerDetails.customerDetails,
	customerNameError: state.customerDetails.error,
});

export const mapStateToProps = {
    updateMessageData,
    popupState,
    getCustomerName,
    sendMessageData,
    replyMessageData,
    sendMessageForAccessibiltiy
}
export default connect(mapState, mapStateToProps)(ReplySecureMessageNew);