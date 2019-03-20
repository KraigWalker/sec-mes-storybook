import React from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import GetIcon from './GetIcon';
import MessageEntity from '../../entities/MessageEntity';
import ModalComponent from '../common/ModalComponent';
import { updateMessageData, popupState, delMessageData, closeDelModal, archiveMessageData, unarchiveMessageData } from '../../actions/AppActions';
import { NEW, READ, DRAFT, PENDING, SENT, DELETED, ARCHIVED } from '../../constants/StringsConstants';
import StringConstants from '../../constants/StringsConstants';
import {DELETE_MODAL, ARCHIVE_MODAL, UNARCHIVE_MODAL} from "../../constants/ModalConstants";
import SecureMessageSummaryButtons from './SecureMessageSummaryButtons';


export class SecureMessageSummary extends React.Component {
	constructor(props) {
		super(props);
		this.handleDelete = this.handleDelete.bind(this);
		this.state = {
			showDeleteConfirmModal: false,
			showSendServiceErrorModal: false,
		};
		this.returnModalComponent = this.returnModalComponent.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.deleteClick = this.deleteClick.bind(this);
		this.archiveClick = this.archiveClick.bind(this);
		this.unarchiveClick = this.unarchiveClick.bind(this);
		this.returnSuccessModalComponent = this.returnSuccessModalComponent.bind(this);
		this.getModalMessage = this.getModalMessage.bind(this);
		this.closeSuccessModal = this.closeSuccessModal.bind(this);
		this.errorCloseClicked = this.errorCloseClicked.bind(this);
		this.retryServiceCall = this.retryServiceCall.bind(this);
	}
	componentDidMount() {
		this.props.dispatch(popupState());
	}
	getSummaryIcon = () => {
		const { message, threadFlag } = this.props;
		if (!threadFlag) {
			const iconId =
				message.status === READ ? 'icon-message-open' : 'icon-envelope';
			return (
				<span className="c-message__icon">
					<GetIcon id={iconId} width="24px" height="24px" />
				</span>
			);
		}
	};

	hasOnClick = () => {
		const { message, threadFlag, content } = this.props;
		const path =
			message.status === DRAFT
				? `/securemessages/draft`
				: `/securemessages/view`;
		let messageTitle = '';
		if (message.status === 'NEW') {
			messageTitle = `${content.unread} ${message.getSubject()}`;
		} else {
			messageTitle = message.getSubject();
		}
		if (!threadFlag) {
			if (message.status === READ) {
				return (
					<Link
						to={{ pathname: path, messageDetail: message }}
						className="c-message__summary__head__title__subject__link"
					>
						{message.getSubject()}
					</Link>
				);
			}
			return (
				<Link
					aria-label={`${messageTitle}`}
					to={{ pathname: path, messageDetail: message }}
					className="c-message__summary__head__title__subject__link"
				>
					{message.getSubject()}
				</Link>
			);
		}
		return message.getSubject();
	};
	handleDelete() {
		this.setState({ showDeleteConfirmModal: true });
	}
	errorCloseClicked() {
		this.props.dispatch(popupState());
		this.setState({ showSendServiceErrorModal: false });
	}
	retryServiceCall() {
		this.props.dispatch(popupState());
		this.deleteClick();
	}
	closeModal() {
		setTimeout(() => {
			document.getElementById('headingTag').focus();
		}, 20);
		this.setState({ showDeleteConfirmModal: false });
	}
	deleteClick() {
		const { message, dispatch } = this.props;
		if (message.status === NEW) {
			dispatch(updateMessageData(message, message.id, READ));
			setTimeout(() => {
				dispatch(
					delMessageData(message, message.id, DELETED)
				);
			}, 500);
		} else dispatch(delMessageData(message, message.id, DELETED));
		this.setState({
			showDeleteConfirmModal: false,
			showSendServiceErrorModal: true,
		});
	}

	archiveClick() {
		const { message, dispatch } = this.props;
		dispatch(archiveMessageData(message, message.id, ARCHIVED));
	}

	unarchiveClick() {
		const { message, dispatch } = this.props;
		dispatch(unarchiveMessageData(message, message.id, READ));
	}

	closeSuccessModal() {
		this.props.dispatch(closeDelModal());
	}

	returnSuccessModalComponent(modalType, content) {

		const {viewMessageFlag } = this.props;
		const bodyContent = (
			<div>
				<div>
					<GetIcon id="icon-success" width="68px" height="68px" />
				</div>{this.getModalMessage(modalType, content)}
			</div>
		);
		const footerButtons = viewMessageFlag ? (
			<div>
				<Link
					to={`/securemessages`}
					onClick={this.closeSuccessModal}
					className="c-btn c-btn--primary c-btn--sm c-modal__button"
				>
					{content.ok}
				</Link>
			</div>
		) : (
				<div>
					<button
						type="button"
						onClick={this.closeSuccessModal}
						className="c-btn c-btn--primary c-btn--sm c-modal__button"
					>
						{content.ok}
					</button>
				</div>
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

	getModalMessage(modalType, content) {
		switch(modalType)
		{
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
	render() {
		const { message, listFlag, threadFlag, content, viewMessageFlag, messageDetail, messages } = this.props;
		const { showSendServiceErrorModal, showDeleteConfirmModal } = this.state;
		const messageClass = cx({
			'c-message': true,
			'c-message--stacked': listFlag,
			'c-message--read': message.status === READ,
			'u-position-relative': !threadFlag,
			'c-message--noborder': threadFlag,
		});
		const summaryClass = cx({
			'c-message__summary': true,
			'c-message__summary--no-icon':
			message.status === DRAFT ||
			message.status === SENT ||
			message.status === PENDING,
		});
		const titleClass = cx({
			'c-message__summary__head__title': true,
			'c-message__summary__head__title--draft': message.status === DRAFT,
		});
		const subjectClass = cx({
			'c-message__summary__head__title__subject': true,
			'c-message__summary__head__title__subject--read': message.status !== NEW,
		});

		const accNo = message.account.number
			? message.account.number
			: content.noSpecificAccount;

		return (
			<div className={messageClass}>
				{(message.status === READ || message.status === NEW) &&
					this.getSummaryIcon()}
				<div className={summaryClass}>
					<div className="c-message__summary__head">
						<div className={titleClass}>
							<h2 id="subjectMsg" className={subjectClass}>
								{this.hasOnClick()}
							</h2>
							<p className="c-message__summary__head__title__ref">
								{message.getReference()}
							</p>
						</div>
						<SecureMessageSummaryButtons 
							{...this.props} 
							onArchiveClick={this.archiveClick}
							onUnarchiveClick={this.unarchiveClick}
							onDeleteClick={this.deleteClick}/>					
					</div>
					{!viewMessageFlag && (
						<p className="c-message__summary__account">
							{message.getMessageBody()}
						</p>
					)}
					{viewMessageFlag && (
						<p className="c-message__summary__account">Account : {accNo}</p>
					)}
					<p className="c-message__summary__date">{message.getDateCreated()}</p>
				</div>
				{showDeleteConfirmModal && this.returnModalComponent()}
				{messageDetail.modalType > 0 && this.returnSuccessModalComponent(messageDetail.modalType, content)}
				
				{messages.draftError && showSendServiceErrorModal && this.returnErrorModal()}
			</div>
		);
	}
}

SecureMessageSummary.propTypes = {
	listFlag: PropTypes.bool,
	draftFlag: PropTypes.bool,
	readFlag: PropTypes.bool,
	hasOnClick: PropTypes.bool,
	threadFlag: PropTypes.bool,
	sentFlag: PropTypes.bool,
	message: PropTypes.instanceOf(MessageEntity),
};
SecureMessageSummary.defaultProps = {
	listFlag: false,
	draftFlag: false,
	readFlag: false,
	hasOnClick: false,
	threadFlag: false,
	sentFlag: false,
};
/**
 * Maps the state of the component to the state of the redux store
 * @param {object} state. State of the application
 */
const mapState = state => ({
	messages: state.messages,
	messagesubjects: state.subjects,
	messageaccounts: state.accounts,
	messageDetail: state.viewMessage,
	readOnly: state.messages.mode === StringConstants.READ_ONLY
});
export default connect(mapState)(SecureMessageSummary);
