import React from "react";
import SecureMessageForm from "./SecureMessageForm";
import { connect } from "react-redux";
import {
  updateMessageData,
  popupState,
  sendMessageData,
  replyMessageData,
  sendMessageForAccessibiltiy
} from "../actions/AppActions";
import { getThreadsBL , getMessageAccountValue } from "../bl/SecureMessageBL";
import { PENDING, READ, NEW, DRAFT } from "../constants/StringsConstants";
import SecureMessageSummary from "./common/SecureMessageSummary";
import { BuildSendMessageRequestEntity } from "../bl/SecureMessageBL";
import {
  getAccounts,
  getMessages,
  getMessageError,
  getSubjects,
  getMessageDetail,
  getCustomerError,
  getSubjectErrors,
  getShowSuccessModal,
  getUpdating,
  getIsSavingDraft
} from "../reducers";

class ReplySecureMessage extends React.Component {
  constructor(props) {
    super(props);
    this.onMount = this.onMount.bind(this);
    this.getThreads = this.getThreads.bind(this);
    this.handleSaveClick = this.handleSaveClick.bind(this);
  }

  getThreads(messages, currentMessage) {
    const threads = getThreadsBL(messages, currentMessage);
    return _.map(threads, (thread, index) => {
      return (
        <SecureMessageSummary
          key={index}
          message={{ ...thread }}
          content={this.props.content}
        />
      );
    });
  }

  handleSaveClick(status, messageEntity) {

    const { location, customerDetails, accounts } = this.props;
    const { name } = customerDetails ? customerDetails.personal_details : '';

    const sendRequestMessage = BuildSendMessageRequestEntity(
      accounts,
      messageEntity
    );
    this.props.replyMessageData(
      sendRequestMessage.getMessageRequestData(),
      location.messageDetail,
      status,
      name || {}
    );
  }

  render() {
    const { messageDetail } = this.props.location.messageDetail
      ? this.props.location
	  : this.props;

	const { messages, content, isUpdatingMessage, isSavingDraft } = this.props;
	const selectedAccountValue = getMessageAccountValue(messageDetail, content);

    const threads = this.getThreads(messages, messageDetail);
    return (
      <SecureMessageForm
        {...this.props}
        threads={threads}
        onSend={(messageEntity) => this.handleSaveClick(PENDING, messageEntity)}
        onSave={(messageEntity) => this.handleSaveClick(DRAFT, messageEntity)}
        onMount={this.onMount}
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

const mapState = (state) => ({
  subjects: getSubjects(state),
  subjectErrors: getSubjectErrors(state),
  messages: getMessages(state),
  accounts: getAccounts(state),
  messageDetail: getMessageDetail(state),
  customerNameError: getCustomerError(state),
  messageError: getMessageError(state, NEW),
  successModal: getShowSuccessModal(state),
  isUpdatingMessage: getUpdating(state),
  isSavingDraft: getIsSavingDraft(state),
});

const mapStateToProps = {
  updateMessageData,
  popupState,
  sendMessageData,
  replyMessageData,
  sendMessageForAccessibiltiy
};
export default connect(
  mapState,
  mapStateToProps
)(ReplySecureMessage);
