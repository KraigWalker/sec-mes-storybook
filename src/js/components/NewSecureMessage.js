import React from "react";
import SecureMessageForm from "./SecureMessageForm";
import { connect } from "react-redux";
import { PENDING, DRAFT } from "../constants/StringsConstants";
import { BuildSendMessageRequestEntity } from "../bl/SecureMessageBL";
import {
  popupState,
  sendMessageData,
  sendMessageForAccessibiltiy
} from "../actions/AppActions";
import {
  getAccounts,
  getMessages,
  getSubjects,
  getMessageDetail,
  getCustomerError,
  getSubjectErrors,
  getShowSuccessModal,
  getUpdating,
  getIsSavingDraft
} from "../reducers";

class NewSecureMessage extends React.Component {
  constructor(props) {
    super(props);
    this.onMount = this.onMount.bind(this);
    this.send = this.send.bind(this);
    this.save = this.save.bind(this);
  }
  sendMessageData(messageEntity, status) {
    const { accounts } = this.props;
    const sendRequestMessage = BuildSendMessageRequestEntity(
      accounts,
      messageEntity
    );
    this.props.sendMessageData(
      sendRequestMessage.getMessageRequestData(),
      status,
    );
  }
  send(messageEntity) {
    this.sendMessageData(messageEntity, PENDING);
  }
  save(messageEntity) {
    this.sendMessageData(messageEntity, DRAFT);
  }
  render() {
    const { content, isSavingDraft, isUpdatingMessage } = this.props;
    return (
      <SecureMessageForm
        {...this.props}
        onSend={this.send}
        onSave={this.save}
        onMount={this.onMount}
        messageError={false}
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
  messages: getMessages(state),
  isUpdatingMessage: getUpdating(state),
  isSavingDraft: getIsSavingDraft(state),
  accounts: getAccounts(state),
  subjectErrors: getSubjectErrors(state),
  messageDetail: getMessageDetail(state),
  customerNameError: getCustomerError(state),
  successModal: getShowSuccessModal(state),
});

const actionCreators = {
  popupState,
  sendMessageData,
  sendMessageForAccessibiltiy
};
export default connect(
  mapStateToProps,
  actionCreators
)(NewSecureMessage);
