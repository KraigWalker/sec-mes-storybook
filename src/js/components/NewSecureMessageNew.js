import React from "react";
import SendSecureMessage from "./SendSecureMessage";
import { connect } from "react-redux";
import { PENDING, DRAFT } from "../constants/StringsConstants";
import { BuildSendMessageRequestEntity } from '../bl/SecureMessageBL';
import {popupState, getCustomerName, sendMessageData, sendMessageForAccessibiltiy } from "../actions/AppActions"
import content from "../content";

class NewSecureMessageNew extends React.Component {
    constructor(props) {
        super(props);
        this.onMount = this.onMount.bind(this);
        this.send = this.send.bind(this);
        this.save = this.save.bind(this);
    }
    onMount() {
        const { customerID } = this.props;
        this.props.getCustomerName(customerID);
    }
    sendMessageData(messageEntity, status) {
        const { customerDetails, accounts } = this.props;
        const { name } = customerDetails.personal_details;
        const sendRequestMessage = BuildSendMessageRequestEntity(accounts, messageEntity);
        this.props.sendMessageData(sendRequestMessage.getMessageRequestData(), status, name);
    }
    send(messageEntity) {
        this.sendMessageData(messageEntity, PENDING);
    }
    save(messageEntity) {
        this.sendMessageData(messageEntity, DRAFT);
    }
    render() {
        const { messageDetail } = this.props;

        //TODO: can we read content from here ?
        const { messages } = this.props;
        return <SendSecureMessage {...this.props} 
            messageInfo={messageDetail} 
            onSend={this.send} 
            onSave={this.save} 
            onMount={this.onMount} 
            hasErrors={messages.newMessageError}
            selectedSubject="Please select"
            selectedAccount="Please select" />;
    }
}

const mapState = state => ({
    subjects: state.subjects,
    messages: state.messages,
    accounts: state.accounts,
    messageDetail: state.viewMessage.messageDetail,
    customerID: state.segmentData.segmentData.customers[0].id,
    customerDetails: state.customerDetails.customerDetails,
    customerNameError: state.customerDetails.error,
});

const mapStateToProps = {
    popupState,
    getCustomerName,
    sendMessageData,
    sendMessageForAccessibiltiy
};
export default connect(mapState, mapStateToProps)(NewSecureMessageNew);
