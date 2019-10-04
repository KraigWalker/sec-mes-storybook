import React from "react";
import SecureMessageForm from "./SecureMessageForm";
import { connect } from "react-redux";
import { PENDING, DRAFT, NEW } from "../constants/StringsConstants";
import { BuildSendMessageRequestEntity } from "../bl/SecureMessageBL";
import {
  popupState,
  createNewMessage,
  sendMessageForAccessibiltiy
} from "../actions/AppActions";
import {
  getAccounts,
  getMessages,
  getSubjects,
  getMessageDetail,
  getCustomerError,
  getSubjectErrors,
  MessageSelectors
} from "../reducers";

class NewSecureMessage extends React.Component {
  constructor(props) {
    super(props);
    this.send = this.send.bind(this);
    this.save = this.save.bind(this);
  }
  sendMessageData(messageEntity, status) {
    const { accounts } = this.props;
    const sendRequestMessage = BuildSendMessageRequestEntity(
      accounts,
      messageEntity
    );
    this.props.createNewMessage({
      requestData: sendRequestMessage.getMessageRequestData(),
      status,
    });
  }
  send(messageEntity) {
    this.sendMessageData(messageEntity, PENDING);
  }
  save(messageEntity) {
    this.sendMessageData(messageEntity, DRAFT);
  }
  render() {
    const { content, isSavingDraft, isUpdatingMessage, messageError } = this.props;
    return (
      <SecureMessageForm
        {...this.props}
        onSend={this.send}
        onSave={this.save}
        onMount={this.onMount}
        title={content.newMessagePageTitle}
        selectedSubject={content.pleaseSelect}
        selectedAccountValue={content.pleaseSelect}
        buttonsDisabled={true}
        isSavingDraft={isSavingDraft}
        isUpdatingMessage={isUpdatingMessage}
      />
    );
  }
}

const mapStateToProps = state => ({
  subjects: getSubjects(state),
  messages: MessageSelectors.getMessages(state),
  isUpdatingMessage: MessageSelectors.getUpdating(state),
  isSavingDraft:  MessageSelectors.getIsSavingDraft(state),
  accounts: getAccounts(state),
  subjectErrors: getSubjectErrors(state),
  messageDetail: getMessageDetail(state),
  customerNameError: getCustomerError(state),
  successModal: MessageSelectors.getShowSuccessModal(state),
  messageError: MessageSelectors.getMessageError(state, NEW),
});

const actionCreators = {
  popupState,
  createNewMessage,
  sendMessageForAccessibiltiy
};
export default connect(
  mapStateToProps,
  actionCreators
)(NewSecureMessage);
