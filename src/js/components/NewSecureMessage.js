import React from 'react';
import { getMessageSubjects, getAccounts, sendMessageData, sendDraftMessageData, sendMessageForAccessibiltiy, setNavRef, clearTempData } from '../actions/AppActions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Dropdown, ButtonToolbar, MenuItem } from 'react-bootstrap/lib';
import { isEmpty } from 'lodash';
import DropDownComponent from './common/DropDownComponent.js';
import TextAreaComponent from './common/TextAreaComponent.js';
import StepHeader from './common/StepHeader';
import SendMessageRequestEntity from '../entities/SendMessageRequestEntity.js'
import ModalComponent from './common/ModalComponent';
import GetIcon from './common/GetIcon';
import RegexUtils from '../utils/RegexUtils.js';
import CalloutComponent from './common/CalloutComponent.js';
import SvgIcon from './common/GetIcon.js';
import StringsConstants from '../constants/StringsConstants.js';
let page;
let messageEntity = new SendMessageRequestEntity();
class NewSecureMessage extends React.Component {
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
    };
    componentWillMount() {
    }
    componentDidMount() {
        this.props.dispatch(setNavRef('/newsecuremessage'));
        window.top.postMessage('newMessagePage','*');
        window.scrollTo(0,0);
    }

    componentWillUnmount() {
        window.top.postMessage('clearNewMessagePage','*');
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
        }
    }
    textChange(e) {

        if (e === '') {
            this.setState({ disabled: true })
        } else {
            this.setState({ disabled: false })
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
        this.setState({
            showModalBack: true
        });
    }
    checkValidation() {
        if (this.state.selectAccount === true) {
            this.setState({
                validationAccountMsg: false,
            });
        } else {
            this.setState({
                validationAccountMsg: true,
            });
        }

        if (this.state.selectSubject === true) {
            this.setState({
                validationSubjectMsg: false,
            });
        } else {
            this.setState({
                validationSubjectMsg: true,
            });
        }

        if (this.state.selectSubject === true && this.state.selectAccount === true) {
            return true;
        } else {
            return false;
        }
    }
    sendData() {
        this.setState({ charError: true });
        this.renderRemainingChar();
        if (this.checkValidation() && this.state.chars_left >= 0) {
            this.props.dispatch(sendMessageData(messageEntity.getMessageRequestData(), StringsConstants.PENDING));
            this.setState({ showSentMessageModal: true });
            this.setState({ showSendServiceErrorModal: true });
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
            let headerflagClass = '';
            if(this.state.chars_left <= 0) {
            headerflagClass = "char__error";
            }
            return <p className={`${headerflagClass}`}>Characters Left: {this.state.chars_left}</p>;
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
        if (this.state.showPopup) {
            let bodyContent = <div className="callout callout__error">{this.props.content.leaveMessageBody}</div>;
            let footerButtons = <div><Link to={`${window.baseURl}/securemessages`}><button type="button" onClick={this.leavePage} className="c-btn c-btn--secondary c-modal__button">{this.props.content.leavePage}</button></Link>&nbsp;
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
    returnDraftModal() {
        let bodyContent = <div><div><GetIcon id="icon-success" width="68px" height="68px" /></div>{this.props.content.draftBody}</div>;
        let footerButtons = <div><Link to={`${window.baseURl}/securemessages`} onClick={this.draftOkClicked} className="c-btn c-btn--default c-btn--sm c-modal__button">{this.props.content.ok}</Link></div>;
        return (<ModalComponent show
            customClass={"c-modal c-modal--center"}
            bsSize={'small'}
            modalheading={''}
            modalbody={bodyContent}
            modalfooter={footerButtons}
            modalInContainer={false}
            closeButton = {false}/>);
    }
    draftOkClicked() {
        this.setState({ showDraftSuccessModal: false });
    }

    saveDraftData() {
        if (this.checkValidation() && this.state.chars_left >= 0) {
            this.props.dispatch(sendMessageData(messageEntity.getMessageRequestData(), StringsConstants.DRAFT));
            this.setState({ showDraftSuccessModal: true });
            this.setState({ showPopup: false });
            this.setState({ showSaveServiceErrorModal: true });
        }
    }
    sentOkClicked() {
        this.setState({ showSentMessageModal: false });
    }
    returnSentMessageModal() {
        let bodyContent = <div><div><GetIcon id="icon-success" width="68px" height="68px" /></div>{this.props.content.messageSent}</div>;
        let footerButtons = <div><Link to={`${window.baseURl}/securemessages`} onClick={this.sentOkClicked} className="c-btn c-btn--default c-btn--sm c-modal__button">{this.props.content.ok}</Link></div>;
        return (<ModalComponent show
            customClass={"c-modal c-modal--center"}
            bsSize={'small'}
            modalheading={''}
            modalbody={bodyContent}
            modalfooter={footerButtons}
            modalInContainer={false}
            closeButton = {false} />);
    }
    errorCloseClicked() {
        this.setState({ showSaveServiceErrorModal: false });
        this.setState({ showSendServiceErrorModal: false });
    }
    retryServiceCall() {
        if (this.state.showSaveServiceErrorModal) {
            this.props.dispatch(sendMessageData(messageEntity.getMessageRequestData(), StringsConstants.DRAFT))
        }
        if (this.state.showSendServiceErrorModal) {
            this.props.dispatch(sendMessageData(messageEntity.getMessageRequestData(), StringsConstants.PENDING));
        }

    }
    returnErrorModal() {
        let bodyContent = <div><h3>{this.props.content.sorryHeader}</h3><br />
            <p>{this.props.content.tryAgain}</p><br />
            <p>{this.props.content.getInTouch}</p></div>;
        let footerButtons = <div><button type="button" className="c-btn c-btn--secondary c-modal__button" onClick={this.errorCloseClicked}>Back</button>
            <button type="button" onClick={this.retryServiceCall} className="c-btn c-btn--default c-modal__button">{this.props.content.retry}</button></div>
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
    returnBackButton() {
        if (this.state.showModalBack && this.state.disabled === false) {
            return (
                <div className="row">
                    <div className="col-md1-18">
                        <p className="c-step-header__crumbs">
                            <a onClick={this.callBackModal} className="c-step-header__link u-cursor-pointer">
                                <span className="c-step-header__linkicon"><SvgIcon id="icon-left" width="16px" height="16px" /></span>
                                <span className="c-step-header__linktext">{this.props.content.back}</span>
                            </a>
                        </p>
                        <h1 className="c-step-header__title" id="headingTag" tabIndex="-1">{this.props.content.newMessagePageTitle}</h1>
                    </div>
                </div>
            );
        } else {
            return (<div className="row">
                <div className="col-md1-18">
                    <StepHeader showheaderCrumbs={true} onClick={() => { }} headerCrumbsMessage="Back" headerTitle="New message" headerCrumbsPath={{ pathname: `${window.baseURl}/securemessage` }} />
                </div>
            </div>);
        }
    }
    render() {
        return (<div className="container">
            {this.returnBackButton()}
            {/*<Link to='/securemessages'> Back To Homepage</Link><br />*/}
            <div className="c-field">
                <label id="subjectTitle" className="c-field__label c-field__label--block" htmlFor="subjects">
                    {this.props.content.subject}
                </label>
                <div className="c-field__controls u-position-relative">
                    <DropDownComponent accessID="Subject" subjects={this.props.subjects} content={this.props.content} selectSubject={this.selectSubject} showSubjectError={this.state.validationSubjectMsg} name='subjects' id='subjects' isFromDraft={false} selectedValue='Please select' />
                </div>
            </div>

            <div className="c-field">
                <label id="relatesTitle" className="c-field__label c-field__label--block" htmlFor="accounts">
                    {this.props.content.messageRelatesTo}
                </label>
                <div className="c-field__controls u-position-relative">
                    <DropDownComponent accessID="Message relates to" accounts={this.props.accounts} content={this.props.content} selectSubject={this.selectSubject} showAccountError={this.state.validationAccountMsg} name='accounts' id='accounts' isFromDraft={false} selectedValue='Please select' />
                </div>
            </div>


            <div className="c-field">
                <label id="messageTitle" className="c-field__label c-field__label--block" htmlFor="message">
                    {this.props.content.message}
                </label>
                <div className="c-field__controls">
                    <div className="u-visually-hidden off-screen" id="textAreaMaxMsg">{this.props.content.maxCharLimit}</div>
                    <TextAreaComponent textData={this.textChange} ariaId="textAreaMaxMsg" accessID="messageTitle" id="message" />
                </div>
                {this.renderRemainingChar()}
            </div>

            {this.state.showPopup && this.returnModalComponent()}
            {this.state.showDraftSuccessModal && this.props.messages.successModal && this.returnDraftModal()}
            {this.state.showSentMessageModal && this.props.messages.successModal && this.returnSentMessageModal()}
            {this.props.messages.newMessageError && this.state.showSaveServiceErrorModal && this.returnErrorModal()}
            {this.props.messages.newMessageError && this.state.showSendServiceErrorModal && this.returnErrorModal()}
            <div className="c-btn--group">
                {!this.state.disabled ? <button name='Back' className="c-btn c-btn--secondary" onClick={this.callBackModal}>{this.props.content.back}</button> :
                    <Link to={`${window.baseURl}/securemessages`} className="c-btn c-btn--secondary">{this.props.content.back} </Link>}
                <button name='Save Draft' className="c-btn c-btn--secondary" onClick={this.saveDraftData} disabled={this.state.disabled}>{this.props.content.saveDraft}</button>
                <button name='Send' className="c-btn c-btn--default" onClick={this.sendData} disabled={this.state.disabled}>{this.props.content.send}</button>
            </div>
        </div>);
    }
}
/**
 * Maps the state of the component to the state of the redux store
 * @param {object} state. State of the application
 */
const mapState = (state) => {
    return {
        subjects: state.subjects,
        messages: state.messages,
        accounts: state.accounts,
        tempData: state.messages.tempData,
    }
};
export default connect(mapState)(NewSecureMessage);