import React from 'react';
import { getMessageSubjects, getAccounts, sendMessageData, updateMessageData, setNavRef } from '../actions/AppActions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Dropdown, ButtonToolbar, MenuItem } from 'react-bootstrap/lib';
import _ from 'lodash';
import DropDownComponent from './common/DropDownComponent.js';
import TextAreaComponent from './common/TextAreaComponent.js';
import StepHeader from './common/StepHeader';
import SendMessageRequestEntity from '../entities/SendMessageRequestEntity.js';
import ModalComponent from './common/ModalComponent';
import GetIcon from './common/GetIcon';
import RegexUtils from '../utils/RegexUtils.js';
import {getAccountName} from '../bl/SecureMessageBL';

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
    componentWillMount() {
        if(this.props.location.messageDetail.account.accountID !== undefined && this.props.location.messageDetail.subject) {
            this.props.location.messageDetail.account['name'] = getAccountName(this.props.location.messageDetail.account.accountID, this.props.accounts)['name'];
            messageEntity.setName(getAccountName(this.props.location.messageDetail.account.accountID, this.props.accounts)['name']);
            messageEntity.setAccount(this.props.location.messageDetail.account);
            messageEntity.setUpdateSubject(this.props.location.messageDetail.subject);
        } else {
            messageEntity.setAccount(this.props.location.messageDetail.account);
            messageEntity.setUpdateSubject(this.props.location.messageDetail.subject);
        }

    }
    componentDidMount() {
        this.props.dispatch(setNavRef('/draftsecuremessage'));
    }
    selectSubject(value, id, data) {
        if (id === 'accounts') {
            messageEntity.setAccount(data);
        }
        if (id === 'subjects') {
            messageEntity.setSubject(data);
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
        let bodyContent = <div><div><GetIcon id="icon-success" width="68px" height="68px" /></div>Message sent</div>;
        let footerButtons = <button type="button" onClick={this.sentOkClicked} className="c-btn c-btn--default c-btn--sm c-modal__button">Ok</button>;
        return (<ModalComponent show
            onHide={this.sentOkClicked}
            customClass={"c-modal c-modal--center"}
            bsSize={'small'}
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
        let bodyContent = <div><div><GetIcon id="icon-success" width="68px" height="68px" /></div>Message saved as a draft</div>;
        let footerButtons = <button type="button" onClick={this.draftOkClicked} className="c-btn c-btn--default c-btn--sm c-modal__button">Ok</button>;
        return (<ModalComponent show
            onHide={this.draftOkClicked}
            customClass={"c-modal c-modal--center"}
            bsSize={'small'}
            modalheading={''}
            modalbody={bodyContent}
            modalfooter={footerButtons}
            modalInContainer={false}
            closeButton/>);
    }
    saveDraftData(){
        this.props.dispatch(updateMessageData(messageEntity.getMessageRequestData(), this.props.location.messageDetail.id, "DRAFT"));
        if(this.props.messages.successModal) {
        this.setState({showDraftSuccessModal : true});
        }
    }
    draftOkClicked(){
        this.setState({showDraftSuccessModal : false});
    }
    checkAccountValue() {
        let accVal;
        if(this.props.location.messageDetail.account.accountNumber === undefined) {
            accVal = 'No specific account';
        } else {
            accVal = this.props.location.messageDetail.account.name;
        }
        return accVal;
    }
    checkError() {
      
        if (this.props.messages.error) {
        this.props.history.push("/errormessage");
    } else {
        {this.props.location.messageDetail.account.accountNumber === undefined ? 'No specific account' : this.props.location.messageDetail.account}
        return (<div>
        <div className="row">
            <div className="col-md1-18">
                <StepHeader showheaderCrumbs={true} onClick={() => { }} headerCrumbsMessage="Back" headerTitle="Draft message" headerCrumbsPath={{ pathname: `${window.baseURl}/securemessages` }} />
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
                <DropDownComponent accounts={this.props.location.messageDetail.account} selectSubject={this.selectSubject} name='accounts' id='accounts' isFromDraftOrReply = {true} selectedValue = {this.checkAccountValue()}/>
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
            <Link to = {`${window.baseURl}/securemessages`} className="c-btn c-btn--secondary">
                {this.props.content.back}
            </Link>
            <button name='Save Draft' className="c-btn c-btn--secondary" onClick = {this.saveDraftData}>{this.props.content.saveDraft}</button>
            <button name='Send' className="c-btn c-btn--default" onClick={this.sendData}>{this.props.content.send}</button>
        </div>
    </div>);
    }
}
    render() {
        return (
            <div className="container">
                {this.checkError()}
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