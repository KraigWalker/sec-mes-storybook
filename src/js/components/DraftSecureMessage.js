import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateMessageData, sendMessageForAccessibiltiy, popupState } from '../actions/AppActions';
import DropDownComponent from './common/DropDownComponent';
import TextAreaComponent from './common/TextAreaComponent';
import StepHeader from './common/StepHeader';
import SendMessageRequestEntity from '../entities/SendMessageRequestEntity';
import ModalComponent from './common/ModalComponent';
import GetIcon from './common/GetIcon';
import RegexUtils from '../utils/RegexUtils';
import { getAccountName } from '../bl/SecureMessageBL';
import CalloutComponent from './common/CalloutComponent';
import StringsConstants from '../constants/StringsConstants';

const messageEntity = new SendMessageRequestEntity();
export class DraftSecureMessage extends React.Component {
	constructor(props) {
		super(props);
		this.renderRemainingChar = this.renderRemainingChar.bind(this);
		this.selectSubject = this.selectSubject.bind(this);
		this.textChange = this.textChange.bind(this);
		this.sendData = this.sendData.bind(this);
		this.returnModalComponent = this.returnModalComponent.bind(this);
		this.sentOkClicked = this.sentOkClicked.bind(this);
		this.returnDraftModal = this.returnDraftModal.bind(this);
		this.draftOkClicked = this.draftOkClicked.bind(this);
		this.saveDraftData = this.saveDraftData.bind(this);
		this.errorCloseClicked = this.errorCloseClicked.bind(this);
		this.retryServiceCall = this.retryServiceCall.bind(this);
		this.state = {
			chars_left: 3000,
			showPopup: false,
			showDraftSuccessModal: false,
			showSaveServiceErrorModal: false,
			showSendServiceErrorModal: false,
			disabled: true,
			charError: false,
		};
	}
	componentWillMount() {
		// If account service responding late then what to do...
		const { account, subject } = this.props.location.messageDetail;
		const accName = getAccountName(account.accountId, this.props.accounts);
		if ((account.accountId !== undefined || null) && subject) {
			account.name = (accName).display_name || (accName).name;
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
		this.props.dispatch(popupState());
		window.scrollTo(0, 0);
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
		} else {
			this.setState({ disabled: false });
		}
		this.setState({ chars_left: 3000 - e.length });
		const extractedString = RegexUtils.matchString(e);
		if (extractedString !== null) {
			const lastFour = RegexUtils.getLastFourDigits(extractedString);
			messageEntity.setMessage(e.replace(new RegExp(extractedString, 'g'), `************${lastFour}`));
		} else messageEntity.setMessage(e);
		if (this.state.chars_left >= 0) {
			this.setState({ charError: false });
		}
	}

	sendData() {
		this.setState({ charError: true });
		this.renderRemainingChar();
		if (this.state.chars_left >= 0) {
			this.props.dispatch(updateMessageData(messageEntity.getMessageRequestData(), this.props.location.messageDetail.id, StringsConstants.PENDING));
			this.setState({ showPopup: true });
			this.setState({ showSendServiceErrorModal: true });
		}
	}

	returnModalComponent() {
		const bodyContent = <div><div><GetIcon id="icon-success" width="68px" height="68px" /></div>{this.props.content.messageSent}</div>;
		const footerButtons = <div><Link to={`${window.baseURl}/securemessages`} onClick={this.sentOkClicked} className="c-btn c-btn--default c-btn--sm c-modal__button">{this.props.content.ok}</Link></div>;
		return (<ModalComponent
			show
			customClass="c-modal c-modal--center"
			bsSize="small"
			modalheading=""
			modalbody={bodyContent}
			modalfooter={footerButtons}
			modalInContainer={false}
			closeButton={false}
		/>);
	}
	sentOkClicked() {
		this.setState({ showPopup: false });
	}
	returnDraftModal() {
		const bodyContent = <div><div><GetIcon id="icon-success" width="68px" height="68px" /></div>{this.props.content.draftBody}</div>;
		const footerButtons = <div><Link to={`${window.baseURl}/securemessages`} onClick={this.draftOkClicked} className="c-btn c-btn--default c-btn--sm c-modal__button">{this.props.content.ok}</Link></div>;
		return (<ModalComponent
			show
			customClass="c-modal c-modal--center"
			bsSize="small"
			modalheading=""
			modalbody={bodyContent}
			modalfooter={footerButtons}
			modalInContainer={false}
			closeButton={false}
		/>);
	}
	saveDraftData() {
		const { location, dispatch } = this.props;
		if (this.state.chars_left >= 0) {
			dispatch(updateMessageData(messageEntity.getMessageRequestData(), location.messageDetail.id, StringsConstants.DRAFT));
			this.setState({ showSaveServiceErrorModal: true });
			this.setState({ showDraftSuccessModal: true });
		}
	}
	draftOkClicked() {
		this.setState({ showDraftSuccessModal: false });
	}
	checkAccountValue() {
		const { location, content } = this.props;
		let accVal;
		if (location.messageDetail.account.number === undefined || null) {
			accVal = content.noSpecificAccount;
		} else {
			accVal = location.messageDetail.account.name;
		}
		return accVal;
	}
	errorCloseClicked() {
		this.setState({ showSaveServiceErrorModal: false });
		this.setState({ showSendServiceErrorModal: false });
	}
	retryServiceCall() {
		this.props.dispatch(popupState());
		if (this.state.showSaveServiceErrorModal) {
			this.saveDraftData();
		}
		if (this.state.showSendServiceErrorModal) {
			this.sendData();
		}
	}
	returnErrorModal() {
		const bodyContent = (<div><h3>{this.props.content.sorryHeader}</h3><br />
			<p>{this.props.content.tryAgain}</p><br />
			<p>{this.props.content.getInTouch}</p>
		</div>);
		const footerButtons = (<div><button type="button" className="c-btn c-btn--secondary c-modal__button" onClick={this.errorCloseClicked}>{this.props.content.back}</button>
			<button type="button" onClick={this.retryServiceCall} className="c-btn c-btn--default c-modal__button">{this.props.content.retry}</button>
		</div>);
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

	renderRemainingChar() {
		const { chars_left, charError } = this.state;
		const { dispatch, content } = this.props;
		if (chars_left < 0 && charError === true) {
			return (
				<div>
					<p className="char__error error__right">{chars_left} {content.charLeft}</p>
					<CalloutComponent dClass="callout callout__error callout__inline-error-textarea" paraText={content.messageVal} />
				</div>);
		}
		if (chars_left <= 300) {
			(chars_left === 3) && dispatch(sendMessageForAccessibiltiy('Three characters left'));
			(chars_left === 1) && dispatch(sendMessageForAccessibiltiy('One character left'));
			(chars_left === 0) && dispatch(sendMessageForAccessibiltiy('Maximum characters limit reached'));
			let headerflagClass = 'error__right';
			if (chars_left <= 0) {
				headerflagClass = 'char__error error__right';
			}
			return <p className={`${headerflagClass}`}>{chars_left} {content.charLeft}</p>;
		}
	}

	render() {
		const { content, messages } = this.props;
		const { account, subject, message } = this.props.location.messageDetail;
		const { validationSubjectMsg, validationAccountMsg, showPopup, showDraftSuccessModal, showSaveServiceErrorModal, showSendServiceErrorModal, disabled } = this.state;
		account.number === undefined || null ? content.noSpecificAccount : account;
		return (
			<div className="row centralised-container c-card">
				<div className="col-md1-24 col-sm1-24 col-lg1-24">
					<StepHeader showheaderCrumbs onClick={() => { }} headerCrumbsMessage={content.back} headerTitle={content.editSavedMessage} headerCrumbsPath={{ pathname: `${window.baseURl}/securemessages` }} />
					<div className="c-field">
						<label className="c-field__label c-field__label--block" htmlFor="subjects">
							{content.subject}
						</label>
						<div className="c-field__controls u-position-relative">
							<DropDownComponent subjects={subject} id="subjects" selectSubject={this.selectSubject} showSubjectError={validationSubjectMsg} isFromDraftOrReply selectedValue={subject} content={content} />
						</div>
					</div>

					<div className="c-field">
						<label className="c-field__label c-field__label--block" htmlFor="subjects">
							{content.messageRelatesTo}
						</label>
						<div className="c-field__controls u-position-relative">
							<DropDownComponent accounts={account} selectSubject={this.selectSubject} id="accounts" showAccountError={validationAccountMsg} isFromDraftOrReply selectedValue={this.checkAccountValue()} content={content} />
						</div>
					</div>


					<div className="c-field">
						<label className="c-field__label c-field__label--block" htmlFor="subjects">
							{content.message}
						</label>
						<div className="c-field__controls">
							<TextAreaComponent textData={this.textChange} draftData={message} isFromDraftOrReply />
						</div>
						{this.renderRemainingChar()}
					</div>

					{showPopup && messages.successModal ? this.returnModalComponent() : ''}
					{showDraftSuccessModal && messages.successModal && this.returnDraftModal()}
					{messages.draftError && showSaveServiceErrorModal && this.returnErrorModal()}
					{messages.draftError && showSendServiceErrorModal && this.returnErrorModal()}
					<div className="c-btn--group">
						<Link to={`${window.baseURl}/securemessages`} className="c-btn c-btn--secondary">{content.back} </Link>
						<button name="Save Draft" className="c-btn c-btn--secondary" onClick={this.saveDraftData} disabled={disabled}>{content.saveDraft}</button>
						<button name="Send" className="c-btn c-btn--default" onClick={this.sendData} disabled={disabled}>{content.send}</button>
					</div>
				</div>
			</div>);
	}
}
// export default DraftSecureMessage;
/**
 * Maps the state of the component to the state of the redux store
 * @param {object} state. State of the application
 */
const mapState = state => ({
	subjects: state.subjects,
	messages: state.messages,
	accounts: state.accounts,
});
export default connect(mapState)(DraftSecureMessage);
