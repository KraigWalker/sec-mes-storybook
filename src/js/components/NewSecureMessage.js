import React from 'react';
import { getMessageSubjects,getAccounts } from '../actions/AppActions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Dropdown, ButtonToolbar, MenuItem } from 'react-bootstrap/lib';
import _ from 'lodash';
import DropDownComponent from './DropDownComponent.js';
class NewSecureMessage extends React.Component {
    constructor(props) {
        super(props);
        this.returnMenuItem = this.returnMenuItem.bind(this);
        this.selectSubject = this.selectSubject.bind(this);
        this.selectValue = this.selectValue.bind(this);
    };
    componentWillMount() {
        this.props.dispatch(getMessageSubjects());
        this.props.dispatch(getAccounts());
    }
    componentDidMount() {
        console.log('Subjects:', this.props.subjects);
    }
    selectSubject(e){
        console.log('clicked',e.target.value);
        console.log('ID:',e.target.id);
    }
    selectValue() {
        console.log('Value',e.target.value);
    }
    returnMenuItem() {
        console.log('INSIDE MENU Func',this.props.subjects);
        let items = [];  
        _.map(this.props.subjects.subjects, (subject) => {
            console.log('sub:',subject);
            items.push(<option key = {subject.key} value={subject.key} onSelect = {this.selectValue}>{subject.value}</option>);
        },false);
        return items;
    }
    render() {
        console.log('Messages',this.props.messages);
        console.log('accounts',this.props.accounts);
        return (<div>
            <Link to='/securemessages'> Back To Homepage</Link><br/>
            <h2>New message</h2><br/>
            <h3>Subject</h3>
            <DropDownComponent subjects = {this.props.subjects} selectSubject = {this.selectSubject} id='subjects'/>
            {/* <select onChange = {this.selectSubject} name = "select">
                {this.returnMenuItem()}
            </select><br/><br/><br/> */}
            <h3>Accounts</h3><br/>
            <DropDownComponent accounts = {this.props.accounts} selectSubject = {this.selectSubject} id='accounts'/>
            {/* <select onChange = {this.selectSubject} name = "select">
               <option>Current Account</option>
               <option>Savings Account</option>
            </select><br/><br/><br/> */}
            <Link to='/securemessages'>
            <input type = 'button' name = 'cancel' value = 'Back'/>
            </Link>
            <input type = 'button' name = 'Save Draft' value = 'Save Draft'/>
            <input type = 'button' name = 'Send' value = 'Send'/>
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
        accounts:state.accounts,
    }
};
export default connect(mapState)(NewSecureMessage);