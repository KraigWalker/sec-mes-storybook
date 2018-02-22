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
        };
    };
    componentWillMount() {
        const { dispatch, subjects } = this.props;
        !subjects.fetched && dispatch(getMessageSubjects());
    }
    componentDidMount() {
        this.props.dispatch(setNavRef('/newsecuremessage'));
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
            messageEntity.setStatus('SENT');
            this.props.dispatch(sendMessageData(messageEntity.getMessageRequestData()));
            this.setState({ showSentMessageModal: true });
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
    leavePage() {
        this.setState({ showPopup: true });
    }
    stayOnPage() {
        this.setState({ showPopup: false });
    }
    returnModalComponent() {
        let bodyContent = <div className="callout callout__error">{this.props.content.leaveMessageBody}</div>;
        let footerButtons = <div><Link to= {`${window.baseURl}/securemessages`}><button type="button" onClick={this.leavePage} className="c-btn c-btn--secondary c-modal__button">Leave page</button></Link>&nbsp;
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
    returnDraftModal() {
        let bodyContent = <div><div><GetIcon id="icon-success" width="68px" height="68px" /></div>Message saved as a draft</div>;
        let footerButtons = <div><Link to = {`${window.baseURl}/securemessages`} onClick={this.draftOkClicked} className="c-btn c-btn--default c-btn--sm c-modal__button">Ok</Link></div>;
        return (<ModalComponent show
            onHide={this.draftOkClicked}
            customClass={"c-modal c-modal--center"}
            bsSize={'small'}
            modalheading={''}
            modalbody={bodyContent}
            modalfooter={footerButtons}
            modalInContainer={false}
            closeButton />);
    }
    draftOkClicked() {
        this.setState({ showDraftSuccessModal: false });
    }
    saveDraftData() {
        messageEntity.setStatus('DRAFT');
        this.props.dispatch(sendMessageData(messageEntity.getMessageRequestData()));
        if(this.props.messages.successModal) {
            this.setState({ showDraftSuccessModal: true });
        this.setState({ showPopup: false });
        }
    }
    sentOkClicked() {
        this.setState({ showSentMessageModal: false });
    }
    returnSentMessageModal() {
        let bodyContent = <div><div><GetIcon id="icon-success" width="68px" height="68px" /></div>Message sent</div>;
        let footerButtons = <div><Link to={`${window.baseURl}/securemessages`} onClick={this.sentOkClicked} className="c-btn c-btn--default c-btn--sm c-modal__button">Ok</Link></div>;
        return (<ModalComponent show
            onHide={this.sentOkClicked}
            customClass={"c-modal c-modal--center"}
            bsSize={'small'}
            modalheading={''}
            modalbody={bodyContent}
            modalfooter={footerButtons}
            modalInContainer={false}
            closeButton />);
    }
    checkError() {
        const { tempData, dispatch } = this.props;
        if (this.props.messages.error && this.props.messages.fetched) {
            this.props.history.push("/errormessage");
            page = <div></div>;
        } else {
            page = <div className="container">
                <div className="row">
                    <div className="col-md1-18" onClick = { () => { !isEmpty(this.props.tempData) && dispatch(clearTempData());}}>
                        <StepHeader showheaderCrumbs={true} onClick={() => { }} headerCrumbsMessage="Back" headerTitle="New message" headerCrumbsPath={{ pathname: `${window.baseURl}/securemessage` }} />
                    </div>
                </div>
                {/*<Link to='/securemessages'> Back To Homepage</Link><br />*/}

                <div className="c-field">
                    <label id="subjectTitle" className="c-field__label c-field__label--block" htmlFor="subjects">
                        {this.props.content.subject}
                    </label>
                    <div className="c-field__controls u-position-relative">
                        <DropDownComponent accessID="Subject" subjects={this.props.subjects} selectSubject={this.selectSubject} showSubjectError={this.state.validationSubjectMsg} name='subjects' id='subjects' isFromDraft={false} selectedValue={ isEmpty(tempData) ? 'Please Select' : tempData.subject } />
                    </div>
                </div>

                <div className="c-field">
                    <label id="relatesTitle" className="c-field__label c-field__label--block" htmlFor="accounts">
                        {this.props.content.messageRelatesTo}
                    </label>
                    <div className="c-field__controls u-position-relative">
                        <DropDownComponent accessID="Message relates to" accounts={this.props.accounts} selectSubject={this.selectSubject} showAccountError={this.state.validationAccountMsg} name='accounts' id='accounts' isFromDraft={false} selectedValue='Please select' />
                    </div>
                </div>


                <div className="c-field">
                    <label id="messageTitle" className="c-field__label c-field__label--block" htmlFor="message">
                        {this.props.content.message}
                    </label>
                    <div className="c-field__controls">
                        <div className="u-visually-hidden off-screen" id="textAreaMaxMsg">{this.props.content.maxCharLimit}</div>
                        <TextAreaComponent textData={this.textChange} ariaId="textAreaMaxMsg" accessID="messageTitle" id="message" draftData = { !isEmpty(tempData) && tempData.message} />
                    </div>
                    {this.renderRemainingChar()}
                </div>

            {this.state.showPopup && this.returnModalComponent()}
            {this.state.showDraftSuccessModal && this.returnDraftModal()}
            {this.state.showSentMessageModal && this.returnSentMessageModal()}
            <div className="c-btn--group">
                <Link to={`${window.baseURl}/securemessages`} className="c-btn c-btn--secondary">
                    Back
                </Link>
                    <button name='Save Draft' className="c-btn c-btn--secondary" onClick={this.saveDraftData} disabled={this.state.disabled}>{this.props.content.saveDraft}</button>
                    <button name='Send' className="c-btn c-btn--default" onClick={this.sendData} disabled={this.state.disabled}>{this.props.content.send}</button>
                    <button name='LeavePage' className="c-btn c-btn--default" onClick={this.leavePage}>LeavePage</button>
                </div>
            </div>
        }
        return page;
    }
    render() {
        return (this.checkError());
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