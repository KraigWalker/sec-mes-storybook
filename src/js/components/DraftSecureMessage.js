import React from "react";
import SecureMessageForm from "./SecureMessageForm";
import {connect} from "react-redux";
import {PENDING, DRAFT} from "../constants/StringsConstants";
import {BuildSendMessageRequestEntity, getMessageAccountValue} from '../bl/SecureMessageBL';
import {popupState, sendMessageForAccessibiltiy, createNewMessage, 
    updateDraftMessage, setSendingMessages} from "../actions/AppActions"
import {
    MessageSelectors,
    getSubjectErrors,
    getSubjects,
    getAccounts
} from "../reducers";

class DraftSecureMessage extends React.Component {
    constructor(props) {
        super(props);
        this.send = this.send.bind(this);
        this.save = this.save.bind(this);
    }

    sendMessageData(messageEntity, status) {
        const {accounts, location, customerDetails} = this.props;
        const {id} = location.messageDetail;
        const {name} = customerDetails ? customerDetails.personal_details : '';
        const sendRequestMessage = BuildSendMessageRequestEntity(accounts, messageEntity);

        id ? this.props.updateDraftMessage({
            requestData: {
                ...sendRequestMessage.getMessageRequestData(), 
                id
            },
            status})
           :this.props.createNewMessage({
                requestData: sendRequestMessage.getMessageRequestData(), 
                status,
                name });
    }

    send(messageEntity) {
        this.sendMessageData(messageEntity, PENDING);
    }

    save(messageEntity) {
        this.sendMessageData(messageEntity, DRAFT);
    }

    render() {
        const {messageDetail} = this.props.location;
        const {content, isUpdatingMessage, isSavingDraft} = this.props;
        const selectedAccountValue = getMessageAccountValue(messageDetail, content);
        return <SecureMessageForm {...this.props}
                                  onSend={this.send}
                                  onSave={this.save}
                                  onMount={() => {
                                  }}
                                  title={content.draftMessageTitle}
                                  selectedSubject={messageDetail.subject}
                                  selectedAccount={messageDetail.account}
                                  selectedAccountValue={selectedAccountValue}
                                  messageText={messageDetail.message}
                                  isUpdatingMessage={isUpdatingMessage}
                                  isSavingDraft={isSavingDraft}
                                  buttonsDisabled={false}/>;
    }
}

const mapState = (state) => ({
    subjects: getSubjects(state),
    messages: MessageSelectors.getMessages(state),
    accounts:  getAccounts(state),
    subjectErrors: getSubjectErrors(state),
    messageError: MessageSelectors.getMessageError(state, DRAFT),
    successModal: MessageSelectors.getShowSuccessModal(state),
    isUpdatingMessage: MessageSelectors.getUpdating(state),
    isSavingDraft: MessageSelectors.getIsSavingDraft(state),
});

const mapStateToProps = {
    popupState,
    updateDraftMessage,
    sendMessageForAccessibiltiy,
    createNewMessage,
    setSendingMessages,
};
export default connect(mapState, mapStateToProps)(DraftSecureMessage);
