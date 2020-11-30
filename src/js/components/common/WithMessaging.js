import { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {
  setMessageRead,
  delMessageData,
  closeDelModal,
  archiveMessageData,
  unarchiveMessageData,
  popupState,
} from '../../actions/AppActions';
import { NEW, READ, READ_ONLY } from '../../constants/StringsConstants';

import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ConfirmationModal } from 'web-ui-components/lib/organisms/modals';
import { getOptionDisplayFunctions } from './MessageOptions';
import { StandardBody } from 'web-ui-components/lib/typography/body';
import { MessageSelectors } from '../../reducers';

const WithMessaging = (WrappedComponent) =>
  class withMessaging extends Component {
    constructor(props) {
      super(props);
      this.state = {
        showDeleteConfirmModal: false,
        showSendServiceErrorModal: false,
        modalType: 0,
        messageToDelete: {},
      };
      // end of singleton
      this.showDeleteConfirm = this.showDeleteConfirm.bind(this);
      this.closeConfirmModal = this.closeConfirmModal.bind(this);
      this.closeSuccessModal = this.closeSuccessModal.bind(this);
      this.deleteClick = this.deleteClick.bind(this);
      this.archiveClick = this.archiveClick.bind(this);
      this.unarchiveClick = this.unarchiveClick.bind(this);
      this.replyClick = this.replyClick.bind(this);
      this.closeAndReturn = this.closeAndReturn.bind(this);
    }

    closeAndReturn() {
      this.closeSuccessModal();
      const { pathName } = this.props.location;
      if (pathName !== '/securemessages') {
        this.props.history.push('/securemessages');
      }
    }

    archiveClick(message) {
      this.props.archiveMessageData(message);
    }

    unarchiveClick(message) {
      this.props.unarchiveMessageData(message);
    }

    replyClick(message) {
      this.props.history.push({
        pathname: '/securemessages/reply',
        messageDetail: message,
        backpath: '/securemessages/',
      });
    }

    deleteClick() {
      const message = this.state.messageToDelete;
      if (message.status === NEW) {
        this.props.setMessageRead(message);
        setTimeout(() => {
          this.props.delMessageData(message);
        }, 500);
      } else this.props.delMessageData(message);
      this.setState({
        showDeleteConfirmModal: false,
      });
    }

    closeConfirmModal() {
      this.setState({ showDeleteConfirmModal: false, messageToDelete: null });
    }

    closeSuccessModal() {
      this.props.closeDelModal();
    }

    showDeleteConfirm(message) {
      this.setState({
        showDeleteConfirmModal: true,
        messageToDelete: { ...message },
      });
    }

    render() {
      const { content, actualStatus } = this.props;

      const {
        showDeleteButton,
        showReplyButton,
        showArchiveButton,
        showUnarchiveButton,
      } = getOptionDisplayFunctions(
        this.props.readOnly,
        this.props.message.noReply
      );

      const showDelete = showDeleteButton(actualStatus);
      const showReply = showReplyButton(actualStatus);
      const showArchive = showArchiveButton(actualStatus);
      const showUnarchive = showUnarchiveButton(actualStatus);

      return (
        <div className="u-full-width">
          <WrappedComponent
            {...this.props}
            showArchive={showArchive}
            showDelete={showDelete}
            showUnarchive={showUnarchive}
            showReply={showReply}
            onArchiveClick={showArchive ? this.archiveClick : null}
            onReplyClick={showReply ? this.replyClick : null}
            onDeleteClick={showDelete ? this.showDeleteConfirm : null}
            onUnarchiveClick={showUnarchive ? this.unarchiveClick : null}
          />
          {this.state.showDeleteConfirmModal && (
            <ConfirmationModal
              title={content.delete}
              onConfirm={this.deleteClick}
              isOpen={true}
              onClose={this.closeConfirmModal}
              dismissButtonText={content.dontDelButton}
              confirmButtonText={content.delButton}
            >
              <StandardBody>
                <p>{content.deleteMessageBody}</p>
              </StandardBody>
            </ConfirmationModal>
          )}
        </div>
      );
    }
  };

WithMessaging.propTypes = {
  viewMessageFlag: PropTypes.bool,
  content: PropTypes.object,
  messageDetail: PropTypes.object,
};

const mapState = (state, props) => {
  const message = props.message ? props.message : props.location.messageDetail;
  return {
    messagesubjects: state.subjects,
    accounts: state.accounts,
    messageDetail: state.viewMessage,
    readOnly: MessageSelectors.getMode(state) === READ_ONLY,
    message,
    actualStatus: props.justBeenRead ? READ : message.status,
  };
};

const actionCreators = {
  delMessageData,
  setMessageRead,
  closeDelModal,
  popupState,
  unarchiveMessageData,
  archiveMessageData,
};

const composedWithMessaging = compose(
  connect(mapState, actionCreators),
  withRouter,
  WithMessaging
);

export default composedWithMessaging;
