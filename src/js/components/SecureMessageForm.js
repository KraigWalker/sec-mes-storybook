import React from 'react';
import DropDownComponent from './common/DropDownComponent';
import RegexUtils from '../utils/RegexUtils';
import { Textarea } from 'web-ui-components/lib/atoms/forms';
import { Button } from 'web-ui-components/lib/atoms/buttons';
import { ButtonGroup } from 'web-ui-components/lib/molecules/buttons';
import { UnfinishedWorkModal } from 'web-ui-components/lib/organisms/modals';
import MessageEntity from '../entities/MessageEntity';
import { ValidationMessage } from 'web-ui-components/lib/molecules/forms';
import { Container, Row } from 'web-ui-components/lib/global/layout';
import { Card } from "web-ui-components/lib/organisms/cards";
import { TextBody } from "web-ui-components/lib/atoms/text";
import { Label } from 'web-ui-components/lib/atoms/forms';
import { BackButton } from 'web-ui-components/lib/molecules/navigation';
import SuccessMpdal from "./common/SuccessModal";
import ErrorModal from "./common/ErrorModal";
import { TextStyled } from 'web-ui-components/lib/atoms/text';
import { Title } from "web-ui-components/lib/atoms/text";
import PropTypes from 'prop-types';
import { withBreakpoints } from "../components/common/hoc/WithBreakpoint";

const CHARS_LEFT_DISPLAY_THRESHOLD = 300;
const MAX_CHARS = 3000;


//DEBT : this component needs broken up considerably, now that is has been reduced from 
//3 files into one shared across reply, draft & new. It's render method needs broken down considerably
//Textarea logic / state should be replaced with either a web ui component or a wrapping component
export class SecureMessageForm extends React.Component {
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
		this.returnDraftModal = this.returnDraftModal.bind(this);
		this.saveDraftData = this.saveDraftData.bind(this);
		this.errorCloseClicked = this.errorCloseClicked.bind(this);
		this.retryServiceCall = this.retryServiceCall.bind(this);
		this.callBackModal = this.callBackModal.bind(this);
		this.determineBackAction = this.determineBackAction.bind(this);
		this.goHome = this.goHome.bind(this);
		this.getSuccessModal = this.getSuccessModal.bind(this);

		this.state = {
			chars_left: MAX_CHARS,
			showPopup: false,
			showSentMessageModal: false,
			showDraftSuccessModal: false,
			showSaveServiceErrorModal: false,
			showSendServiceErrorModal: false,
			showAccountInvalid: false,
			showSubjectInvalid: false,
			disabled: props.buttonsDisabled,
			charError: false,
			showModalBack: false,
			subject: props.selectedSubject,
			accountValue: props.selectedAccountValue,
			message: props.messageText
		};
	}

	componentDidMount() {
		this.props.onMount();
		this.props.popupState();
		window.scrollTo(0, 0);
	}

	componentDidUpdate() {

		const { chars_left } = this.state;
		const { content } = this.props;
		if (chars_left <= CHARS_LEFT_DISPLAY_THRESHOLD) {
			chars_left === 3 &&
				this.props.sendMessageForAccessibiltiy(content.threeCharLeft);
			chars_left === 1 &&
				this.props.sendMessageForAccessibiltiy(content.oneCharLeft);
			chars_left === 0 &&
				this.props.sendMessageForAccessibiltiy(content.maxCharLimit);
		}
	}

	componentWillUnmount() {
		window.top.postMessage('clearNewMessagePage', '*');
		window.scrollTo(0, 0);
	}

	selectSubject(id, data) {

		switch (id) {
			case 'accounts':
				this.setState({
					accountValue: data,
					showAccountInvalid: !this.isAccountValid(data)
				})
				break;
			case 'subjects':
				this.setState({
					subject: data,
					showSubjectInvalid: !this.isSubjectValid(data)
				})
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
		this.renderRemainingChar();
		if (this.checkValidation()) {
			this.props.onSend(this.buildMessageData());
			this.setState({ showSentMessageModal: true,
						 	showSendServiceErrorModal: true });
		}
	}

	goHome() {
		this.props.history.push("/securemessages");
	}

	getSuccessModal(body)
	{
		const { content } = this.props;
		return (<SuccessMpdal
			onClick={this.goHome}
			bodyText={body}
			okText={content.ok} />);
	}

	returnSentMessageModal() {
		window.top.postMessage('clearNewMessagePage', '*');
		const { content } = this.props;
		return this.getSuccessModal(content.messageSent);
	}

	returnDraftModal() {
		const { content } = this.props;
		return this.getSuccessModal(content.draftBody);
	}

	buildMessageData()
	{
		const {accountValue, subject, message } = this.state;
		const { accounts } = this.props;
		const messageEntity = new MessageEntity();

		const actualAccount = _.find(accounts, account => account.number === accountValue);
		if (actualAccount)
		{
			messageEntity.setAccount({id: actualAccount.accountId, number: actualAccount.number});
		}
		messageEntity.setSubject(subject);
		messageEntity.setMessageBody(message);
		return messageEntity;

	}

	saveDraftData() {
		if (this.checkValidation())
		{
			this.props.onSave(this.buildMessageData());
		
			this.setState({ showPopup: false,
							showDraftSuccessModal: true,
							showSaveServiceErrorModal: true });
		}
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
		return <ErrorModal content={content}
				onClose={this.errorCloseClicked}
				onConfirm={this.retryServiceCall} />;
	}

	
	renderRemainingChar() {
		const { chars_left, charError } = this.state;
		const { content } = this.props;

		if (chars_left < 0 && charError === true) {
			return (
				<div>
					<TextBody>
						<ValidationMessage
							value={`${chars_left} ${content.charLeft}`}
							hasIcon={false}
						/>
					</TextBody>
					<TextBody>
						<ValidationMessage
							value={content.messageVal}
						/>
					</TextBody>
				</div>				
			);
		}
		else if (chars_left <= CHARS_LEFT_DISPLAY_THRESHOLD) {
			return (
				<TextStyled size="uist" className="u-padding-top-1">{chars_left} {content.charLeft}</TextStyled>
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

	checkValidation() {
		const { accountValue, subject, chars_left } = this.state;

		const accountValid = this.isAccountValid(accountValue);
		const subjectValid = this.isSubjectValid(subject);
		
		this.setState({
			showAccountInvalid: !accountValid,
			showSubjectInvalid: !subjectValid
		});

		return accountValid 
		&& subjectValid
		&& chars_left >= 0;
	}

	isAccountValid(account)
	{
		const { content } = this.props;
		return account !== content.pleaseSelect;
	}

	isSubjectValid(subject)
	{
		const { content } = this.props;
		return subject !== content.pleaseSelect;
	}

	render() {
		const { content, successModal, subjects, subjectErrors, messageError, accounts, title
			, messageText
			, containerSize
			, noPadding} = this.props;

		const { showSendServiceErrorModal, 
			showSaveServiceErrorModal, 
			showDraftSuccessModal, 
			showSentMessageModal, 
			showPopup,
			showSubjectInvalid,
			showAccountInvalid} = this.state;


		let paddingProps = null;
		if (noPadding)
		{
			paddingProps = {
				className: "u-padding-0",
			}
		}
	
		
		return (
			<Container {...paddingProps} size={containerSize}>
				<Row>
					<Card>	
						<Title size="h1">{title}</Title>
						<TextBody>
                		 	<BackButton onClick={this.determineBackAction} label={content.back}/>
                		</TextBody>
						<TextBody>
							<Label
								id="subjectTitle"
								htmlFor="subjects"
							>
								{content.subject}
							</Label>
						</TextBody>
						
						<DropDownComponent
							accessID="Subject"
							subjects={subjects}
							name="subjects"
							id="subjects"
							ddId="ddlSubject"
							selectSubject={this.selectSubject}
							showSubjectError={showSubjectInvalid}
							subjectErrors={subjectErrors}
							selectedValue={this.props.selectedSubject}
							content={content}
						/>
						<TextBody>
							<Label
								id="relatesTitle"
								htmlFor="subjects"
							>
								{content.messageRelatesTo}
							</Label>
						</TextBody>
						<DropDownComponent
							accessID="Message relates to"
							accounts={accounts}
							selectSubject={this.selectSubject}
							name="accounts"
							ddId="ddlAccount"
							id="accounts"
							showAccountError={showAccountInvalid}
							selectedValue={this.props.selectedAccountValue}
							content={content}
						/>
						<TextBody>
							<Label
								id="messageTitle"
								htmlFor="subjects"
							>
								{content.message}
							</Label>
						</TextBody>
						<TextBody>
								<div className="u-visually-hidden off-screen" id="textAreaMaxMsg">
									{content.maxCharLimit}
								</div>
								{/* DEBT:  would like to use TextAreaCharacterCount, but no hook available to tie into change event and props not spread */}
								<Textarea 
									onChange={(e) => this.textChange(e.target.value)}
									rows="10"
									cols="20"
									id="message"
									maxLength='infinity'
									defaultValue={messageText} />
							{this.renderRemainingChar()}
						</TextBody>
						<TextBody>
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
									display="primary"
									width="flush"
									onClick={this.saveDraftData}
									disabled={this.state.disabled}
								>
									{content.saveDraft}
								</Button>
								<Button
									name="Send"
									display="primary"	
									width="flush"
									onClick={this.sendData}
									disabled={this.state.disabled}
								>
									{content.send}
								</Button>
							</ButtonGroup>
						</TextBody>
						{showPopup && this.returnModalComponent()}
						{showSentMessageModal && successModal
							? this.returnSentMessageModal()
							: ''}
						{showDraftSuccessModal &&
							successModal &&
							this.returnDraftModal()}
						{messageError &&
							showSaveServiceErrorModal &&
							this.returnErrorModal()}
						{messageError &&
							showSendServiceErrorModal &&
							this.returnErrorModal()}
						{this.props.threads}	
				</Card>
			</Row>
			</Container>
		);
	}
}

SecureMessageForm.propTypes = {
    selectedAccount: PropTypes.object,
	selectedSubject: PropTypes.string,
	selectedAccountValue: PropTypes.string,
    onMount: PropTypes.func,
    popupState: PropTypes.func,
	sendData: PropTypes.func,
	onSave: PropTypes.func,
	saveDraftData: PropTypes.func,
	sendMessageData: PropTypes.func,
	successModal: PropTypes.bool,
	accounts: PropTypes.array,
	subjects: PropTypes.array,
	subjectErrors: PropTypes.bool,
	messages: PropTypes.array,
	title: PropTypes.string,
	sendMessageForAccessibiltiy: PropTypes.func,
	hasErrors: PropTypes.bool,
	buttonsDisabled: PropTypes.bool
};

export default withBreakpoints(SecureMessageForm);

