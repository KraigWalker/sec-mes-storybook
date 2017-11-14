import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import MessageComponent from './MessageComponent';


class Inbox extends React.Component {
    showMessages() {
        const { messages } = this.props.location.state;
        const allMessages = [];
        _.map(messages, (message, index) => {
            allMessages.push(<li key = {index}><MessageComponent message= { message }/></li>)
        })
        return allMessages;
    }
    render() {
        return (
            <div>
                <Link to = '/securemessages'> Back </Link>
                <h2>Inbox</h2>
                <ul>{this.showMessages()}</ul>
            </div>
        );  
    }
}

export default Inbox;

