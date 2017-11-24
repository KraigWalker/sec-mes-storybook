import React from 'react';
import { getMessageSubjects, getAccounts, sendMessageData } from '../../actions/AppActions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Dropdown, ButtonToolbar, MenuItem } from 'react-bootstrap/lib';
import _ from 'lodash';
import DropDownComponent from '../common/DropDownComponent.js';
import TextAreaComponent from '../common/TextAreaComponent.js';
import StepHeader from '../common/StepHeader';
import SendMessageRequestEntity from '../../entities/SendMessageRequestEntity.js'
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
        this.state = {
            chars_left: 20,
        };
    };
    componentWillMount() {
        this.props.dispatch(getMessageSubjects());
        this.props.dispatch(getAccounts());
    }
    selectSubject(e) {
        if (e.target.id === 'accounts') {
            messageEntity.setAccount(e.target.value);
        }
        if (e.target.id === 'subjects') {
            messageEntity.setSubject(e.target.value);
        }
    }
    textChange(e) {
        this.setState({ chars_left: 20 - e.length });
        let extractedString = RegexUtils.matchString(e);
        if (extractedString !== null) {
            let lastFour = RegexUtils.getLastFourDigits(extractedString);
            messageEntity.setMessage(e.replace(new RegExp(extractedString, 'g'), '************' + lastFour));
        } else messageEntity.setMessage(e);


    }
    sendData() {
        this.props.dispatch(sendMessageData(messageEntity.getMessageRequestData()));
    }
    checkPastedData(data) {
      //  console.log(RegexUtils.isValidPastedData(data));
    }
    renderRemainingChar() {
        if (this.state.chars_left <= 3) {
            return <p>Characters Left: {this.state.chars_left}</p>;
        } else return '';
    }
    render() {
        return (<div className="container">
            <div className="row">
                <div className="col-md1-18">
                    <StepHeader showheaderCrumbs={true} onClick={() => {}} headerCrumbsMessage="Back" headerTitle="New message" />
                </div>
            </div>
            {/*<Link to='/securemessages'> Back To Homepage</Link><br />*/}

            <div className="c-field">
                <label className="c-field__label c-field__label--block" htmlFor="subjects">
                    Subject
                </label>
                <div className="c-field__controls">
                    <DropDownComponent subjects={this.props.subjects} selectSubject={this.selectSubject} name='subjects' id='subjects' />
                </div>
            </div>

            <div className="c-field">
                <label className="c-field__label c-field__label--block" htmlFor="subjects">
                    Accounts
                </label>
                <div className="c-field__controls">
                    <DropDownComponent accounts={this.props.accounts} selectSubject={this.selectSubject} name='accounts' id='accounts' />
                </div>
            </div>
            

            <div className="c-field">
                <label className="c-field__label c-field__label--block" htmlFor="subjects">
                    Message
                </label>
                <div className="c-field__controls">
                    <TextAreaComponent textData={this.textChange} />
                </div>
            </div>

            <Link to='/securemessages'>
                <input type='button' name='cancel' value='Back' className="c-btn c-btn--secondary"/>
            </Link>&nbsp;
            <button name='Save Draft' className="c-btn c-btn--secondary">Save Draft</button>&nbsp;
            <button name='Send' className="c-btn c-btn--default" onClick={this.sendData}>Send</button>
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