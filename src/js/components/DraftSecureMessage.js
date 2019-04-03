import React from "react";
import SecureMessageForm from "./SecureMessageForm";
import { connect } from "react-redux";
import { PENDING, DRAFT } from "../constants/StringsConstants";
import { BuildSendMessageRequestEntity, getMessageAccountValue } from '../bl/SecureMessageBL';
import {popupState, sendMessageForAccessibiltiy, updateMessageData } from "../actions/AppActions"
import {
    getAccounts,
    getMessages,
    getMessageError,
    getSubjects,
    getSubjectErrors,
    getShowSuccessModal
  } from "../reducers";
  
class DraftSecureMessage extends React.Component {
    constructor(props) {
        super(props);
        this.onMount = this.onMount.bind(this);
        this.send = this.send.bind(this);
        this.save = this.save.bind(this);
    }
    onMount() { }

    sendMessageData(messageEntity, status) {
        const { accounts, location} = this.props;
        const { id } = location.messageDetail;
    
        const sendRequestMessage = BuildSendMessageRequestEntity(accounts, messageEntity);
        this.props.updateMessageData(sendRequestMessage.getMessageRequestData(), id, status);
    }
    send(messageEntity) {
        this.sendMessageData(messageEntity, PENDING);

    }
    save(messageEntity) {
        this.sendMessageData(messageEntity, DRAFT);
    }
    render() {

        const { messageDetail } = this.props.location;
        const { content } = this.props;

	    const selectedAccountValue = getMessageAccountValue(messageDetail, content);

        return <SecureMessageForm {...this.props} 
            onSend={this.send} 
            onSave={this.save} 
            onMount={this.onMount} 
            title={content.draftMessageTitle}
            selectedSubject={messageDetail.subject}
            selectedAccount={messageDetail.account}
            selectedAccountValue={selectedAccountValue}
            messageText={messageDetail.message}
            buttonsDisabled={true}/>;
    }
}

const mapState = (state) => ({
    subjects: getSubjects(state),
    messages: getMessages(state),
    accounts: getAccounts(state),
    subjectErrors: getSubjectErrors(state),
    messageError: getMessageError(state, DRAFT),
    successModal: getShowSuccessModal(state)
});

const mapStateToProps = {
    popupState,
    updateMessageData,
    sendMessageForAccessibiltiy
};
export default connect(mapState, mapStateToProps)(DraftSecureMessage);
