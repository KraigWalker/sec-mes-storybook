
import React from 'react';
import SecureMessageSummary from './common/SecureMessageSummary';
import StepHeader from './common/StepHeader';
import TextAreaComponent from './common/TextAreaComponent';
import DropDownComponent from './common/DropDownComponent'
import { Link } from 'react-router-dom';
import RegexUtils from '../utils/RegexUtils.js';
import SendMessageRequestEntity from '../entities/SendMessageRequestEntity.js'
import { connect } from 'react-redux';
import { getMessageSubjects, getAccounts, sendMessageData, sendMessageForAccessibiltiy, updateMessageData } from '../actions/AppActions';
let messageEntity = new SendMessageRequestEntity();
import { getThreadsBL } from '../bl/SecureMessageBL';
import Threads from './common/ThreadList';
import ModalComponent from './common/ModalComponent';
import GetIcon from './common/GetIcon';
import CalloutComponent from './common/CalloutComponent.js';
import SvgIcon from './common/GetIcon.js';
class ReplySecureMessage extends React.Component {
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
        if (this.props.location.messageDetail.account.accountID !== undefined && this.props.location.messageDetail.subject) {
            this.props.location.messageDetail.account['name'] = getAccountName(this.props.location.messageDetail.account.accountID, this.props.accounts)['name'];
            this.props.location.messageDetail.account['id'] = this.props.location.messageDetail.account.accountID;
            messageEntity.setName(getAccountName(this.props.location.messageDetail.account.accountID, this.props.accounts)['name']);
            messageEntity.setUpdateSubject(this.props.location.messageDetail.subject);
            messageEntity.setAccountId(this.props.location.messageDetail.account['id']);
            this.props.location.messageDetail.account['number']=(getAccountName(this.props.location.messageDetail.account.accountID, this.props.accounts)["number"]);
            messageEntity.setAccountNumber(this.props.location.messageDetail.account['number']);

        }
        if (this.props.location.messageDetail.account.accountID === undefined) {
            messageEntity.setAccount(this.props.location.messageDetail.account);
            messageEntity.setUpdateSubject(this.props.location.messageDetail.subject);
        }
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

    textChange(e) {
        this.setState({
            showModalBack: true
        });
        if (e === '') {
            this.setState({ disabled: true });
        } else {
            this.setState({ disabled: false });
        }
        this.setState({ chars_left: 3000 - e.length });
        let extractedString = RegexUtils.matchString(e);
        if (extractedString !== null) {
            let lastFour = RegexUtils.getLastFourDigits(extractedString);
            messageEntity.setMessage(e.replace(new RegExp(extractedString, 'g'), '************' + lastFour));
        } else messageEntity.setMessage(e);
        if (this.state.chars_left >= 0) {
            this.setState({ charError: false });
        }
    }

    renderRemainingChar() {
        if (this.state.chars_left < 0 && this.state.charError === true) {
            return (
                <div>
                    <p className="char__error">Characters Left: {this.state.chars_left}</p>
                    <CalloutComponent dClass='callout callout__error callout__inline-error' paraText='Oops. The maximum message size has been exceeded. Please reduce the length of your message.' />
                </div>);
        }
        if (this.state.chars_left <= 300) {
            (this.state.chars_left === 3) && this.props.dispatch(sendMessageForAccessibiltiy('Three characters left'));
            (this.state.chars_left === 1) && this.props.dispatch(sendMessageForAccessibiltiy('One character left'));
            (this.state.chars_left === 0) && this.props.dispatch(sendMessageForAccessibiltiy('Maximum characters limit reached'));
            return <p className="char__error">Characters Left: {this.state.chars_left}</p>;
        }
    }
    sendData() {
        this.setState({ charError: true });
        this.renderRemainingChar();
        if (this.state.chars_left >= 0) {
        this.props.dispatch(updateMessageData(messageEntity.getMessageRequestData(), this.props.location.messageDetail.id, "SENT"));
            this.setState({ showDraftSuccessModal: true });
            this.setState({showSendServiceErrorModal: true});
        }
    }

    getThreads(messages, currentMessage) {
        const threads = getThreadsBL(messages, currentMessage);
        return <Threads Threads={threads} currentMessage={currentMessage} isFromReplyMessage={true} />
    }
    returnSentMessageModal() {
        let bodyContent = <div><div><GetIcon id="icon-success" width="68px" height="68px" /></div>Message sent</div>;
        let footerButtons = <button type="button" onClick={this.sentOkClicked} className="c-btn c-btn--default c-btn--sm c-modal__button">Ok</button>;
        return (<ModalComponent show
            onHide={this.sentOkClicked}
            customClass={"c-modal c-modal--center"}
            modalheading={''}
            modalbody={bodyContent}
            modalfooter={footerButtons}
            modalInContainer={false}
            closeButton/>);
    }
    sentOkClicked(){
        this.setState({showSentMessageModal : false});
    }
    returnDraftModal(){
        let bodyContent = <div><div><GetIcon id="icon-success" width="68px" height="68px" /></div>Message saved as a draft</div>;
        let footerButtons = <button type="button" onClick={this.draftOkClicked} className="c-btn c-btn--default c-btn--sm c-modal__button">Ok</button>;
        return (<ModalComponent show
            onHide={this.draftOkClicked}
            customClass={"c-modal c-modal--center"}
            modalheading={''}
            modalbody={bodyContent}
            modalfooter={footerButtons}
            modalInContainer={false}
            closeButton/>);
    }
    saveDraftData(){    
        this.props.dispatch(updateMessageData(messageEntity.getMessageRequestData(), this.props.location.messageDetail.id, "DRAFT"));
        this.setState({ showPopup: false });
        this.setState({ showDraftSuccessModal: true });
        this.setState({showSaveServiceErrorModal: true});
    }
    draftOkClicked(){
        this.setState({showDraftSuccessModal : false});
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
        this.setState({showSaveServiceErrorModal: false});
        this.setState({showSendServiceErrorModal: false});
    }
    retryServiceCall() {
        if (this.state.showSaveServiceErrorModal) {
            this.props.dispatch(updateMessageData(messageEntity.getMessageRequestData(), this.props.location.messageDetail.id, "DRAFT"));
        }
        if (this.state.showSendServiceErrorModal) {
            this.props.dispatch(updateMessageData(messageEntity.getMessageRequestData(), this.props.location.messageDetail.id, "PENDING"));
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
        if (this.state.showPopup) {
            let bodyContent = <div className="callout callout__error">{this.props.content.leaveMessageBody}</div>;
            let footerButtons = <div><Link to={`${window.baseURl}/securemessages`}><button type="button" onClick={this.leavePage} className="c-btn c-btn--secondary c-modal__button">Leave page</button></Link>&nbsp;
            <button type="button" className="c-btn c-btn--secondary c-modal__button" onClick={this.saveDraftData} disabled={this.state.disabled}>{this.props.content.saveDraft}</button>
                <button type="button" onClick={this.stayOnPage} className="c-btn c-btn--default c-modal__button">{this.props.content.returnToMessage}</button></div>;
            return (<ModalComponent show
                onHide={this.stayOnPage}
                customClass={"c-modal"}
                modalheading={this.props.content.leaveMessageHeading}
                modalbody={bodyContent}
                modalfooter={footerButtons}
                modalInContainer={false}
                closeButton />);
        }
    }

    returnErrorModal() {
             let bodyContent = <div><h3>Sorry, there’s been a technical problem</h3><br />
            <p>It looks like something has gone wrong in the background. Please try again.</p><br />
            <p>If you’re still having problems, please get in touch.</p></div>;
            let footerButtons = <div><button type="button" className="c-btn c-btn--secondary c-modal__button" onClick={this.errorCloseClicked}>Back</button>
            <button type="button" onClick={this.retryServiceCall} className="c-btn c-btn--default c-modal__button">Retry</button></div>
            return (
                <ModalComponent show
                    onHide={this.errorCloseClicked}
                    customClass={"c-modal c-modal--center"}
                    bsSize={'medium'}
                    modalheading={''}
                    modalbody={bodyContent}
                    modalfooter={footerButtons}
                    modalInContainer={false}
                    closeButton />
                );
    }
    returnBackButton(backpath) {
        const { backPath } = backpath;
        if (this.state.showModalBack && this.state.disabled === false) {
            return (
                <div className="row">
                    <div className="col-md1-18">
                        <p className="c-step-header__crumbs">
                            <a onClick={this.callBackModal} className="c-step-header__link">
                                <span className="c-step-header__linkicon"><SvgIcon id="icon-left" width="16px" height="16px" /></span>
                                <span className="c-step-header__linktext">Back</span>
                            </a>
                        </p>
                        <h1 className="c-step-header__title" id="headingTag" tabIndex="-1">New message</h1>
                    </div>
                </div>
            );
        } else {
            return (<div className="row">
                <div className="col-md1-18">
                    <StepHeader showheaderCrumbs={true} onClick={() => { }} headerCrumbsMessage="Back" headerTitle="New message" headerCrumbsPath={{ pathname: backpath }} />
                </div>
            </div>);
        }
    }
    render() {
        const { messageDetail } = this.props.location.messageDetail ? this.props.location : this.props;
        return (
            <div className="container">
               {this.returnBackButton(this.props.location)}
                <div className="c-field">
                    <label id="subjectTitle" className="c-field__label c-field__label--block" htmlFor="subjects">
                    {this.props.content.subject}
                    </label>
                    <div className="c-field__controls u-position-relative">
                        <DropDownComponent accessID="Subject" subjects={this.props.location.messageDetail.subject} name='subjects' id='subjects' selectSubject={this.selectSubject} isFromDraftOrReply={true} selectedValue={this.props.location.messageDetail.subject} isFromReply={true} />
                    </div>
                </div>

                <div className="c-field">
                    <label id="relatesTitle" className="c-field__label c-field__label--block" htmlFor="subjects">
                    {this.props.content.messageRelatesTo}
                    </label>
                    <div className="c-field__controls u-position-relative">
                        <DropDownComponent accessID="Message relates to" accounts={this.props.location.messageDetail.account.accountNumber} selectSubject={this.selectSubject} name='accounts' id='accounts' isFromDraftOrReply={true} selectedValue={this.checkAccountValue()} isFromReply={true} />
                    </div>
                </div>


                <div className="c-field">
                    <label id="messageTitle" className="c-field__label c-field__label--block" htmlFor="subjects">
                    {this.props.content.message}
                    </label>
                    <div className="c-field__controls">
                    <div className="u-visually-hidden off-screen" id="textAreaMaxMsg">{this.props.content.maxCharLimit}</div>
                        <TextAreaComponent textData={this.textChange} ariaId="textAreaMaxMsg" id="message" accessID="messageTitle"/>
                    </div>
                    {this.renderRemainingChar()}
                </div>
                <div className="c-btn--group">
                <button name='Back' className="c-btn c-btn--secondary" onClick={this.callBackModal}>{this.props.content.back}</button>
                    <button name='Save Draft' className="c-btn c-btn--secondary" onClick={this.saveDraftData} disabled={this.state.disabled}>{this.props.content.saveDraft}</button>
                    <button name='Send' className="c-btn c-btn--default" onClick={this.sendData} disabled={this.state.disabled}>{this.props.content.send}</button>
                </div>
                {this.state.showPopup && this.returnModalComponent()}
                 { this.state.showSentMessageModal && this.props.messages.successModal? this.returnSentMessageModal() : ''} 
                 {this.state.showDraftSuccessModal && this.props.messages.successModal && this.returnDraftModal()}
                 {this.props.messages.draftError && this.state.showSaveServiceErrorModal && this.returnErrorModal()}
                 {this.props.messages.draftError && this.state.showSendServiceErrorModal && this.returnErrorModal()}
                <div className="row">
                    <div className="col-md1-18">
                        {this.getThreads(this.props.messages.messages, messageDetail)}
                    </div>
                </div>
                
            </div>
        );
    }
};
const mapState = (state) => {
    return {
        subjects: state.subjects,
        messages: state.messages,
        accounts: state.accounts,
    }
};
export default connect(mapState)(ReplySecureMessage);