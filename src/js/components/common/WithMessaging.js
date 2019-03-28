import React, { Component } from "react";
import { compose } from "Redux";
import { connect } from "react-redux";
import {
  updateMessageData,
  delMessageData,
  closeDelModal,
  archiveMessageData,
  unarchiveMessageData,
  popupState
} from "../../actions/AppActions";
import {
  NEW,
  READ,
  DELETED,
  READ_ONLY,
  ARCHIVED
} from "../../constants/StringsConstants";
import GetIcon from "./GetIcon";
import {
  DELETE_MODAL,
  ARCHIVE_MODAL,
  UNARCHIVE_MODAL
} from "../../constants/ModalConstants";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { ConfirmationModal, CentredModal } from 'web-ui-components/lib/organisms/modals';
import { Button } from 'web-ui-components/lib/atoms/buttons';
import { ButtonGroup } from 'web-ui-components/lib/molecules/buttons'
import getOptionDisplayFunctions from "./MessageOptions";

const getSuccessModalMessage = (modalType, content) => {
  switch (modalType) {
    case ARCHIVE_MODAL: {
      return content.messageArchived;
    }
    case UNARCHIVE_MODAL: {
      return content.messageUnarchived;
    }
    case DELETE_MODAL:
    default: {
      return content.messageDeleted;
    }
  }
};


const WithMessaging = WrappedComponent =>
  class withMessaging extends Component {
    constructor(props) {
      super(props);
      this.state = {
        showDeleteConfirmModal: false,
        showSendServiceErrorModal: false,
        messageToDelete: {}
      };

      this.showDeleteConfirm = this.showDeleteConfirm.bind(this);
      this.closeConfirmModal = this.closeConfirmModal.bind(this);
      this.closeSuccessModal = this.closeSuccessModal.bind(this);
      this.closeErrorClicked = this.closeErrorClicked.bind(this);
      this.deleteClick = this.deleteClick.bind(this);
      this.archiveClick = this.archiveClick.bind(this);
      this.unarchiveClick = this.unarchiveClick.bind(this);
      this.replyClick = this.replyClick.bind(this);
      this.returnSuccessModalComponent = this.returnSuccessModalComponent.bind(
        this
      );
      this.returnErrorModal = this.returnErrorModal.bind(this);
      this.getDeleteConfirmModal = this.getDeleteConfirmModal.bind(this);
		}
		
		getOptionFunctions() {
			 return getOptionDisplayFunctions(this.props.readOnly, this.props.message.noReply);
		}

    componentDidMount() {
      this.props.popupState();
    }

    returnSuccessModalComponent(modalType, content) {
      const { viewMessageFlag } = this.props;
      const bodyContent = (
        <div>
          <div>
            <GetIcon id="icon-success" width="68px" height="68px" />
          </div>
          {getSuccessModalMessage(modalType, content)}
        </div>
      );
			const footerButtons =  (<ButtonGroup alignment="center">
				{viewMessageFlag ? (
						<Button
							display="primary"
							onClick={() => {this.closeSuccessModal(); this.props.history.push('/securemessages')}}
						>
							{content.ok}
						</Button>
				) : (
						<Button
							display="primary"
							onClick={this.closeSuccessModal}
						>
							{content.ok}
							</Button>
				)}

			</ButtonGroup>);

			return  (<CentredModal
				isOpen={true}
				buttonNode={footerButtons}
				onClose={this.closeSuccessModal}
				title=''
			>{bodyContent}
			
			</CentredModal>);
			
    }

    returnErrorModal() {
      const { content } = this.props;
      const bodyContent = (
        <div>
          <h3>{content.sorryHeader}</h3>
          <br />
          <p>{content.tryAgain}</p>
          <br />
          <p>{content.getInTouch}</p>
        </div>
      );
		 
			return  <ConfirmationModal
				title={bodyContent} 
				onConfirm={this.retryServiceCall} 
				isOpen={true} 
				onClose={this.closeErrorClicked}
				dismissButtonText={content.back}
				confirmButtonText={content.retry}
			/>
    }

    archiveClick(message) {
      this.props.archiveMessageData(message, message.id, ARCHIVED);
    }

    unarchiveClick(message) {
      this.props.unarchiveMessageData(message, message.id, READ);
    }

    replyClick(message) {
      const { viewMessageFlag } = this.props;
      const backpath =
        viewMessageFlag === true ? `/securemessages/view` : `/securemessages`;

      //Used in aria label for the reply button
      //   let replymessage;
      //   if (message.status === "READ") {
      //     replymessage = `${content.replyMessageTitle} ${message.getSubject()}`;
      //   } else {
      //     replymessage = `${content.replyUnread} ${message.getSubject()}`;
      //   }

			console.log('big push');
			console.log(message);
      this.props.history.push({
        pathname: "/securemessages/reply",
        messageDetail: message,
        backpath
      });
    }

    deleteClick() {

      const message = this.state.messageToDelete;
      if (message.status === NEW) {
        this.props.updateMessageData(message, message.id, READ);
        setTimeout(() => {
          this.props.delMessageData(message, message.id, DELETED);
        }, 500);
      } else this.props.delMessageData(message, message.id, DELETED);
      this.setState({
        showDeleteConfirmModal: false,
        showSendServiceErrorModal: true
      });
    }

    retryServiceCall() {
      this.props.popupState();
      this.deleteClick();
    }

    closeConfirmModal() {
      //TODO: not sure what this timeout is foe
      // setTimeout(() => {
      // 	document.getElementById('headingTag').focus();
      // }, 20);
      this.setState({ showDeleteConfirmModal: false, messageToDelete: null });
    }

    closeSuccessModal() {
			this.props.closeDelModal();
    }

    closeErrorClicked() {
      this.props.popupState();
      this.setState({ showSendServiceErrorModal: false });
    }

    showDeleteConfirm(message) {
      this.setState({
        showDeleteConfirmModal: true,
        messageToDelete: { ...message }
      });
    }

    getDeleteConfirmModal(message) {
      const { content } = this.props;
			
			return  <ConfirmationModal
				title={content.delete} 
				onConfirm={() => this.deleteClick(message)} 
				isOpen={true} 
				onClose={this.closeConfirmModal}
				dismissButtonText={content.dontDelButton}
				confirmButtonText={content.delButton}
			>{content.deleteMessageBody}</ConfirmationModal>
    }

    render() {
			const { messageDetail, messages, content, message } = this.props;
			
			const optionFunctions = this.getOptionFunctions();
			const showDelete = optionFunctions.showDeleteButton(message.status);
			const showReply = optionFunctions.showReplyButton(message.status);
			const showArchive = optionFunctions.showArchiveButton(message.status);
			const showUnarchive = optionFunctions.showUnarchiveButton(message.status);

      return (
        <div>
          <WrappedComponent
						{...this.props}
						onArchiveClick={showArchive? this.archiveClick : null}
						onReplyClick={showReply ? this.replyClick : null}
						onDeleteClick={showDelete ? this.showDeleteConfirm: null}
						onUnarchiveClick={showUnarchive? this.unarchiveClick : null}
						showArchive={showArchive}
						showDelete={showDelete}
						showUnarchive={showUnarchive}
						showReply={showReply}
          />
          {this.state.showDeleteConfirmModal && this.getDeleteConfirmModal()}
          {messageDetail.modalType > 0 &&
            this.returnSuccessModalComponent(messageDetail.modalType, content)}
          {messages.draftError &&
            this.state.showSendServiceErrorModal &&
            this.returnErrorModal()}
        </div>
      );
    }
  };

WithMessaging.propTypes = {
  viewMessageFlag: PropTypes.bool,
  content: PropTypes.object,
  messages: PropTypes.array,
  messageDetail: PropTypes.object
};

const mapState = (state, props) => ({
  messages: state.messages,
  messagesubjects: state.subjects,
  accounts: state.accounts,
  messageDetail: state.viewMessage,
  readOnly: state.messages.mode === READ_ONLY,
  message: props.message ? props.message : props.location.messageDetail
});

const actionCreators = {
  delMessageData,
  updateMessageData,
  closeDelModal,
  popupState,
  unarchiveMessageData,
  archiveMessageData
};

const composedWithMessaging = compose(
  connect(
    mapState,
    actionCreators
  ),
  withRouter,
  WithMessaging
);

export default composedWithMessaging;
