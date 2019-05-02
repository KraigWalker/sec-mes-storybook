import React from "react";
import SecureMessageForm from "./SecureMessageForm";
import { connect } from "react-redux";
import { PENDING, DRAFT } from "../constants/StringsConstants";
import { BuildSendMessageRequestEntity } from "../bl/SecureMessageBL";
import {
  popupState,
  getCustomerName,
  sendMessageData,
  sendMessageForAccessibiltiy
} from "../actions/AppActions";
import {
  getAccounts,
  getMessages,
  getSubjects,
  getMessageDetail,
  getCustomerId,
  getCustomerDetails,
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
  onMount() {
    const { customerID } = this.props;
    this.props.getCustomerName(customerID);
  }
  sendMessageData(messageEntity, status) {
    const { customerDetails, accounts } = this.props;
    const { name } = customerDetails ? customerDetails.personal_details : '';
    const sendRequestMessage = BuildSendMessageRequestEntity(
      accounts,
      messageEntity
    );
    this.props.sendMessageData(
      sendRequestMessage.getMessageRequestData(),
      status,
      name
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
  customerID: getCustomerId(state),
  customerDetails: getCustomerDetails(state),
  customerNameError: getCustomerError(state),
  successModal: getShowSuccessModal(state),
});

const actionCreators = {
  popupState,
  getCustomerName,
  sendMessageData,
  sendMessageForAccessibiltiy
};
export default connect(
  mapStateToProps,
  actionCreators
)(NewSecureMessage);