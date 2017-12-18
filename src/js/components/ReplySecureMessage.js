
import React from 'react';
import SecureMessageSummary from './common/SecureMessageSummary';
import StepHeader from './common/StepHeader';
import TextAreaComponent from './common/TextAreaComponent';
import DropDownComponent from './common/DropDownComponent'
import { Link } from 'react-router-dom';
import RegexUtils from '../utils/RegexUtils.js';
import SendMessageRequestEntity from '../entities/SendMessageRequestEntity.js'
import { connect } from 'react-redux';
import { getMessageSubjects, getAccounts, sendMessageData, sendMessageForAccessibiltiy } from '../actions/AppActions';
let messageEntity = new SendMessageRequestEntity();
import { getThreadsBL } from '../bl/SecureMessageBL';
import Threads from './common/ThreadList';
import ModalComponent from './common/ModalComponent';
class ReplySecureMessage extends React.Component {
    constructor(props) {
        super(props);
        this.textChange = this.textChange.bind(this);
        this.selectSubject = this.selectSubject.bind(this);
        this.sendData = this.sendData.bind(this);
        this.getThreads = this.getThreads.bind(this);
        this.returnModalComponent = this.returnModalComponent.bind(this);
        this.sentOkClicked = this.sentOkClicked.bind(this);
        this.returnDraftModal = this.returnDraftModal.bind(this);
        this.draftOkClicked = this.draftOkClicked.bind(this);
        this.saveDraftData = this.saveDraftData.bind(this);
        this.state = {
            chars_left: 43,
            showPopup: false,
            showDraftSuccessModal:false,
        };
    }
    selectSubject(value, id) {
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
    renderRemainingChar() {
        if (this.state.chars_left <= 3) {
            if(this.state.chars_left === 3)   this.props.dispatch(sendMessageForAccessibiltiy('Three characters left'));
            if(this.state.chars_left === 1)   this.props.dispatch(sendMessageForAccessibiltiy('One character left'));
            if(this.state.chars_left === 0)   this.props.dispatch(sendMessageForAccessibiltiy('Maximum characters limit reached'));
            return <p>Characters Left: {this.state.chars_left}</p>;
        } else return '';
    }
    sendData() {
        this.props.dispatch(sendMessageData(messageEntity.getMessageRequestData()));
        this.setState({showPopup : true});
    }
    getThreads(messages, currentMessage) {
        const threads = getThreadsBL(messages, currentMessage);
        return <Threads Threads={threads} currentMessage={currentMessage} isFromReplyMessage={true} />
    }
    returnModalComponent() {
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
    sentOkClicked(){
        this.setState({showPopup : false});
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
    saveDraftData(){
        this.setState({showDraftSuccessModal : true});
    }
    draftOkClicked(){
        this.setState({showDraftSuccessModal : false});
    }
    render() {
        const { backPath } = this.props.location;
        const { messageDetail } = this.props.location.messageDetail ? this.props.location : this.props;
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md1-18">
                        <StepHeader showheaderCrumbs={true} onClick={() => { }} headerCrumbsMessage="Back" headerTitle="Reply" headerCrumbsPath={{ pathname: backPath }} />
                    </div>
                </div>

                <div className="c-field">
                    <label id="subjectTitle" className="c-field__label c-field__label--block" htmlFor="subjects">
                        Subject
                    </label>
                    <div className="c-field__controls">
                        <DropDownComponent accessID="Subject" subjects={this.props.location.messageDetail.subject} name='subjects' id='subjects' selectSubject={this.selectSubject} isFromDraftOrReply={true} selectedValue={this.props.location.messageDetail.subject} isFromReply={true} />
                    </div>
                </div>

                <div className="c-field">
                    <label id="relatesTitle" className="c-field__label c-field__label--block" htmlFor="subjects">
                        Message relates to
                    </label>
                    <div className="c-field__controls">
                        <DropDownComponent accessID="Message relates to" accounts={this.props.location.messageDetail.account.accountNumber} selectSubject={this.selectSubject} name='accounts' id='accounts' isFromDraftOrReply={true} selectedValue={this.props.location.messageDetail.account.accountNumber} isFromReply={true} />
                    </div>
                </div>


                <div className="c-field">
                    <label id="messageTitle" className="c-field__label c-field__label--block" htmlFor="subjects">
                        Message
                    </label>
                    <div className="c-field__controls">
                    <div className="u-visually-hidden off-screen" id="textAreaMaxMsg">Maximum character limit is three thousand</div>
                        <TextAreaComponent textData={this.textChange} ariaId="textAreaMaxMsg" id="message" accessID="messageTitle"/>
                    </div>
                    {this.renderRemainingChar()}
                </div>
                <div className="c-btn--group">
                    <Link to='/securemessages'>
                        <input type='button' name='cancel' value='Back' className="c-btn c-btn--secondary" />
                    </Link>
                    <button name='Save Draft' className="c-btn c-btn--secondary" onClick={this.saveDraftData}>Save Draft</button>
                    <button name='Send' className="c-btn c-btn--default" onClick={this.sendData}>Send</button>
                </div>
                 { this.state.showPopup ? this.returnModalComponent() : ''} 
                 {this.state.showDraftSuccessModal && this.returnDraftModal()}

                <div className="row">
                    <div className="col-md1-18">
                        {this.getThreads(this.props.messages, messageDetail)}
                    </div>
                </div>
                
            </div>
        );
    }
};
const mapState = (state) => {
    return {
        subjects: state.subjects,
        messages: state.messages.messages,
        accounts: state.accounts,
    }
};
export default connect(mapState)(ReplySecureMessage);