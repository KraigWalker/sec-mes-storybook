import React from 'react';
import { getMessageSubjects, getAccounts, sendMessageData,sendDraftMessageData } from '../actions/AppActions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Dropdown, ButtonToolbar, MenuItem } from 'react-bootstrap/lib';
import _ from 'lodash';
import DropDownComponent from './common/DropDownComponent.js';
import TextAreaComponent from './common/TextAreaComponent.js';
import StepHeader from './common/StepHeader';
import SendMessageRequestEntity from '../entities/SendMessageRequestEntity.js'
import ModalComponent from './common/ModalComponent';
import RegexUtils from '../utils/RegexUtils.js';
let messageEntity = new SendMessageRequestEntity();
class NewSecureMessage extends React.Component {
    constructor(props) {
        super(props);
        this.selectSubject = this.selectSubject.bind(this);
        this.sendData = this.sendData.bind(this);
        this.textChange = this.textChange.bind(this);
        this.checkPastedData = this.checkPastedData.bind(this);
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
            chars_left: 43,
            showPopup: false,
            showDraftSuccessModal:false,
            showSentMessageModal:false,
        };
    };
    componentWillMount() {
        if (!this.props.subjects.fetched && !this.props.accounts.fetched) {
            this.props.dispatch(getMessageSubjects());
            this.props.dispatch(getAccounts());
        }

    }
    selectSubject(value,id) {
        if (id === 'accounts') {
            messageEntity.setAccount(value);
        }
        if (id === 'subjects') {
            messageEntity.setSubject(value);
        }
    }
    textChange(e) {
        this.setState({ chars_left: 43 - e.length });
        let extractedString = RegexUtils.matchString(e);
        if (extractedString !== null) {
            let lastFour = RegexUtils.getLastFourDigits(extractedString);
            messageEntity.setMessage(e.replace(new RegExp(extractedString, 'g'), '************' + lastFour));
        } else messageEntity.setMessage(e);


    }
    sendData() {
        this.props.dispatch(sendMessageData(messageEntity.getMessageRequestData()));
        this.setState({showSentMessageModal : true})
    }
    checkPastedData(data) {
        //  console.log(RegexUtils.isValidPastedData(data));
    }
    renderRemainingChar() {
        if (this.state.chars_left <= 3) {
            return <p>Characters Left: {this.state.chars_left}</p>;
        } else return '';
    }
    leavePage() {
        console.log('LEAVE PAGE');
        this.setState({ showPopup: true });
    }
    stayOnPage() {
        this.setState({ showPopup: false });
    }
    returnModalComponent() {
        let bodyContent = <div className="callout callout__error">If you leave the message now it won’t be saved.</div>;
        let footerButtons = <div><Link to='/securemessages'><button type="button" onClick={this.leavePage} className="c-btn c-btn--secondary c-modal__button">Leave page</button></Link>&nbsp;
            <button type="button" onClick={this.stayOnPage} className="c-btn c-btn--default c-modal__button">Return to message</button></div>;
        return (<ModalComponent show
            onHide={this.stayOnPage}
            customClass={"c-modal"}
            bsSize='medium'
            modalheading={'Your message hasn’t been sent yet'}
            modalbody={bodyContent}
            modalfooter={footerButtons}
            modalInContainer={false}
            closeButton />);
    }
    returnDraftModal(){
        let bodyContent = <div className="">Message saved as a draft</div>;
    let footerButtons = <button type="button" onClick={this.draftOkClicked} className="c-btn c-btn--default c-modal__button">Ok</button>;
    return (<ModalComponent show
        onHide={this.draftOkClicked}
        customClass={"c-modal"}
        bsSize={'medium'}
        modalheading={''}
        modalbody={bodyContent}
        modalfooter={footerButtons}
        modalInContainer={false}
        closeButton/>);
    }
    draftOkClicked(){
        this.setState({showDraftSuccessModal :false});
    }
    saveDraftData(){
        this.props.dispatch(sendDraftMessageData(messageEntity.getMessageRequestData()));
        this.setState({showDraftSuccessModal : true});

    }
    sentOkClicked(){
        this.setState({showSentMessageModal : false});
    }
    returnSentMessageModal(){
        let bodyContent = <div className="">Message sent</div>;
    let footerButtons = <button type="button" onClick={this.sentOkClicked} className="c-btn c-btn--default c-modal__button">Ok</button>;
    return (<ModalComponent show
        onHide={this.sentOkClicked}
        customClass={"c-modal"}
        bsSize={'medium'}
        modalheading={''}
        modalbody={bodyContent}
        modalfooter={footerButtons}
        modalInContainer={false}
        closeButton/>);
    }
    render() {
        return (<div className="container">
            <div className="row">
                <div className="col-md1-18">
                    <StepHeader showheaderCrumbs={true} onClick={() => { }} headerCrumbsMessage="Back" headerTitle="New message" headerCrumbsPath={{ pathname: '/securemessage' }} />
                </div>
            </div>
            {/*<Link to='/securemessages'> Back To Homepage</Link><br />*/}

            <div className="c-field">
                <label className="c-field__label c-field__label--block" htmlFor="subjects">
                    Subject
                </label>
                <div className="c-field__controls u-position-relative">
                    <DropDownComponent subjects={this.props.subjects} selectSubject={this.selectSubject} name='subjects' id='subjects' isFromDraft ={false} selectedValue = 'Please select'/>
                </div>
            </div>

            <div className="c-field">
                <label className="c-field__label c-field__label--block" htmlFor="subjects">
                    Message relates to
                </label>
                <div className="c-field__controls u-position-relative">
                    <DropDownComponent accounts={this.props.accounts} selectSubject={this.selectSubject} name='accounts' id='accounts' isFromDraft ={false} selectedValue = 'Please select'/>
                </div>
            </div>


            <div className="c-field">
                <label className="c-field__label c-field__label--block" htmlFor="subjects">
                    Message
                </label>
                <div className="c-field__controls">
                    <TextAreaComponent textData={this.textChange} />
                </div>
                {this.renderRemainingChar()}
            </div>

            {this.state.showPopup && this.returnModalComponent()}
            {this.state.showDraftSuccessModal && this.returnDraftModal()}
            {this.state.showSentMessageModal && this.returnSentMessageModal()}
            <div className="c-btn--group">
                <Link to='/securemessages' className="c-btn c-btn--secondary">
                    Back
                </Link>
                <button name='Save Draft' className="c-btn c-btn--secondary" onClick={this.saveDraftData}>Save Draft</button>
                <button name='Send' className="c-btn c-btn--default" onClick={this.sendData}>Send</button>
                <button name='LeavePage' className="c-btn c-btn--default" onClick={this.leavePage}>LeavePage</button>
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
    }
};
export default connect(mapState)(NewSecureMessage);