import React from 'react';
import { getMessageSubjects, getAccounts, sendMessageData, updateMessageData } from '../actions/AppActions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Dropdown, ButtonToolbar, MenuItem } from 'react-bootstrap/lib';
import _ from 'lodash';
import DropDownComponent from './common/DropDownComponent.js';
import TextAreaComponent from './common/TextAreaComponent.js';
import StepHeader from './common/StepHeader';
import SendMessageRequestEntity from '../entities/SendMessageRequestEntity.js';
import ModalComponent from './common/ModalComponent';
import RegexUtils from '../utils/RegexUtils.js';
let messageEntity = new SendMessageRequestEntity();
class DraftSecureMessage extends React.Component{
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
        this.state = {
            chars_left: 3000,
            showPopup: false,
        };
    };
    selectSubject(value,id) {
        if (id === 'accounts') {
            messageEntity.setAccount(value);
        }
        if (id === 'subjects') {
            messageEntity.setSubject(value);
        }
    }
    renderRemainingChar() {
        if (this.state.chars_left <= 300) {
            return <p>{this.props.content.charLeft} {this.state.chars_left}</p>;
        } else return '';
    }
    textChange(e) {
        this.setState({ chars_left: 3000 - e.length });
        let extractedString = RegexUtils.matchString(e);
        if (extractedString !== null) {
            let lastFour = RegexUtils.getLastFourDigits(extractedString);
            messageEntity.setMessage(e.replace(new RegExp(extractedString, 'g'), '************' + lastFour));
        } else messageEntity.setMessage(e);
    }
      
    sendData() {
        this.props.dispatch(updateMessageData(messageEntity.getMessageRequestData(), this.props.location.messageDetail.id, "PENDING"));
        this.setState({showPopup : true});
    }
    returnModalComponent() {
        let bodyContent = <div className="">{this.props.content.messageSent}</div>;
        let footerButtons = <button type="button" onClick={this.sentOkClicked} className="c-btn c-btn--default c-modal__button">{this.props.content.ok}</button>;
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
        let bodyContent = <div className="">{this.props.content.draftBody}</div>;
        let footerButtons = <button type="button" onClick={this.draftOkClicked} className="c-btn c-btn--default c-modal__button">{this.props.content.ok}</button>;
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
        this.props.dispatch(updateMessageData(messageEntity.getMessageRequestData(), this.props.location.messageDetail.id, "DRAFT"));
        this.setState({showDraftSuccessModal : true});
    }
    draftOkClicked(){
        this.setState({showDraftSuccessModal : false});
    }
    checkAccountValue() {
        let accVal = '';
        if(this.props.location.messageDetail.account.accountNumber === undefined) {
            accVal = 'No specific account';
        } else {
            accVal = this.props.location.messageDetail.account.accountNumber;
        }
        return accVal;
    }
    render() {
        console.log('messageDetail:',this.props.location.messageDetail);
        {this.props.location.messageDetail.account.accountNumber === undefined ? 'No specific account' : this.props.location.messageDetail.account.accountNumber}
        return (<div className="container">
        <div className="row">
            <div className="col-md1-18">
                <StepHeader showheaderCrumbs={true} onClick={() => { }} headerCrumbsMessage="Back" headerTitle="Draft message" headerCrumbsPath={{ pathname: '/securemessage' }} />
            </div>
        </div>
        {/*<Link to='/securemessages'> Back To Homepage</Link><br />*/}

        <div className="c-field">
            <label className="c-field__label c-field__label--block" htmlFor="subjects">
                {this.props.content.subject}
            </label>
            <div className="c-field__controls u-position-relative">
                <DropDownComponent subjects={this.props.location.messageDetail.subject} name='subjects' id='subjects' selectSubject={this.selectSubject} isFromDraftOrReply = {true} selectedValue = {this.props.location.messageDetail.subject}/>
            </div>
        </div>

        <div className="c-field">
            <label className="c-field__label c-field__label--block" htmlFor="subjects">
               {this.props.content.messageRelatesTo}
            </label>
            <div className="c-field__controls u-position-relative">
                <DropDownComponent accounts={this.props.location.messageDetail.account.accountNumber} selectSubject={this.selectSubject} name='accounts' id='accounts' isFromDraftOrReply = {true} selectedValue = {this.checkAccountValue()}/>
            </div>
        </div>


        <div className="c-field">
            <label className="c-field__label c-field__label--block" htmlFor="subjects">
                {this.props.content.message}
            </label>
            <div className="c-field__controls">
                <TextAreaComponent textData={this.textChange} draftData = {this.props.location.messageDetail.message} isFromDraftOrReply = {true}/>
            </div>
            {this.renderRemainingChar()}
        </div>

        {this.state.showPopup ? this.returnModalComponent() : ''}
        {this.state.showDraftSuccessModal && this.returnDraftModal()}
        <div className="c-btn--group">
            <Link to='/securemessages' className="c-btn c-btn--secondary">
                {this.props.content.back}
            </Link>
            <button name='Save Draft' className="c-btn c-btn--secondary" onClick = {this.saveDraftData}>{this.props.content.saveDraft}</button>
            <button name='Send' className="c-btn c-btn--default" onClick={this.sendData}>{this.props.content.send}</button>
        </div>
    </div>);
    }
}
//export default DraftSecureMessage;
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
export default connect(mapState)(DraftSecureMessage);