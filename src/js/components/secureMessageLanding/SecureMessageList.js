import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import SecureMessageSummary from '../common/SecureMessageSummary';
import {getMessageType} from '../../utils/SecureMessageUtils';

class SecureMessageList extends React.Component {
    showMessages() {
        const { messages } = this.props;
        const allMessages = [];
        const hasOnClick = true;
        const listFlag = true;
        _.map(messages, (message, index) => {
            allMessages.push(<li key={index} className="c-messagelist__wrapper"><SecureMessageSummary message= { message } hasOnClick={hasOnClick} listFlag={listFlag} 
            draftFlag={message.status === "DRAFT"} sentFlag={getMessageType(message.status) === "sent"}/></li>)
        })
        return allMessages;
    }
    render() {
        return (
            <section>
                <ol className="c-messagelist">
                    {this.showMessages()}
                </ol>
            </section>
        );  
    }
}

export default SecureMessageList;

