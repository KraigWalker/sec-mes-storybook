import React from "react";
import { compose } from "redux";
import { utils, actions as documentActions } from "document-management-web-ui";

import StepHeader from "./common/StepHeader";
import SecureMessageSummary from "./common/SecureMessageSummary";
import Threads from "./common/ThreadList";
import _ from "lodash";
import { connect } from "react-redux";
import {
	setViewMessageDetail,
	updateMessageData,
	popupState,
	archiveMessageData, unarchiveMessageData
} from "../actions/AppActions";
import { getThreadsBL } from "../bl/SecureMessageBL";
import {
	getMessageType,
} from "../utils/SecureMessageUtils";
import { Link } from "react-router-dom";
import GetIcon from "./common/GetIcon";
import ModalComponent from "./common/ModalComponent";
import { READ, NEW, SENT, DELETED, READ_ONLY, ARCHIVED } from '../constants/StringsConstants';
import getOptionDisplayFunctions from "./common/MessageOptions";
import SecondaryButton from "./common/SecondaryButton";

const Attachments = ({ document, onClick }) => (
	<div className="c-message--attachments">
		<h4>Attachments</h4>
		<ul>
			<li>
				<a href="#" onClick={onClick}>{document.label}</a>
			</li>
		</ul>
	</div>
);

export class ViewMessage extends React.Component {
	constructor(props) {
		super(props);
		this.getReplyButton = this.getReplyButton.bind(this);
		this.state = {
			showDeleteConfirmModal: false,
			showDeleteSuccessModal: false,
			showSendServiceErrorModal: false,
		};
		this.closeModal = this.closeModal.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
		this.deleteClick = this.deleteClick.bind(this);
		this.archiveClick = this.archiveClick.bind(this);
		this.unarchiveClick = this.unarchiveClick.bind(this);
		this.returnDeleteSuccessModalComponent = this.returnDeleteSuccessModalComponent.bind(
			this
		);
		this.returnModalComponent = this.returnModalComponent.bind(this);
		this.closeSuccessModal = this.closeSuccessModal.bind(this);
		this.errorCloseClicked = this.errorCloseClicked.bind(this);
		this.retryServiceCall = this.retryServiceCall.bind(this);
		this.handleAttachmentClick = this.handleAttachmentClick.bind(this);

	}

	componentDidMount() {
		const { messageDetail } = this.props.location;
		const { isWebView, setMessagesMetaData, messages, dispatch } = this.props;

		messageDetail &&
			dispatch(
				setViewMessageDetail(messageDetail)
			); // to set current viewing message
		// Below is to update New message to Read message status.
		if (messageDetail && messageDetail.status === 'NEW') {
			if (!messages.mode === READ_ONLY) {
				dispatch(
					updateMessageData(
						messageDetail,
						messageDetail.id,
						'READ'
					)
				);
			}
			if (isWebView) {
				const unreadMessageCount = messages.messages.filter(message => message.status === "NEW").length
				setMessagesMetaData({ unread: unreadMessageCount - 1 });
			}
		}
		dispatch(popupState());
		window.scrollTo(0, 0);
	}
	getThreads(messages, currentMessage) {
		const threads = getThreadsBL(messages, currentMessage);
		return <Threads Threads={threads} content={this.props.content}/>;
	}
	getReplyButton = message => {
		if (getMessageType(message.status) !== SENT) {
			return (
				<Link
					id="reply-button"
					to={{ pathname: `/securemessages/reply`, backPath: `/securemessages/view`, messageDetail: message }}
					className="c-btn c-btn--primary"
				>
				{this.props.content.replyMessageTitle}
	</Link>
			);
		};
	};

	handleDelete(data) {
		this.setState({ showDeleteConfirmModal: true });
	}

	handleAttachmentClick() {
		const { isWebView, session, messageDetail, client, dispatch } = this.props;
		if (!isWebView) {
			window.open(`/my-documents/${session.brand}/${messageDetail.document.id}#access_token=${session.access_token}&bank_id=${session.bank_id}&client_context=${
				client.client.app_title
			  }&user_tracking_id=${client.client.user_tracking_id}&brandId=${session.bank_id}&state=${session.state}`)
		} else {
			dispatch(
				documentActions.getDocumentByIdNative(messageDetail.document.id, messageDetail.document.fileSize)
			);
		}
	}

	closeModal() {
		this.setState({ showDeleteConfirmModal: false });
	}
	errorCloseClicked() {
		this.setState({ showSendServiceErrorModal: false });
	}
	retryServiceCall() {
		this.props.dispatch(popupState());
		this.deleteClick();
	}
	deleteClick() {
		this.setState({
			showDeleteSuccessModal: true,
			showDeleteConfirmModal: false,
			showSendServiceErrorModal: true,
		});
		this.props.dispatch(
			updateMessageData(
				this.props.location.messageDetail,
				this.props.location.messageDetail.id,
				DELETED
			)
		);
	}

	archiveClick() {
		const { messageDetail, dispatch } = this.props;
		dispatch(archiveMessageData(messageDetail, messageDetail.id, ARCHIVED));
	}

	unarchiveClick() {
		const { messageDetail, dispatch } = this.props;
		dispatch(unarchiveMessageData(messageDetail, messageDetail.id, READ));
	}

	getHeaderTitle(status) {

		switch (getMessageType(status))
		{
			case SENT: 
				return this.props.content.sentPageTitle;
			case ARCHIVED:
				return this.props.content.archivePageTitle;
			default:
				return this.props.content.inboxPageTitle;

		}
	}

	getBackButton() {
		return (
			<Link
				to={{ pathname: `/securemessages` }}
				className="c-btn c-btn--secondary"
			>
				{this.props.content.back}
	</Link>
		);
	}
	returnModalComponent() {
		const { content } = this.props;
		const bodyContent = (
			<div className="callout callout__error">
				{content.deleteMessageBody}
			</div>
		);
		const footerButtons = (
			<div>
				<button
					type="button"
					onClick={this.closeModal}
					className="c-btn c-btn--secondary c-modal__button"
				>
					{content.dontDelButton}
				</button>
				<button
					type="button"
					onClick={this.deleteClick}
					className="c-btn c-btn--default c-modal__button"
				>
					{content.delButton}
				</button>
			</div>
		);
		return (
			<ModalComponent
				show
				onHide={this.closeModal}
				customClass="c-modal"
				modalheading={content.deleteMessageHeading}
				modalbody={bodyContent}
				modalfooter={footerButtons}
				modalInContainer={false}
				closeButton
			/>
		);
	}
	returnDeleteSuccessModalComponent() {
		const { content } = this.props;
		const bodyContent = (
			<div>
				<div>
					<GetIcon id="icon-success" width="68px" height="68px" />
				</div>{content.messageDeleted}
			</div>
		);
		const footerButtons = (
			<Link
				to={`/securemessages`}
				onClick={this.closeSuccessModal}
				className="c-btn c-btn--default c-btn--sm c-modal__button"
			>
				{content.ok}
    </Link>
		);

		return (
			<ModalComponent
				show
				customClass="c-modal c-modal--center"
				bsSize="small"
				modalheading=""
				modalbody={bodyContent}
				modalfooter={footerButtons}
				modalInContainer={false}
				closeButton={false}
			/>
		);
	}
	closeSuccessModal() {
		this.setState({ showDeleteSuccessModal: false });
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
		const footerButtons = (
			<div>
				<button
					type="button"
					className="c-btn c-btn--secondary c-modal__button"
					onClick={this.errorCloseClicked}
				>
					{content.back}
		</button>
				<button
					type="button"
					onClick={this.retryServiceCall}
					className="c-btn c-btn--default c-modal__button"
				>
					{content.retry}
				</button>
			</div>
		);
		return (
			<ModalComponent
				show
				onHide={this.errorCloseClicked}
				customClass="c-modal c-modal--center"
				bsSize="medium"
				modalheading=""
				modalbody={bodyContent}
				modalfooter={footerButtons}
				modalInContainer={false}
				closeButton
			/>
		);
	}
	render() {
		const { messageDetail } = this.props.location.messageDetail
			? this.props.location
			: this.props;

		const { hasAttachment, readOnly, session, client, content } = this.props;

		const optionFunctions = getOptionDisplayFunctions(readOnly, messageDetail.noReply);

		//DEBT: Before getting here status may still be NEW after user has clicked on email in summary
		//Status should be READ in this instance. We may need to change where/when status is updated...
		const messageStatus = (messageDetail.status === NEW && readOnly !== true) 
						? READ
						: messageDetail.status;

		return (
			<div className="row centralised-container c-card">
				<div className="col-md1-24 col-sm1-24 col-lg1-24">
					<StepHeader
						showheaderCrumbs
						headerCrumbsPath={{
							pathname: `/securemessages`,
						}}
						headerCrumbsMessage="Back"
						headerTitle={this.getHeaderTitle(messageStatus)}
					/>

					<SecureMessageSummary
						message={messageDetail}
						viewMessageFlag
						readFlag={messageStatus === READ}
						sentFlag={getMessageType(messageStatus) === SENT}
						content={this.props.content}
					/>
					<pre>{messageDetail.message}</pre>
					{ hasAttachment && <Attachments document={messageDetail.document} onClick={this.handleAttachmentClick}/> }
					<div className="c-btn--group">
						{this.getBackButton()}
						{optionFunctions.showDeleteButton(messageStatus) && <SecondaryButton name={content.delete} onClick={this.handleDelete} />}
						{optionFunctions.showUnarchiveButton(messageStatus) && <SecondaryButton name={content.moveToInbox} onClick={this.unarchiveClick} />}
						{optionFunctions.showArchiveButton(messageStatus) && <SecondaryButton name={content.archive} onClick={this.archiveClick} />}
						{optionFunctions.showReplyButton(messageStatus) && this.getReplyButton(messageDetail)}
					</div>
					{this.state.showDeleteConfirmModal && this.returnModalComponent()}
					{this.state.showDeleteSuccessModal &&
						this.props.messages.successModal &&
						this.returnDeleteSuccessModalComponent()}
					{this.props.messages.draftError &&
						this.state.showSendServiceErrorModal &&
						this.returnErrorModal()}
					{messageDetail.threadID !== null &&
						this.getThreads(this.props.messages.messages, messageDetail)}
				</div>
			</div>
		);


	}
}

const mapState = state => ({
	readOnly: state.messages.mode === READ_ONLY,
	noReply: state.viewMessage.messageDetail.noReply,
	messages: state.messages,
	messageDetail: state.viewMessage.messageDetail,
	hasAttachment: state.viewMessage.messageDetail.document && state.viewMessage.messageDetail.document.id !== undefined, 
});

export default compose(
	connect(mapState),
	utils.withNativeBridge(window)
)(ViewMessage);
