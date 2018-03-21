import React from 'react';
import { getMessageSubjects, getAccounts, sendMessageData, updateMessageData, sendMessageForAccessibiltiy, setNavRef } from '../actions/AppActions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Dropdown, ButtonToolbar, MenuItem } from 'react-bootstrap/lib';
import _ from 'lodash';
import DropDownComponent from './common/DropDownComponent.js';
import TextAreaComponent from './common/TextAreaComponent.js';
import StepHeader from './common/StepHeader';
import SendMessageRequestEntity from '../entities/SendMessageRequestEntity.js';
import ModalComponent from './common/ModalComponent';
import GetIcon from './common/GetIcon';
import RegexUtils from '../utils/RegexUtils.js';
import { getAccountName } from '../bl/SecureMessageBL';
import CalloutComponent from './common/CalloutComponent.js';
import StringsConstants from '../constants/StringsConstants.js';
import token from '../token';

const messageEntity = new SendMessageRequestEntity();
class DraftSecureMessage extends React.Component {
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
		if (this.props.location.messageDetail.account.accountID !== undefined && this.props.location.messageDetail.subject) {
			this.props.location.messageDetail.account.name = getAccountName(this.props.location.messageDetail.account.accountID, this.props.accounts).name;
			this.props.location.messageDetail.account.id = this.props.location.messageDetail.account.accountID;
			messageEntity.setName(getAccountName(this.props.location.messageDetail.account.accountID, this.props.accounts).name);
			messageEntity.setUpdateSubject(this.props.location.messageDetail.subject);
			messageEntity.setAccountId(this.props.location.messageDetail.account.id);
			this.props.location.messageDetail.account.number = (getAccountName(this.props.location.messageDetail.account.accountID, this.props.accounts).number);
			messageEntity.setAccountNumber(this.props.location.messageDetail.account.number);
		}
		if (this.props.location.messageDetail.account.accountID === undefined) {
			messageEntity.setAccount(this.props.location.messageDetail.account);
			messageEntity.setUpdateSubject(this.props.location.messageDetail.subject);
		}
	}
	componentDidMount() {
		this.props.dispatch(setNavRef('/draftsecuremessage'));
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
		}
	}

	renderRemainingChar() {
		if (this.state.chars_left < 0 && this.state.charError === true) {
			return (
				<div>
					<p className="char__error error__right">Characters Left: {this.state.chars_left}</p>
					<CalloutComponent dClass="callout callout__error callout__inline-error" paraText={this.props.content.messageVal} />
				</div>);
		}
		if (this.state.chars_left <= 300) {
			(this.state.chars_left === 3) && this.props.dispatch(sendMessageForAccessibiltiy('Three characters left'));
			(this.state.chars_left === 1) && this.props.dispatch(sendMessageForAccessibiltiy('One character left'));
			(this.state.chars_left === 0) && this.props.dispatch(sendMessageForAccessibiltiy('Maximum characters limit reached'));
			let headerflagClass = 'error__right';
			if (this.state.chars_left <= 0) {
				headerflagClass = 'char__error error__right';
			}
			return <p className={`${headerflagClass}`}>Characters Left: {this.state.chars_left}</p>;
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
		this.props.dispatch(updateMessageData(messageEntity.getMessageRequestData(), this.props.location.messageDetail.id, StringsConstants.DRAFT));
		this.setState({ showSaveServiceErrorModal: true });
		this.setState({ showDraftSuccessModal: true });
	}
	draftOkClicked() {
		this.setState({ showDraftSuccessModal: false });
	}
	checkAccountValue() {
		let accVal;
		if (this.props.location.messageDetail.account.accountNumber === undefined) {
			accVal = 'No specific account';
		} else {
			accVal = this.props.location.messageDetail.account.name;
		}
		return accVal;
	}
	errorCloseClicked() {
		this.setState({ showSaveServiceErrorModal: false });
		this.setState({ showSendServiceErrorModal: false });
	}
	retryServiceCall() {
		if (this.state.showSaveServiceErrorModal) {
			this.props.dispatch(updateMessageData(messageEntity.getMessageRequestData(), this.props.location.messageDetail.id, StringsConstants.DRAFT));
		}
		if (this.state.showSendServiceErrorModal) {
			this.props.dispatch(updateMessageData(messageEntity.getMessageRequestData(), this.props.location.messageDetail.id, StringsConstants.PENDING));
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

	render() {
		 this.props.location.messageDetail.account.accountNumber === undefined ? 'No specific account' : this.props.location.messageDetail.account;
		return (
			<div className="container">
				<div className="row">
					<div className="col-md1-18">
						<StepHeader showheaderCrumbs onClick={() => { }} headerCrumbsMessage="Back" headerTitle="Edit saved message" headerCrumbsPath={{ pathname: `${window.baseURl}/securemessages` }} />
					</div>
				</div>
				{/* <Link to='/securemessages'> Back To Homepage</Link><br /> */}

				<div className="c-field">
					<label className="c-field__label c-field__label--block" htmlFor="subjects">
						{this.props.content.subject}
					</label>
					<div className="c-field__controls u-position-relative">
						<DropDownComponent subjects={this.props.location.messageDetail.subject} name="subjects" id="subjects" selectSubject={this.selectSubject} showSubjectError={this.state.validationSubjectMsg} isFromDraftOrReply selectedValue={this.props.location.messageDetail.subject} />
					</div>
				</div>

				<div className="c-field">
					<label className="c-field__label c-field__label--block" htmlFor="subjects">
						{this.props.content.messageRelatesTo}
					</label>
					<div className="c-field__controls u-position-relative">
						<DropDownComponent accounts={this.props.location.messageDetail.account} selectSubject={this.selectSubject} name="accounts" id="accounts" showAccountError={this.state.validationAccountMsg} isFromDraftOrReply selectedValue={this.checkAccountValue()} />
					</div>
				</div>


				<div className="c-field">
					<label className="c-field__label c-field__label--block" htmlFor="subjects">
						{this.props.content.message}
					</label>
					<div className="c-field__controls">
						<TextAreaComponent textData={this.textChange} draftData={this.props.location.messageDetail.message} isFromDraftOrReply />
					</div>
					{this.renderRemainingChar()}
				</div>

				{this.state.showPopup && this.props.messages.successModal ? this.returnModalComponent() : ''}
				{this.state.showDraftSuccessModal && this.props.messages.successModal && this.returnDraftModal()}
				{this.props.messages.draftError && this.state.showSaveServiceErrorModal && this.returnErrorModal()}
				{this.props.messages.draftError && this.state.showSendServiceErrorModal && this.returnErrorModal()}
				<div className="c-btn--group">
					<Link to={`${window.baseURl}/securemessages`} className="c-btn c-btn--secondary">{this.props.content.back} </Link>
					<button name="Save Draft" className="c-btn c-btn--secondary" onClick={this.saveDraftData} disabled={this.state.disabled}>{this.props.content.saveDraft}</button>
					<button name="Send" className="c-btn c-btn--default" onClick={this.sendData} disabled={this.state.disabled}>{this.props.content.send}</button>
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
