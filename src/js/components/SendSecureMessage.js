import React from 'react';
import StepHeader from './common/StepHeader';
import DropDownComponent from './common/DropDownComponent';
import RegexUtils from '../utils/RegexUtils';
import SendMessageRequestEntity from '../entities/SendMessageRequestEntity';
import { getAccountName } from '../bl/SecureMessageBL';
import GetIcon from './common/GetIcon';
import CalloutComponent from './common/CalloutComponent';
import { Textarea } from 'web-ui-components/lib/atoms/forms';
import { Button } from 'web-ui-components/lib/atoms/buttons';
import { ButtonGroup } from 'web-ui-components/lib/molecules/buttons';
import { UnfinishedWorkModal, CentredModal, ConfirmationModal} from 'web-ui-components/lib/organisms/modals';
import MessageEntity from '../entities/MessageEntity';

const CHARS_LEFT_DISPLAY_THRESHOLD = 300;
const MAX_CHARS = 3000;

export class SendSecureMessage extends React.Component {
	constructor(props) {
		super(props);
		this.textChange = this.textChange.bind(this);
		this.selectSubject = this.selectSubject.bind(this);
		this.buildMessageData = this.buildMessageData.bind(this);
		this.sendData = this.sendData.bind(this);
		this.returnSentMessageModal = this.returnSentMessageModal.bind(this);
		this.returnModalComponent = this.returnModalComponent.bind(this);
		this.leavePage = this.leavePage.bind(this);
		this.stayOnPage = this.stayOnPage.bind(this);
		this.sentOkClicked = this.sentOkClicked.bind(this);
		this.returnDraftModal = this.returnDraftModal.bind(this);
		this.saveDraftData = this.saveDraftData.bind(this);
		this.errorCloseClicked = this.errorCloseClicked.bind(this);
		this.retryServiceCall = this.retryServiceCall.bind(this);
		this.callBackModal = this.callBackModal.bind(this);
		this.determineBackAction = this.determineBackAction.bind(this)
		this.state = {
			chars_left: MAX_CHARS,
			showPopup: false,
			showSentMessageModal: false,
			showDraftSuccessModal: false,
			showSaveServiceErrorModal: false,
			showSendServiceErrorModal: false,
			disabled: true,
			charError: false,
			showModalBack: false,
			subject: null,
			account: null,
			message: null
		};
	}
	
	componentDidMount() {
		this.props.onMount();
		this.props.popupState();
		window.scrollTo(0, 0);
	}

	componentWillUnmount() {
		window.top.postMessage('clearNewMessagePage', '*');
		window.scrollTo(0, 0);
	}

	selectSubject(id, data) {

		console.log('change');
		console.log(id);
		console.log(data);
		switch (id) {
			case 'accounts':
				this.setState({account: {...data}})
				break;
			case 'subjects':
				this.setState({subject: data})
				break;
			default:
		}
	}
	textChange(e) {

		let disabled;
		if (e === '') {
			disabled = true;
			window.top.postMessage('clearNewMessagePage', '*');
		} else {
			disabled = false
			window.top.postMessage('newMessagePage', '*');
		}
		
		const chars_left =  MAX_CHARS - e.length;
		let charError = chars_left < 0;

		const extractedString = RegexUtils.matchString(e);
		let message;
		if (extractedString !== null) {
			const lastFour = RegexUtils.getLastFourDigits(extractedString);
			message = e.replace(new RegExp(extractedString, 'g'), `************${lastFour}`);
		}
		else message = e; 
		

		this.setState({
			showModalBack: true,
			disabled,
			message,
			chars_left,
			charError
			}
		);
		
	}

	sendData() {
		// this.setState({ charError: true });
		this.renderRemainingChar();
		if (this.state.chars_left >= 0) {

			this.props.onSend(this.buildMessageData());
			this.setState({ showSentMessageModal: true,
						 	showSendServiceErrorModal: true });
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

		const footerButtons =  (<ButtonGroup alignment="center">
			<Button
				display="primary"
				onClick={() => {this.props.history.push("/securemessages")}}
			>
				{content.ok}
				</Button>
		</ButtonGroup>);

		return  (<CentredModal
			isOpen={true}
			title=''
			buttonNode={footerButtons}
			onClose={() => {this.props.history.push("/securemessages")}}>
			{bodyContent}
		</CentredModal>);
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

		const footerButtons =  (<ButtonGroup alignment="center">
			<Button
				display="primary"
				onClick={() => {this.props.history.push("/securemessages")}}
			>
				{content.ok}
				</Button>
		</ButtonGroup>);

		return  (<CentredModal
			isOpen={true}
			title=''
			buttonNode={footerButtons}
			onClose={() => {this.props.history.push("/securemessages")}}>
			{bodyContent}
		</CentredModal>);
	}

	buildMessageData()
	{
		const {account, subject, message } = this.state;
		const messageEntity = new MessageEntity();

		if (account)
		{
			messageEntity.setAccount({id: account.accountId, number: account.number});
		}
		messageEntity.setSubject(subject);
		messageEntity.setMessageBody(message);
		return messageEntity;

	}

	saveDraftData() {
		this.props.onSave(this.buildMessageData());
		
		this.setState({ showPopup: false,
						showDraftSuccessModal: true,
						showSaveServiceErrorModal: true });
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
		const { customerNameError } = this.props;
		if (customerNameError) {
			this.props.popupState();
		}
		this.setState({ showSaveServiceErrorModal: false,
						showSendServiceErrorModal: false });
	}
	retryServiceCall() {
		const { showSaveServiceErrorModal, showSendServiceErrorModal } = this.state;
		this.props.popupState();
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

	determineBackAcption() {
		if (this.state.disabled)
		{
			this.props.history.push("/securemessages")
		}
		else {
			this.callBackModal();
		}
	}

	returnModalComponent() {

		const { showPopup } = this.state;
		const { content, history } = this.props;
		if (showPopup) {

			return <UnfinishedWorkModal
				destructiveActionButtonText={content.leavePage}
				isOpen={true}
				onClose={this.stayOnPage}
				onDestructiveAction={() => {this.leavePage(); history.push("/securemessages") }}
				safeActionButtonText={content.returnToMessage}
				title={content.leavePage}
    		>
				{content.leaveMessageBody}
			</UnfinishedWorkModal>
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
		return  <ConfirmationModal
			title={bodyContent} 
			onConfirm={retry} 
			isOpen={true} 
			onClose={this.errorCloseClicked}
			dismissButtonText={content.back}
			confirmButtonText={content.retry}
		/>
	}

	returnBackButton({backpath}) {
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
		if (chars_left <= CHARS_LEFT_DISPLAY_THRESHOLD) {
			chars_left === 3 &&
				this.props.sendMessageForAccessibiltiy(content.threeCharLeft);
			chars_left === 1 &&
				this.props.sendMessageForAccessibiltiy(content.oneCharLeft);
			chars_left === 0 &&
				this.props.sendMessageForAccessibiltiy(content.maxCharLimit);
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

	determineBackAction() {
		if (this.state.disabled)
		{
			this.props.history.push("/securemessages")
		}
		else {
			this.callBackModal();
		}
	}

	render() {
		const { content, messages, location, subjects, hasError, messageInfo, accounts } = this.props;
		const { showSendServiceErrorModal, showSaveServiceErrorModal, showDraftSuccessModal, showSentMessageModal, showPopup, disabled } = this.state;

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
								subjects={subjects}
								name="subjects"
								id="subjects"
								selectSubject={this.selectSubject}
								isFromDraftOrReply
								selectedValue={this.props.selectedSubject !== null ? this.props.selectedSubject :  messageInfo.subject}
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
								accounts={accounts}
								selectSubject={this.selectSubject}
								name="accounts"
								id="accounts"
								isFromDraftOrReply
								selectedValue={this.props.selectedAccount !== null ? this.props.selectedAccount : this.checkAccountValue()}
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
							{/* DEBT:  would like to use TextAreaCharacterCount, but no hook available to tie into change event and props not spread */}
							<Textarea 
								onChange={(e) => this.textChange(e.target.value)}
								ariaId="textAreaMaxMsg"
								accessID="messageTitle"
								id="message"
							/>
						</div>
						{this.renderRemainingChar()}
					</div>
					<ButtonGroup>

						<Button
							name="Back"
							display="secondary"
							width="flush"
							onClick={this.determineBackAction}
							disabled={false}
						>
							{content.back}
						</Button>
						<Button
							name="Save Draft"
							display="secondary"
							width="flush"
							onClick={this.saveDraftData}
							disabled={this.state.disabled}
						>
							{content.saveDraft}
						</Button>
						<Button
							name="Send"
							display="secondary"	
							width="flush"
							onClick={this.sendData}
							disabled={this.state.disabled}
						>
							{content.send}
						</Button>
					</ButtonGroup>
					{showPopup && this.returnModalComponent()}
					{showSentMessageModal && messages.successModal
						? this.returnSentMessageModal()
						: ''}
					{showDraftSuccessModal &&
						messages.successModal &&
						this.returnDraftModal()}
					{hasError &&
						showSaveServiceErrorModal &&
						this.returnErrorModal()}
					{hasError &&
						showSendServiceErrorModal &&
						this.returnErrorModal()}
					{this.props.threads}
				</div>
			</div>
		);
	}
}

export default SendSecureMessage;


