import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import SecureMessageSummary from '../common/SecureMessageSummary';


class SecureMessageList extends React.Component {
    showMessages() {
        const { messages } = this.props;
        const allMessages = [];
        _.map(messages, (message, index) => {
            allMessages.push(<SecureMessageSummary message= { message } key={index}/>)
        })
        return allMessages;
    }
    render() {
        return (
            <div>
                {this.showMessages()}
            </div>
        );  
    }
}

export default SecureMessageList;

