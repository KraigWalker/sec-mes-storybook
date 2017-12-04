import React from 'react';
import { getMessageSubjects, getAccounts, sendMessageData } from '../actions/AppActions';
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
class DraftSecureMessage extends React.Component{
    constructor(props) {
        super(props);
        this.renderRemainingChar = this.renderRemainingChar.bind(this);
        this.selectSubject = this.selectSubject.bind(this);
        this.textChange = this.textChange.bind(this);
        this.sendData = this.sendData.bind(this);
        this.state = {
            chars_left: 43,
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
        if (this.state.chars_left <= 3) {
            return <p>Characters Left: {this.state.chars_left}</p>;
        } else return '';
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
    }
    render() {
        console.log('messageDetail:',this.props.location.messageDetail);
        return (<div className="container">
        <div className="row">
            <div className="col-md1-18">
                <StepHeader showheaderCrumbs={true} onClick={() => { }} headerCrumbsMessage="Back" headerTitle="Draft message" headerCrumbsPath={{ pathname: '/securemessage' }} />
            </div>
        </div>
        {/*<Link to='/securemessages'> Back To Homepage</Link><br />*/}

        <div className="c-field">
            <label className="c-field__label c-field__label--block" htmlFor="subjects">
                Subject
            </label>
            <div className="c-field__controls">
                <DropDownComponent subjects={this.props.location.messageDetail.subject} name='subjects' id='subjects' selectSubject={this.selectSubject} isFromDraftOrReply = {true} selectedValue = {this.props.location.messageDetail.subject}/>
            </div>
        </div>

        <div className="c-field">
            <label className="c-field__label c-field__label--block" htmlFor="subjects">
                Message relates to
            </label>
            <div className="c-field__controls">
                <DropDownComponent accounts={this.props.location.messageDetail.account.accountNumber} selectSubject={this.selectSubject} name='accounts' id='accounts' isFromDraftOrReply = {true} selectedValue = {this.props.location.messageDetail.account.accountNumber}/>
            </div>
        </div>


        <div className="c-field">
            <label className="c-field__label c-field__label--block" htmlFor="subjects">
                Message
            </label>
            <div className="c-field__controls">
                <TextAreaComponent textData={this.textChange} draftData = {this.props.location.messageDetail.messageBody} isFromDraftOrReply = {true}/>
            </div>
            {this.renderRemainingChar()}
        </div>

        {this.state.showPopup ? this.returnModalComponent() : ''}
        <Link to='/securemessages'>
            <input type='button' name='cancel' value='Back' className="c-btn c-btn--secondary" />
        </Link>&nbsp;

        <button name='Save Draft' className="c-btn c-btn--secondary">Save Draft</button>&nbsp;
        <button name='Send' className="c-btn c-btn--default" onClick={this.sendData}>Send</button>
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