import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
	sendMessageData,
	sendMessageForAccessibiltiy,
	popupState,
	getCustomerName,
} from '../actions/AppActions';
import DropDownComponent from './common/DropDownComponent';
import TextAreaComponent from './common/TextAreaComponent';
import StepHeader from './common/StepHeader';
import SendMessageRequestEntity from '../entities/SendMessageRequestEntity';
import ModalComponent from './common/ModalComponent';
import GetIcon from './common/GetIcon';
import RegexUtils from '../utils/RegexUtils';
import CalloutComponent from './common/CalloutComponent';
import StringsConstants from '../constants/StringsConstants';


const messageEntity = new SendMessageRequestEntity();
export class NewSecureMessage extends React.Component {
	constructor(props) {
		super(props);
		this.selectSubject = this.selectSubject.bind(this);
		this.sendData = this.sendData.bind(this);
		this.textChange = this.textChange.bind(this);
		this.renderRemainingChar = this.renderRemainingChar.bind(this);
		this.leavePage = this.leavePage.bind(this);
		this.stayOnPage = this.stayOnPage.bind(this);
		this.returnModalComponent = this.returnModalComponent.bind(this);
		this.saveDraftData = this.saveDraftData.bind(this);
		this.draftOkClicked = this.draftOkClicked.bind(this);
		this.returnDraftModal = this.returnDraftModal.bind(this);
		this.returnSentMessageModal = this.returnSentMessageModal.bind(this);
		this.sentOkClicked = this.sentOkClicked.bind(this);
		this.errorCloseClicked = this.errorCloseClicked.bind(this);
		this.retryServiceCall = this.retryServiceCall.bind(this);
		this.callBackModal = this.callBackModal.bind(this);
		this.retryCustomerCall = this.retryCustomerCall.bind(this);
		this.customerErrorModal = this.customerErrorModal.bind(this);
		this.state = {
			chars_left: 3000,
			showPopup: false,
			showDraftSuccessModal: false,
			showSentMessageModal: false,
			disabled: true,
			validationSubjectMsg: false,
			validationAccountMsg: false,
			selectAccount: false,
			selectSubject: false,
			charError: false,
			showSaveServiceErrorModal: false,
			showSendServiceErrorModal: false,
			showModalBack: false,
		};
	}
	componentWillMount() { }
	componentDidMount() {
		this.props.dispatch(popupState());
		this.props.dispatch(getCustomerName(this.props.customerID));
		window.scrollTo(0, 0);
	}
	componentWillUnmount() {
		window.top.postMessage('clearNewMessagePage', '*');
		window.scrollTo(0, 0);
	}
	selectSubject(value, id, data) {
		switch (id) {
			case 'accounts':
				messageEntity.setAccount(data);
				this.setState({
					selectAccount: true,
					validationAccountMsg: false,
				});
				break;
			case 'subjects':
				messageEntity.setSubject(data);
				this.setState({
					selectSubject: true,
					validationSubjectMsg: false,
				});
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
	checkValidation() {
		const { selectAccount, selectSubject } = this.state;
		if (selectAccount) {
			this.setState({
				validationAccountMsg: false,
			});
		} else {
			document.getElementById('ddlAccount').focus();
			this.setState({
				validationAccountMsg: true,
			});
		}

		if (selectSubject) {
			this.setState({
				validationSubjectMsg: false,
			});
		} else {
			document.getElementById('ddlSubject').focus();
			this.setState({
				validationSubjectMsg: true,
			});
		}

		if (selectSubject && selectAccount) {
			return true;
		}
		return false;
	}
	sendData() {
		const { dispatch, customerDetails } = this.props;
		this.setState({ charError: true });
		this.renderRemainingChar();
		if (this.checkValidation() && this.state.chars_left >= 0) {
			dispatch(
				sendMessageData(
					messageEntity.getMessageRequestData(),
					StringsConstants.PENDING,
					customerDetails.personal_details.name
				)
			);
			this.setState({ showSentMessageModal: true });
			this.setState({ showSendServiceErrorModal: true });
		}
	}

	leavePage() {
		this.setState({ showPopup: true });
	}
	stayOnPage() {
		this.setState({ showPopup: false });
	}
	callBackModal() {
		this.setState({ showPopup: true });
	}
	returnModalComponent() {
		const { showPopup, disabled } = this.state;
		const { content } = this.props;
		if (showPopup) {
			const bodyContent = (
				<div className="callout callout__error">
					{content.leaveMessageBody}
				</div>
			);
			const footerButtons = (
				<div>
					<Link
						to={`${window.baseURl}/securemessages`}
						onClick={this.leavePage}
						className="c-btn c-btn--secondary c-modal__button"
					>
						{content.leavePage}
					</Link>
					<button
						type="button"
						className="c-btn c-btn--secondary c-modal__button"
						onClick={this.saveDraftData}
						disabled={disabled}
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
			<div>
				<Link
					to={`${window.baseURl}/securemessages`}
					onClick={this.draftOkClicked}
					className="c-btn c-btn--default c-btn--sm c-modal__button"
				>
					{content.ok}
				</Link>
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
	draftOkClicked() {
		this.setState({ showDraftSuccessModal: false });
	}

	saveDraftData() {
		const { dispatch, customerDetails } = this.props;
		if (this.checkValidation() && this.state.chars_left >= 0) {
			dispatch(
				sendMessageData(
					messageEntity.getMessageRequestData(),
					StringsConstants.DRAFT,
					customerDetails.personal_details.name
				)
			);
			this.setState({ showDraftSuccessModal: true });
			this.setState({ showPopup: false });
			this.setState({ showSaveServiceErrorModal: true });
		}
	}
	sentOkClicked() {
		this.setState({ showSentMessageModal: false });
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
			<div>
				<Link
					to={`${window.baseURl}/securemessages`}
					onClick={this.sentOkClicked}
					className="c-btn c-btn--default c-btn--sm c-modal__button"
				>
					{content.ok}
				</Link>
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
	retryCustomerCall() {
		const { dispatch, customerID } = this.props;
		dispatch(getCustomerName(customerID));
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
	customerErrorModal() {
		const { sorryHeader, tryAgain, getInTouch, back, retry } = this.props.content;
		const bodyContent = (
			<div>
				<h3>{sorryHeader}</h3>
				<br />
				<p>{tryAgain}</p>
				<br />
				<p>{getInTouch}</p>
			</div>
		);
		const footerButtons = (
			<div>
				<Link
					to={`${window.baseURl}/securemessages`}
					onClick={this.errorCloseClicked}
					className="c-btn c-btn--default c-btn--sm c-modal__button"
				>
					{back}
				</Link>
				<button
					type="button"
					onClick={this.retryCustomerCall}
					className="c-btn c-btn--default c-modal__button"
				>
					{retry}
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
	returnBackButton() {
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
							{content.newMessagePageTitle}
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
						headerCrumbsMessage={content.back}
						headerTitle={content.newSecureMessage}
						headerCrumbsPath={{ pathname: `${window.baseURl}/securemessage` }}
					/>
				</div>
			</div>
		);
	}
	renderRemainingChar() {
		const { chars_left, charError } = this.state;
		const { dispatch, content } = this.props;
		if (chars_left < 0 && charError) {
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
					sendMessageForAccessibiltiy(content.maxCharLeft)
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
		const { content, subjects, accounts, messages, customerNameError } = this.props;
		const { validationSubjectMsg, validationAccountMsg, showPopup, showDraftSuccessModal, showSentMessageModal, showSaveServiceErrorModal, disabled, showSendServiceErrorModal } = this.state;
		return (
			<div className="row centralised-container">
				<div className="col-md1-24 col-sm1-24 col-lg1-24">
					{this.returnBackButton()}
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
								subjects={subjects}
								content={content}
								selectSubject={this.selectSubject}
								showSubjectError={validationSubjectMsg}
								id="subjects"
								isFromDraft={false}
								selectedValue={content.pleaseSelect}
								ddId="ddlSubject"
							/>
						</div>
					</div>

					<div className="c-field">
						<label
							id="relatesTitle"
							className="c-field__label c-field__label--block"
							htmlFor="accounts"
						>
							{content.messageRelatesTo}
						</label>
						<div className="c-field__controls u-position-relative">
							<DropDownComponent
								accessID="Message relates to"
								accounts={accounts}
								content={content}
								selectSubject={this.selectSubject}
								showAccountError={validationAccountMsg}
								id="accounts"
								isFromDraft={false}
								selectedValue={content.pleaseSelect}
								ddId="ddlAccount"
							/>
						</div>
					</div>

					<div className="c-field">
						<label
							id="messageTitle"
							className="c-field__label c-field__label--block"
							htmlFor="message"
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
								accessID="messageTitle"
								id="message"
							/>
						</div>
						{this.renderRemainingChar()}
					</div>

					{showPopup && this.returnModalComponent()}
					{showDraftSuccessModal &&
						messages.successModal &&
						this.returnDraftModal()}
					{showSentMessageModal &&
						messages.successModal &&
						this.returnSentMessageModal()}
					{messages.newMessageError &&
						showSaveServiceErrorModal &&
						this.returnErrorModal()}
					{messages.newMessageError &&
						showSendServiceErrorModal &&
						this.returnErrorModal()}
					{customerNameError && this.customerErrorModal()}
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
									{content.back}
								</Link>
							)}
						<button
							name="Save Draft"
							className="c-btn c-btn--secondary"
							onClick={this.saveDraftData}
							disabled={disabled}
						>
							{content.saveDraft}
						</button>
						<button
							name="Send"
							className="c-btn c-btn--default"
							onClick={this.sendData}
							disabled={disabled}
						>
							{content.send}
						</button>
					</div>
				</div>
			</div>
		);
	}
}
/**
 * Maps the state of the component to the state of the redux store
 * @param {object} state. State of the application
 */
const mapState = state => ({
	subjects: state.subjects,
	messages: state.messages,
	accounts: state.accounts,
	customerID: state.segmentData.segmentData.customers[0].id,
	customerDetails: state.customerDetails.customerDetails,
	customerNameError: state.customerDetails.error,
});
export default connect(mapState)(NewSecureMessage);
