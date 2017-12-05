import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import SecureMessageSummary from './common/SecureMessageSummary';
import { getMessageType } from '../utils/SecureMessageUtils';

class SecureMessageList extends React.Component {
    constructor(props) {
        super(props);
        this.showMoreClicked = this.showMoreClicked.bind(this);
        this.state = {
            showMoreLimit: 5,
            showThatsAllMessage:false,
        }
    }
    componentWillReceiveProps(props) {
        this.setState({ showMoreLimit: 5, showThatsAllMessage :'' });
    }
    showMessages() {
        let msgs = this.props.messages.slice(0, this.state.showMoreLimit);
        const { messages } = this.props;
        const allMessages = [];
        const hasOnClick = true;
        const listFlag = true;
        _.map(msgs, (message, index) => {
            allMessages.push(<li key={index} className="c-messagelist__wrapper"><SecureMessageSummary message={message} hasOnClick={hasOnClick} listFlag={listFlag}
                draftFlag={message.status === "DRAFT"} sentFlag={getMessageType(message.status) === "sent"} readFlag={message.status === 'READ'} /></li>)
        })
        return allMessages;
    }
    showMoreClicked() {
        let limit = this.props.messages.length;
        this.setState({
            showMoreLimit: limit,
            showThatsAllMessage : true,
        })
    }
    renderShowMoreButton() {
        let buttonText = 'Show more messages';
        if(this.props.activeTab === 'sent') {
            buttonText = 'Show more sent messages';
        } else if(this.props.activeTab === 'drafts') {
            buttonText = 'Show more drafts';
        }
        if (this.state.showMoreLimit < this.props.messages.length && (this.props.activeTab === 'sent' || this.props.activeTab === 'inbox' || this.props.activeTab === 'drafts')) {
            return (<button type="button" onClick={this.showMoreClicked} className="c-btn c-btn--default c-modal__button">{buttonText}</button>);
        }

    }
    renderThatsAllText(){
        let thatsallText = 'That’s all of them. Any new messages you send will appear at the top of this list. We display messages up to 13 months in the past.';
        if(this.props.activeTab === 'sent') {
            thatsallText = 'That’s all of them. Any new messages you send will appear at the top of this list. We display messages up to 13 months in the past.'
        } else if(this.props.activeTab === 'drafts') {
            thatsallText = 'That’s all of them. Any new drafts you save will appear at the top of this list. We display messages up to 13 months in the past.';
        }
        return thatsallText;
    }
    render() {
       
        return (
            <section>
                <ol className="c-messagelist">
                    {this.showMessages()}
                </ol>
                {this.renderShowMoreButton()}
                {this.state.showThatsAllMessage && <p>{this.renderThatsAllText()}</p>}
            </section>
        );
    }
}

export default SecureMessageList;

