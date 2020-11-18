import React, { Component } from 'react';
import SecureMessageForm from './SecureMessageForm';
import { connect } from 'react-redux';
import { PENDING, DRAFT, NEW } from '../constants/StringsConstants';
import { BuildSendMessageRequestEntity } from '../bl/SecureMessageBL';
import {
  popupState,
  createNewMessage,
  sendMessageForAccessibiltiy,
} from '../actions/AppActions';
import {
  getAccounts,
  getSubjects,
  getMessageDetail,
  getCustomerError,
  getSubjectErrors,
  MessageSelectors,
} from '../reducers';

class NewSecureMessage extends Component {
  constructor() {
    super();
    this.sendMessageData = this.sendMessageData.bind(this);
  }

  sendMessageData(messageEntity, status) {
    const { accounts } = this.props;
    const sendRequestMessage = BuildSendMessageRequestEntity(
      accounts,
      messageEntity
    );

    /** @todo why is this function passed in as a prop? */
    this.props.createNewMessage({
      requestData: sendRequestMessage.getMessageRequestData(),
      status,
    });
  }

  render() {
    const { content, isSavingDraft, isUpdatingMessage } = this.props;
    return (
      <SecureMessageForm
        /** @todo Get specific about what props are being passed. Remove spread */
        {...this.props}
        onSend={function onSend(messageEntity) {
          this.sendMessageData(messageEntity, PENDING);
        }}
        onSave={function onSave(messageEntity) {
          this.sendMessageData(messageEntity, DRAFT);
        }}
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

export default connect(
  (state) => ({
    subjects: getSubjects(state),
    messages: MessageSelectors.getMessages(state),
    isUpdatingMessage: MessageSelectors.getUpdating(state),
    isSavingDraft: MessageSelectors.getIsSavingDraft(state),
    accounts: getAccounts(state),
    subjectErrors: getSubjectErrors(state),
    messageDetail: getMessageDetail(state),
    customerNameError: getCustomerError(state),
    successModal: MessageSelectors.getShowSuccessModal(state),
    messageError: MessageSelectors.getMessageError(state, NEW),
  }),
  {
    popupState,
    createNewMessage,
    sendMessageForAccessibiltiy,
  }
)(NewSecureMessage);
