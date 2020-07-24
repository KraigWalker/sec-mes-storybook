import React from 'react';
import _ from 'lodash';
import SecureMessageForm from './SecureMessageForm';
import { connect } from 'react-redux';
import { popupState, createNewMessage, sendMessageForAccessibiltiy } from '../actions/AppActions';
import { getThreadsBL, getMessageAccountValue } from '../bl/SecureMessageBL';
import { PENDING, NEW, DRAFT } from '../constants/StringsConstants';
import SecureMessageSummary from './common/SecureMessageSummary';
import { BuildSendMessageRequestEntity } from '../bl/SecureMessageBL';
import { getAccounts, getSubjects, getMessageDetail, getCustomerError, getSubjectErrors, MessageSelectors } from '../reducers';

class ReplySecureMessage extends React.Component {
  constructor(props) {
    super(props);
    this.getThreads = this.getThreads.bind(this);
    this.handleSaveClick = this.handleSaveClick.bind(this);
  }

  getThreads({ messages, deletingMessages, currentMessage }) {
    const threads = getThreadsBL({
      messages,
      deletingMessages,
      currentMessage,
    });
    return _.map(threads, (thread, index) => {
      return <SecureMessageSummary key={index} message={{ ...thread }} content={this.props.content} />;
    });
  }

  handleSaveClick(status, messageEntity) {
    const { location, customerDetails, accounts } = this.props;
    const { name } = customerDetails ? customerDetails.personal_details : '';

    const sendRequestMessage = BuildSendMessageRequestEntity(accounts, messageEntity);
    this.props.createNewMessage({
      requestData: sendRequestMessage.getMessageRequestData(),
      ids: location.messageDetail,
      status,
      name: name || {},
    });
  }

  render() {
    const { messageDetail } = this.props.location.messageDetail ? this.props.location : this.props;

    const { messages, deletingMessages, content, isUpdatingMessage, isSavingDraft } = this.props;
    const selectedAccountValue = getMessageAccountValue(messageDetail, content);

    const threads = this.getThreads({ messages, deletingMessages, currentMessage: messageDetail });

    return (
      <SecureMessageForm
        {...this.props}
        threads={threads}
        onSend={messageEntity => this.handleSaveClick(PENDING, messageEntity)}
        onSave={messageEntity => this.handleSaveClick(DRAFT, messageEntity)}
        title={content.replyMessageTitle}
        selectedSubject={messageDetail.subject}
        selectedAccount={messageDetail.account}
        selectedAccountValue={selectedAccountValue}
        buttonsDisabled={true}
        isUpdatingMessage={isUpdatingMessage}
        isSavingDraft={isSavingDraft}
      />
    );
  }
}

const mapState = state => ({
  subjects: getSubjects(state),
  subjectErrors: getSubjectErrors(state),
  messages: MessageSelectors.getMessages(state),
  deletingMessages: MessageSelectors.getDeletingMessages(state),
  accounts: getAccounts(state),
  messageDetail: getMessageDetail(state),
  customerNameError: getCustomerError(state),
  messageError: MessageSelectors.getMessageError(state, NEW),
  successModal: MessageSelectors.getShowSuccessModal(state),
  isUpdatingMessage: MessageSelectors.getUpdating(state),
  isSavingDraft: MessageSelectors.getIsSavingDraft(state),
});

const mapStateToProps = {
  popupState,
  createNewMessage,
  sendMessageForAccessibiltiy,
};
export default connect(
  mapState,
  mapStateToProps
)(ReplySecureMessage);
