import React from "react";
import { compose } from "redux";
import { utils } from "document-management-web-ui";

import StepHeader from "./common/StepHeader";
import SecureMessageSummary from "./common/SecureMessageSummary";
import TextArea from "./common/TextAreaComponent";
import Threads from "./common/ThreadList";
import _ from "lodash";
import { connect } from "react-redux";
import {
	setViewMessageDetail,
	updateMessageData,
	popupState
} from "../actions/AppActions";
import { getThreadsBL } from "../bl/SecureMessageBL";
import {
	getMessageType,
} from "../utils/SecureMessageUtils";
import { Link } from "react-router-dom";
import GetIcon from "./common/GetIcon";
import ModalComponent from "./common/ModalComponent";
import { READ, PENDING, SENT, DELETED, READ_ONLY } from '../constants/StringsConstants';

const Attachments = ({ session }) => (
	<div className="c-message--attachments">
		<h4>Attachments</h4>
		<ul>
			<li>
				<Link
					to={{ pathname: `/my-documents/${session.brand}` }}
				>
					New documents available
				</Link>
			</li>
		</ul>
	</div>
);

export class ViewMessage extends React.Component {
	constructor(props) {
		super(props);
		this.getReplyButton = this.getReplyButton.bind(this);
		this.getDeleteButton = this.getDeleteButton.bind(this);
		this.state = {
			showDeleteConfirmModal: false,
			showDeleteSuccessModal: false,
			showSendServiceErrorModal: false,
		};
		this.closeModal = this.closeModal.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
		this.deleteClick = this.deleteClick.bind(this);
		this.returnDeleteSuccessModalComponent = this.returnDeleteSuccessModalComponent.bind(
			this
		);
		this.returnModalComponent = this.returnModalComponent.bind(this);
		this.closeSuccessModal = this.closeSuccessModal.bind(this);
		this.errorCloseClicked = this.errorCloseClicked.bind(this);
		this.retryServiceCall = this.retryServiceCall.bind(this);
	}

	componentDidMount() {
		const { messageDetail } = this.props.location;
		const { isWebView, setMessagesMetaData, messages, readOnly } = this.props;

		messageDetail &&
			this.props.dispatch(
				setViewMessageDetail(this.props.location.messageDetail)
			); // to set current viewing message
		// Below is to update New message to Read message status.
		if (messageDetail && this.props.location.messageDetail.status === 'NEW') {
			if (!readOnly) {
				this.props.dispatch(
					updateMessageData(
						this.props.location.messageDetail,
						this.props.location.messageDetail.id,
						'READ'
					)
				);
			}
			if (isWebView) {
				const unreadMessageCount = messages.messages.filter(message => message.status === "NEW").length
				setMessagesMetaData({ unread: unreadMessageCount - 1 });
			}
		}
		this.props.dispatch(popupState());
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
					to={{ pathname: `/securemessages/reply`, backPath: `/securemessages/view`, messageDetail: message }}
					className="c-btn c-btn--primary"
				>
				{this.props.content.replyMessageTitle}
	</Link>
			);
		};
	};

	getDeleteButton = message => (
		<button className="c-btn c-btn--secondary" onClick={this.handleDelete}>
			{this.props.content.delete}
	  	 </button>
	);
	handleDelete(data) {
		this.setState({ showDeleteConfirmModal: true });
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

		const { hasAttachment, readOnly, session } = this.props;

		return (
			<div className="row centralised-container c-card">
				<div className="col-md1-24 col-sm1-24 col-lg1-24">
					<StepHeader
						showheaderCrumbs
						headerCrumbsPath={{
							pathname: `/securemessages`,
						}}
						headerCrumbsMessage="Back"
						headerTitle={
							getMessageType(messageDetail.status) == SENT
								? this.props.content.sentPageTitle
								: this.props.content.inboxPageTitle
						}
					/>

					<SecureMessageSummary
						message={messageDetail}
						viewMessageFlag
						readFlag={messageDetail.status === READ}
						sentFlag={getMessageType(messageDetail.status) === SENT}
						content={this.props.content}
					/>
					<pre>{messageDetail.message}</pre>
					{ hasAttachment && <Attachments session={session} /> }
					<div className="c-btn--group">
						{this.getBackButton()}
						{messageDetail.status !== PENDING && !readOnly && this.getDeleteButton(messageDetail)}
						{!readOnly && this.getReplyButton(messageDetail)}
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
	messages: state.messages,
	messageDetail: state.viewMessage.messageDetail,
	hasAttachment: state.viewMessage.messageDetail.subject === "DOCUMENT"
});

export default compose(
	connect(mapState),
	utils.withNativeBridge(window.navigator.userAgent)
)(ViewMessage);
