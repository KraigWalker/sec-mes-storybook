import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import StepHeader from './common/StepHeader';
import TextAreaComponent from './common/TextAreaComponent';
import DropDownComponent from './common/DropDownComponent';
import RegexUtils from '../utils/RegexUtils';
import SendMessageRequestEntity from '../entities/SendMessageRequestEntity';
import {
	replyMessageData,
	sendMessageForAccessibiltiy,
	popupState,
	updateMessageData,
	getCustomerName
} from '../actions/AppActions';
import { getThreadsBL, getAccountName } from '../bl/SecureMessageBL';
import Threads from './common/ThreadList';
import ModalComponent from './common/ModalComponent';
import GetIcon from './common/GetIcon';
import CalloutComponent from './common/CalloutComponent';
import StringsConstants from '../constants/StringsConstants';

const messageEntity = new SendMessageRequestEntity();

export class ReplySecureMessage extends React.Component {
	constructor(props) {
		super(props);
		this.textChange = this.textChange.bind(this);
		this.selectSubject = this.selectSubject.bind(this);
		this.sendData = this.sendData.bind(this);
		this.getThreads = this.getThreads.bind(this);
		this.returnSentMessageModal = this.returnSentMessageModal.bind(this);
		this.returnModalComponent = this.returnModalComponent.bind(this);
		this.leavePage = this.leavePage.bind(this);
		this.stayOnPage = this.stayOnPage.bind(this);
		this.sentOkClicked = this.sentOkClicked.bind(this);
		this.returnDraftModal = this.returnDraftModal.bind(this);
		this.draftOkClicked = this.draftOkClicked.bind(this);
		this.saveDraftData = this.saveDraftData.bind(this);
		this.errorCloseClicked = this.errorCloseClicked.bind(this);
		this.retryServiceCall = this.retryServiceCall.bind(this);
		this.callBackModal = this.callBackModal.bind(this);
		this.state = {
			chars_left: 3000,
			showPopup: false,
			showSentMessageModal: false,
			showDraftSuccessModal: false,
			showSaveServiceErrorModal: false,
			showSendServiceErrorModal: false,
			disabled: true,
			charError: false,
			showModalBack: false,
		};
	}

	componentWillMount() {
		// If account service responding late then what to do...
		const { account, subject } = this.props.location.messageDetail;
		const accName = getAccountName(account.accountId, this.props.accounts);
		if ((account.accountId !== undefined || null) && subject) {
			account.name = accName.display_name || accName.name;
			messageEntity.setName(account.name);
			messageEntity.setAccountId(account.accountId);
			messageEntity.setAccountNumber(account.number);
			messageEntity.setUpdateSubject(subject);
		}
		if (account.accountId === undefined || null) {
			messageEntity.setAccount(account);
			messageEntity.setUpdateSubject(subject);
		}
	}
	componentDidMount() {
		const { dispatch, customerID } = this.props;
		const { messageDetail } = this.props.location;
		// Below is to update New message to Read message status.
		if (messageDetail && messageDetail.status === StringsConstants.NEW) {
			dispatch(
				updateMessageData(
					messageDetail,
					messageDetail.id,
					StringsConstants.READ
				)
			);
		}
		dispatch(getCustomerName(customerID));
		dispatch(popupState());
		window.scrollTo(0, 0);
	}
	componentWillUnmount() {
		window.top.postMessage('clearNewMessagePage', '*');
		window.scrollTo(0, 0);
	}
	getThreads(messages, currentMessage) {
		const threads = getThreadsBL(messages, currentMessage);
		return (
			<Threads
				Threads={threads}
				currentMessage={currentMessage}
				isFromReplyMessage
				content={this.props.content}
			/>
		);
	}
	selectSubject(value, id, data) {
		switch (id) {
			case 'accounts':
				messageEntity.setAccount(data);
				break;
			case 'subjects':
				messageEntity.setSubject(data);
				break;
			default:
		}
	}
	textChange(e) {
		if (e === '') {
			this.setState({ disabled: true });
			window.top.postMessage('clearNewMessagePage', '*');
		} else {
			this.setState({ disabled: false });
			window.top.postMessage('newMessagePage', '*');
		}
		this.setState({ chars_left: 3000 - e.length });
		const extractedString = RegexUtils.matchString(e);
		if (extractedString !== null) {
			const lastFour = RegexUtils.getLastFourDigits(extractedString);
			messageEntity.setMessage(
				e.replace(new RegExp(extractedString, 'g'), `************${lastFour}`)
			);
		} else messageEntity.setMessage(e);
		if (this.state.chars_left >= 0) {
			this.setState({ charError: false });
		}
		this.setState({
			showModalBack: true,
		});
	}
	sendData() {
		const { dispatch, location, customerDetails } = this.props;
		this.setState({ charError: true });
		this.renderRemainingChar();
		if (this.state.chars_left >= 0) {
			dispatch(
				replyMessageData(
					messageEntity.getMessageRequestData(),
					location.messageDetail,
					StringsConstants.PENDING,
					customerDetails.personal_details.name
				)
			);
			this.setState({ showSentMessageModal: true });
			this.setState({ showSendServiceErrorModal: true });
		}
	}
	returnSentMessageModal() {
		const { content } = this.props;
		window.top.postMessage('clearNewMessagePage', '*');
		const bodyContent = (
			<div>
				<div>
					<GetIcon id="icon-success" width="68px" height="68px" />
				</div>
				{content.messageSent}
			</div>
		);
		const footerButtons = (
			<Link
				to={`${window.baseURl}/securemessages`}
				onClick={this.sentOkClicked}
				className="c-btn c-btn--default c-btn--sm c-modal__button"
			>
				{content.ok}
			</Link>
		);
		return (
			<ModalComponent
				show
				bsSize="sm"
				customClass="c-modal c-modal--center"
				modalheading=""
				modalbody={bodyContent}
				modalfooter={footerButtons}
				modalInContainer={false}
				closeButton={false}
			/>
		);
	}
	sentOkClicked() {
		this.setState({ showSentMessageModal: false });
	}
	returnDraftModal() {
		const { content } = this.props;
		window.top.postMessage('clearNewMessagePage', '*');
		const bodyContent = (
			<div>
				<div>
					<GetIcon id="icon-success" width="68px" height="68px" />
				</div>
				{content.draftBody}
			</div>
		);
		const footerButtons = (
			<Link
				to={`${window.baseURl}/securemessages`}
				onClick={this.draftOkClicked}
				className="c-btn c-btn--default c-btn--sm c-modal__button"
			>
				{content.ok}
			</Link>
		);
		return (
			<ModalComponent
				show
				bsSize="sm"
				customClass="c-modal c-modal--center"
				modalheading=""
				modalbody={bodyContent}
				modalfooter={footerButtons}
				modalInContainer={false}
				closeButton={false}
			/>
		);
	}
	saveDraftData() {
		const { dispatch, location, customerDetails } = this.props;
		dispatch(
			replyMessageData(
				messageEntity.getMessageRequestData(),
				location.messageDetail,
				StringsConstants.DRAFT,
				customerDetails.personal_details.name || {}
			)
		);
		this.setState({ showPopup: false });
		this.setState({ showDraftSuccessModal: true });
		this.setState({ showSaveServiceErrorModal: true });
	}
	draftOkClicked() {
		this.setState({ showDraftSuccessModal: false });
	}
	checkAccountValue() {
		const { content, location } = this.props;
		let accVal;
		if (location.messageDetail.account.number === undefined || null) {
			accVal = content.noSpecificAccount;
		} else {
			accVal = location.messageDetail.account.name;
		}
		return accVal;
	}
	errorCloseClicked() {
		const { dispatch, customerNameError } = this.props;
		if (customerNameError) {
			dispatch(popupState());
		}
		this.setState({ showSaveServiceErrorModal: false });
		this.setState({ showSendServiceErrorModal: false });
	}
	retryServiceCall() {
		const { showSaveServiceErrorModal, showSendServiceErrorModal } = this.state;
		this.props.dispatch(popupState());
		if (showSaveServiceErrorModal) {
			this.saveDraftData();
		}
		if (showSendServiceErrorModal) {
			this.sendData();
		}
	}
	leavePage() {
		this.setState({ showPopup: true });
	}
	stayOnPage() {
		this.setState({ showPopup: false });
	}
	callBackModal() {
		this.setState({
			showPopup: true,
		});
	}
	returnModalComponent() {
		const { content } = this.props;
		if (this.state.showPopup) {
			const bodyContent = (
				<div className="callout callout__error">
					{content.leaveMessageBody}
				</div>
			);
			const footerButtons = (
				<div>
					<Link to={`${window.baseURl}/securemessages`}>
						<button
							type="button"
							onClick={this.leavePage}
							className="c-btn c-btn--secondary c-modal__button"
						>
							{content.leavePage}
						</button>
					</Link>&nbsp;
					<button
						type="button"
						className="c-btn c-btn--secondary c-modal__button"
						onClick={this.saveDraftData}
						disabled={this.state.disabled}
					>
						{content.saveDraft}
					</button>
					<button
						type="button"
						onClick={this.stayOnPage}
						className="c-btn c-btn--default c-modal__button"
					>
						{content.returnToMessage}
					</button>
				</div>
			);
			return (
				<ModalComponent
					show
					onHide={this.stayOnPage}
					customClass="c-modal"
					modalheading={content.leaveMessageHeading}
					modalbody={bodyContent}
					modalfooter={footerButtons}
					modalInContainer={false}
					closeButton
				/>
			);
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
	returnBackButton(backpath) {
		const { content } = this.props;
		const { showModalBack, disabled } = this.state;
		if (showModalBack && disabled === false) {
			return (
				<div className="row">
					<div className="col-md1-18">
						<p className="c-step-header__crumbs">
							<a
								onClick={this.callBackModal}
								className="c-step-header__link u-cursor-pointer"
							>
								<span className="c-step-header__linkicon">
									<GetIcon id="icon-left" width="16px" height="16px" />
								</span>
								<span className="c-step-header__linktext">
									{content.back}
								</span>
							</a>
						</p>
						<h1 className="c-step-header__title" id="headingTag" tabIndex="-1">
							{content.replyMessageTitle}
						</h1>
					</div>
				</div>
			);
		}
		return (
			<div className="row">
				<div className="col-md1-18">
					<StepHeader
						showheaderCrumbs
						onClick={() => { }}
						headerCrumbsMessage="Back"
						headerTitle="Reply"
						headerCrumbsPath={{ pathname: backpath }}
					/>
				</div>
			</div>
		);
	}
	renderRemainingChar() {
		const { chars_left, charError } = this.state;
		const { dispatch, content } = this.props;
		if (chars_left < 0 && charError === true) {
			return (
				<div>
					<p className="char__error error__right">
						{chars_left} {content.charLeft}
					</p>
					<CalloutComponent
						dClass="callout callout__error callout__inline-error-textarea"
						paraText={content.messageVal}
					/>
				</div>
			);
		}
		if (chars_left <= 300) {
			chars_left === 3 &&
				dispatch(
					sendMessageForAccessibiltiy(content.threeCharLeft)
				);
			chars_left === 1 &&
				dispatch(sendMessageForAccessibiltiy(content.oneCharLeft));
			chars_left === 0 &&
				dispatch(
					sendMessageForAccessibiltiy(content.maxCharLimit)
				);
			let headerflagClass = 'error__right';
			if (chars_left <= 0) {
				headerflagClass = 'char__error error__right';
			}
			return (
				<p className={`${headerflagClass}`}>
					{chars_left} {content.charLeft}
				</p>
			);
		}
	}
	render() {
		const { content, messages, location } = this.props;
		const { showSendServiceErrorModal, showSaveServiceErrorModal, showDraftSuccessModal, showSentMessageModal, showPopup, disabled } = this.state;
		const { messageDetail } = location.messageDetail
			? location
			: this.props;
		return (
			<div className="row centralised-container c-card">
				<div className="col-md1-24 col-sm1-24 col-lg1-24">
					{this.returnBackButton(location)}
					<div className="c-field">
						<label
							id="subjectTitle"
							className="c-field__label c-field__label--block"
							htmlFor="subjects"
						>
							{content.subject}
						</label>
						<div className="c-field__controls u-position-relative">
							<DropDownComponent
								accessID="Subject"
								subjects={messageDetail.subject}
								name="subjects"
								id="subjects"
								selectSubject={this.selectSubject}
								isFromDraftOrReply
								selectedValue={messageDetail.subject}
								content={content}
								isFromReply
							/>
						</div>
					</div>

					<div className="c-field">
						<label
							id="relatesTitle"
							className="c-field__label c-field__label--block"
							htmlFor="subjects"
						>
							{content.messageRelatesTo}
						</label>
						<div className="c-field__controls u-position-relative">
							<DropDownComponent
								accessID="Message relates to"
								accounts={messageDetail.account.number}
								selectSubject={this.selectSubject}
								name="accounts"
								id="accounts"
								isFromDraftOrReply
								selectedValue={this.checkAccountValue()}
								content={content}
								isFromReply
							/>
						</div>
					</div>

					<div className="c-field">
						<label
							id="messageTitle"
							className="c-field__label c-field__label--block"
							htmlFor="subjects"
						>
							{content.message}
						</label>
						<div className="c-field__controls">
							<div className="u-visually-hidden off-screen" id="textAreaMaxMsg">
								{content.maxCharLimit}
							</div>
							<TextAreaComponent
								textData={this.textChange}
								ariaId="textAreaMaxMsg"
								id="message"
								accessID="messageTitle"
							/>
						</div>
						{this.renderRemainingChar()}
					</div>
					<div className="c-btn--group">
						{!disabled ? (
							<button
								name="Back"
								className="c-btn c-btn--secondary"
								onClick={this.callBackModal}
							>
								{content.back}
							</button>
						) : (
								<Link
									to={`${window.baseURl}/securemessages`}
									className="c-btn c-btn--secondary"
								>
									{content.back}{' '}
								</Link>
							)}
						<button
							name="Save Draft"
							className="c-btn c-btn--secondary"
							onClick={this.saveDraftData}
							disabled={this.state.disabled}
						>
							{content.saveDraft}
						</button>
						<button
							name="Send"
							className="c-btn c-btn--default"
							onClick={this.sendData}
							disabled={this.state.disabled}
						>
							{content.send}
						</button>
					</div>
					{showPopup && this.returnModalComponent()}
					{showSentMessageModal && messages.successModal
						? this.returnSentMessageModal()
						: ''}
					{showDraftSuccessModal &&
						messages.successModal &&
						this.returnDraftModal()}
					{messages.newMessageError &&
						showSaveServiceErrorModal &&
						this.returnErrorModal()}
					{messages.newMessageError &&
						showSendServiceErrorModal &&
						this.returnErrorModal()}
					{this.getThreads(messages.messages, messageDetail)}
				</div>
			</div>
		);
	}
}
const mapState = state => ({
	subjects: state.subjects,
	messages: state.messages,
	accounts: state.accounts,
	messageDetail: state.viewMessage.messageDetail,
	customerID: state.segmentData.segmentData.customers[0].id,
	customerDetails: state.customerDetails.customerDetails,
	customerNameError: state.customerDetails.error,
});
export default connect(mapState)(ReplySecureMessage);
