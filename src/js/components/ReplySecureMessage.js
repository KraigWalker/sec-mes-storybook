import React from "react";
import SecureMessageForm from "./SecureMessageForm";
import { connect } from "react-redux";
import {
  updateMessageData,
  popupState,
  getCustomerName,
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
  getCustomerId,
  getCustomerDetails,
  getCustomerError,
  getSubjectErrors,
  getShowSuccessModal
} from "../reducers";

class ReplySecureMessage extends React.Component {
  constructor(props) {
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
    //DEBT -copied over in refactor, message click on summary should set the status, not this component
    if (messageDetail && messageDetail.status === NEW) {
      this.props.updateMessageData(messageDetail, messageDetail.id, READ);
    }
    this.props.getCustomerName(customerID);
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

  send(messageEntity) {
    const { customerDetails, accounts } = this.props;
    const { name } = customerDetails.personal_details;

    const sendRequestMessage = BuildSendMessageRequestEntity(
      accounts,
      messageEntity
    );
    this.props.sendMessageData(
      sendRequestMessage.getMessageRequestData(),
      PENDING,
      name
    );
  }

  save(messageEntity) {
    const { location, customerDetails, accounts } = this.props;
    const { name } = customerDetails.personal_details;

    const sendRequestMessage = BuildSendMessageRequestEntity(
      accounts,
      messageEntity
    );
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
	  
	const { messages, content } = this.props;
	const selectedAccountValue = getMessageAccountValue(messageDetail, content);

    const threads = this.getThreads(messages, messageDetail);
    return (
      <SecureMessageForm
        {...this.props}
        threads={threads}
        onSend={this.send}
        onSave={this.save}
        onMount={this.onMount}
        title={content.replyMessageTitle}
        selectedSubject={messageDetail.subject}
		selectedAccount={messageDetail.account}
		selectedAccountValue={selectedAccountValue}
		buttonsDisabled={true}
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
  customerID: getCustomerId(state),
  customerDetails: getCustomerDetails(state),
  customerNameError: getCustomerError(state),
  messageError: getMessageError(state, NEW),
  successModal: getShowSuccessModal(state)
});

const mapStateToProps = {
  updateMessageData,
  popupState,
  getCustomerName,
  sendMessageData,
  replyMessageData,
  sendMessageForAccessibiltiy
};
export default connect(
  mapState,
  mapStateToProps
)(ReplySecureMessage);
