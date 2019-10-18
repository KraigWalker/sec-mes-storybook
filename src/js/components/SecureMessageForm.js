import React from 'react';
import DropDownComponent from './common/DropDownComponent';
import { Button } from 'web-ui-components/lib/atoms/buttons';
import { ButtonGroup } from 'web-ui-components/lib/molecules/buttons';
import { UnfinishedWorkModal } from 'web-ui-components/lib/organisms/modals';
import MessageEntity from '../entities/MessageEntity';
import { Container, Row } from 'web-ui-components/lib/global/layout';
import { Card } from "web-ui-components/lib/organisms/cards";
import { TextBody } from "web-ui-components/lib/atoms/text";
import { Icon } from 'web-ui-components/lib/atoms/iconography';
import { Label } from 'web-ui-components/lib/atoms/forms';
import { BackButton } from 'web-ui-components/lib/molecules/navigation';
import { SubHeading } from 'web-ui-components/lib/typography/headings';
import TextAreaWrapper from './common/TextAreaWrapper';
import SuccessMpdal from "./common/SuccessModal";
import ErrorModal from "./common/ErrorModal";
import PropTypes from 'prop-types';
import { LoadingLocalTakeover } from 'web-ui-components/lib/organisms/takeovers';
import { withBreakpoints } from "../components/common/hoc/WithBreakpoint";
import { maskCardDetails } from "../bl/SecureMessageBL";
import { getPaddingProps, getRowMarginProps } from "../utils/GeneralUtils"

const CHARS_LEFT_DISPLAY_THRESHOLD = 300;
const MAX_CHARS = 3000;

//DEBT : this component needs broken up considerably, now that is has been reduced from
//3 files into one shared across reply, draft & new. It's render method needs broken down considerably
//Textarea logic / state should be replaced with either a web ui component or a wrapping component
export class SecureMessageForm extends React.Component {
	constructor(props) {
		super(props);
		this.handleTextChange = this.handleTextChange.bind(this);
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
			dirty: false,
			showModalBack: false,
			subject: props.selectedSubject,
			accountValue: props.selectedAccountValue,
			message: props.messageText
		};
	}

	componentDidMount() {
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
					showAccountInvalid: !this.isAccountValid(data),
					dirty: true
				})
				break;
			case 'subjects':
				this.setState({
					subject: data,
					showSubjectInvalid: !this.isSubjectValid(data),
					dirty: true
				})
				break;
			default:
		}
	}

	handleTextChange(e, chars_left) {
		const value = e.target.value;
		let disabled;
		if (value === '') {
			disabled = true;
			window.top.postMessage('clearNewMessagePage', '*');
		} else {
			disabled = false
			window.top.postMessage('newMessagePage', '*');
		}

		const message = maskCardDetails(value);
		this.setState({
			showModalBack: true,
			disabled,
			message,
			chars_left,
			dirty: true
		});

	}

	sendData() {
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
		this.props.popupState();
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
			onCloseClicked={this.errorCloseClicked}
			onRetry={this.retryServiceCall} />;
	}

	determineBackAction() {
		if (this.state.disabled || !this.state.dirty)
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

	isAccountValid(account) {
		const { content } = this.props;
		return account !== content.pleaseSelect;
	}

	isSubjectValid(subject){
		const { content } = this.props;
		return subject !== content.pleaseSelect;
	}

	render() {
		const {
			content,
			successModal,
			subjects,
			subjectErrors,
			messageError,
			accounts,
			title,
			messageText,
			containerSize,
			noPadding,
			isUpdatingMessage,
			isSavingDraft,
		} = this.props;

		const {
			showSendServiceErrorModal,
			showSaveServiceErrorModal,
			showDraftSuccessModal,
			showSentMessageModal,
			showPopup,
			showSubjectInvalid,
			showAccountInvalid
	 	} = this.state;

		return (
				<Container {...getPaddingProps(noPadding)} size={containerSize}>
			<LoadingLocalTakeover show={isUpdatingMessage || isSavingDraft} title={isUpdatingMessage ? content.sendingMessage: content.savingMessage}>
				<Row {...getRowMarginProps(noPadding)}>
						<Card>
							<SubHeading>{title}</SubHeading>
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
									<TextAreaWrapper
										onChange={this.handleTextChange}
										rows="20"
										cols="20"
										id="message"
										value={messageText}
										content={content}
										maxChars={MAX_CHARS}
										charsLeftDisplayThreshold={CHARS_LEFT_DISPLAY_THRESHOLD}
									/>

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
										<Icon iconType="ChevronLeftLarge" />
										{content.back}
									</Button>
									<Button
										name="Save Draft"
										display="secondary"
										onClick={this.saveDraftData}
										disabled={this.state.disabled}
									>
										{content.saveDraft}
									</Button>
									<Button
										name="Send"
										display="primary"
										onClick={this.sendData}
										disabled={this.state.disabled}
									>
										{content.send}
									</Button>
								</ButtonGroup>
							</TextBody>
						</Card>
					</Row>
					</LoadingLocalTakeover>
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
				</Container>
		);
	}
}

SecureMessageForm.propTypes = {
    selectedAccount: PropTypes.object,
	selectedSubject: PropTypes.string,
	selectedAccountValue: PropTypes.string,
    popupState: PropTypes.func,
	sendData: PropTypes.func,
	onSave: PropTypes.func,
	saveDraftData: PropTypes.func,
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

