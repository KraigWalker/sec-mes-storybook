import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import SecureMessage from './SecureMessage';


class SecureMessageList extends React.Component {
    showMessages() {
        const { messages } = this.props;
        const allMessages = [];
        const hasOnClick = true;
        const listFlag = true;
        _.map(messages, (message, index) => {
            allMessages.push(<li className="c-messagelist__wrapper"><SecureMessage message= { message } key={index} hasOnClick={hasOnClick} listFlag={listFlag}/></li>)
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

