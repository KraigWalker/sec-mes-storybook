import React, {Component} from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import {
    updateMessageData,
    delMessageData,
    closeDelModal,
    archiveMessageData,
    unarchiveMessageData,
    popupState,
    setDeletingMessages,
} from "../../actions/AppActions";
import {
    NEW,
    READ,
    DELETED,
    READ_ONLY,
    ARCHIVED
} from "../../constants/StringsConstants";

import {withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import {ConfirmationModal} from "web-ui-components/lib/organisms/modals";
import getOptionDisplayFunctions from "./MessageOptions";
import {TextBody} from "web-ui-components/lib/atoms/text";
import ErrorModal from "./ErrorModal";

const WithMessaging = WrappedComponent =>
    class withMessaging extends Component {
        constructor(props) {
            super(props);
            this.state = {
                showDeleteConfirmModal: false,
                showSendServiceErrorModal: false,
                modalType: 0,
                messageToDelete: {}
            };
            // singleton instance
            withMessaging.__singletonRef = this;
            // end of singleton
            this.showDeleteConfirm = this.showDeleteConfirm.bind(this);
            this.closeConfirmModal = this.closeConfirmModal.bind(this);
            this.closeSuccessModal = this.closeSuccessModal.bind(this);
            this.closeErrorClicked = this.closeErrorClicked.bind(this);
            this.deleteClick = this.deleteClick.bind(this);
            this.archiveClick = this.archiveClick.bind(this);
            this.unarchiveClick = this.unarchiveClick.bind(this);
            this.replyClick = this.replyClick.bind(this);
            this.returnErrorModal = this.returnErrorModal.bind(this);
            this.getDeleteConfirmModal = this.getDeleteConfirmModal.bind(this);
            this.closeAndReturn = this.closeAndReturn.bind(this);
            this.__show = this.__show.bind(this);
            this.__hide = this.__show.bind(this);
        }

        getOptionFunctions() {
            return getOptionDisplayFunctions(
                this.props.readOnly,
                this.props.message.noReply
            );
        }

        componentDidMount() {
            this.props.popupState();
        }

        closeAndReturn() {
            this.closeSuccessModal();
            const {pathName} = this.props.location;
            if (pathName !== "/securemessages") {
                this.props.history.push("/securemessages");
            }
        }

        returnErrorModal() {
            const {content} = this.props;

            return (
                <ErrorModal
                    content={content}
                    onClose={this.errorCloseClicked}
                    onConfirm={this.retryServiceCall}
                />
            );
        }

        archiveClick(message) {
            this.props.archiveMessageData(message, message.id, ARCHIVED);
        }

        unarchiveClick(message) {
            this.props.unarchiveMessageData(message, message.id, READ);
        }

        replyClick(message) {
            this.props.history.push({
                pathname: "/securemessages/reply",
                messageDetail: message,
                backpath: "/securemessages/"
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
            }, () => this.props.setDeletingMessages(message.id));
        }

        retryServiceCall() {
            this.props.popupState();
            this.deleteClick();
        }

        closeConfirmModal() {
            this.setState({showDeleteConfirmModal: false, messageToDelete: null});
        }

        closeSuccessModal() {
            this.props.closeDelModal();
        }

        closeErrorClicked() {
            this.props.popupState();
            this.setState({showSendServiceErrorModal: false});
        }

        showDeleteConfirm(message) {
            this.setState({
                showDeleteConfirmModal: true,
                messageToDelete: {...message}
            });
        }

        getDeleteConfirmModal(message) {
            const {content} = this.props;

            return (
                <ConfirmationModal
                    title={content.delete}
                    onConfirm={() => this.deleteClick(message)}
                    isOpen={true}
                    onClose={this.closeConfirmModal}
                    dismissButtonText={content.dontDelButton}
                    confirmButtonText={content.delButton}
                >
                    <TextBody>{content.deleteMessageBody}</TextBody>
                </ConfirmationModal>
            );
        }

        componentWillReceiveProps(nextProps, nextContext) {
            const {modalType} = this.state;
            const {messageDetail} = nextProps;
            if (modalType !== messageDetail.modalType) {
                return withMessaging.show()
            }
        }
        static show () {
            withMessaging.__singletonRef.__show();
        }
        static hide () {
            withMessaging.__singletonRef.__hide();
        }
        __show() {
            this.setState({
                showSuccessModal: true,
            });
        }

        __hide() {
            this.setState({
                showSuccessModal: false,
            });
        }

        render() {
            const {
                messageDetail,
                messages,
                content,
                message,
            } = this.props;
            const {showSuccessModal} = this.state;
            const optionFunctions = this.getOptionFunctions();
            const showDelete = optionFunctions.showDeleteButton(message.status);
            const showReply = optionFunctions.showReplyButton(message.status);
            const showArchive = optionFunctions.showArchiveButton(message.status);
            const showUnarchive = optionFunctions.showUnarchiveButton(message.status);
            return (
                <div className="u-full-width">
                    <WrappedComponent
                        {...this.props}
                        onArchiveClick={showArchive ? this.archiveClick : null}
                        onReplyClick={showReply ? this.replyClick : null}
                        onDeleteClick={showDelete ? this.showDeleteConfirm : null}
                        onUnarchiveClick={showUnarchive ? this.unarchiveClick : null}
                        showArchive={showArchive}
                        showDelete={showDelete}
                        showUnarchive={showUnarchive}
                        showReply={showReply}
                    />
                    {this.state.showDeleteConfirmModal && this.getDeleteConfirmModal()}
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
    setDeletingMessages,
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
