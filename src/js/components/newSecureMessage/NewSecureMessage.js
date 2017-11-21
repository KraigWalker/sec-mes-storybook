import React from 'react';
import { getMessageSubjects, getAccounts, sendMessageData } from '../../actions/AppActions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Dropdown, ButtonToolbar, MenuItem } from 'react-bootstrap/lib';
import _ from 'lodash';
import DropDownComponent from '../common/DropDownComponent.js';
import TextAreaComponent from '../common/TextAreaComponent.js';
import SendMessageRequestEntity from '../../entities/SendMessageRequestEntity.js'

let messageEntity = new SendMessageRequestEntity();
class NewSecureMessage extends React.Component {
    constructor(props) {
        super(props);
        this.selectSubject = this.selectSubject.bind(this);
        this.sendData = this.sendData.bind(this);
        this.textChange = this.textChange.bind(this);
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
        messageEntity.setMessage(e);
    }
    sendData() {
        // console.log(messageEntity.getMessageRequestData());
        this.props.dispatch(sendMessageData(messageEntity.getMessageRequestData()));
    }
    render() {
        return (<div>
            <Link to='/securemessages'> Back To Homepage</Link><br />
            <h2>New message</h2><br />
            <h3>Subject</h3>
            <DropDownComponent subjects={this.props.subjects} selectSubject={this.selectSubject} id='subjects' />
            <h3>Accounts</h3><br />
            <DropDownComponent accounts={this.props.accounts} selectSubject={this.selectSubject} id='accounts' />
            <TextAreaComponent textData={this.textChange} /> <br /><br />
            <Link to='/securemessages'>
                <input type='button' name='cancel' value='Back' />
            </Link>
            <input type='button' name='Save Draft' value='Save Draft' />
            <input type='button' name='Send' value='Send' onClick={this.sendData} />
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