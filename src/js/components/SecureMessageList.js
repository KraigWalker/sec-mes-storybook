import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import SecureMessageSummary from './common/SecureMessageSummary';
import { getMessageType } from '../utils/SecureMessageUtils';
import { sendMessageForAccessibiltiy } from '../actions/AppActions';
import { connect } from 'react-redux';
class SecureMessageList extends React.Component {
    constructor(props) {
        super(props);
        this.showMoreClicked = this.showMoreClicked.bind(this);
        this.state = {
            showMoreLimit: 20,
            showThatsAllMessage: false,
        }
    }
    componentWillReceiveProps(props) {
        if (this.props.messages.length <= 20) {
            this.setState({ showThatsAllMessage: true });
        } else {
            this.setState({ showMoreLimit: 20, showThatsAllMessage: '' });
        }

        if (this.props.activeTab === 'sent' && this.props.messagesFetched) {
            this.props.dispatch(sendMessageForAccessibiltiy('You don’t have any sent messages'));
        } else if (this.props.activeTab === 'drafts' && this.props.messagesFetched) {
            this.props.dispatch(sendMessageForAccessibiltiy('You haven’t saved any drafts'));
        } else if (this.props.activeTab === 'inbox' && this.props.messagesFetched) {
            //this.props.dispatch(sendMessageForAccessibiltiy('You don’t have any messages'));
        }
    }
    showMessages() {
        let msgs = this.props.messages.slice(0, this.state.showMoreLimit);
        const { messages } = this.props;
        const allMessages = [];
        const hasOnClick = true;
        const listFlag = true;
        _.map(msgs, (message, index) => {
            allMessages.push(
                <li key={index} className="c-messagelist__wrapper"><SecureMessageSummary message={message} listFlag={listFlag} /></li>)
        })
        return allMessages;
    }
    showMoreClicked() {

        this.props.dispatch(sendMessageForAccessibiltiy(`Next 20 messages loaded ${this.props.activeTab}`));
        let limit = this.props.messages.length;
        this.setState({
            showMoreLimit: limit,
            showThatsAllMessage: true,
        });
    }
    renderShowMoreButton() {
        let buttonText = 'Show more messages';
        if (this.props.activeTab === 'sent') {
            buttonText = 'Show more sent messages';
        } else if (this.props.activeTab === 'drafts') {
            buttonText = 'Show more drafts';
        }
        if (this.state.showMoreLimit < this.props.messages.length && (this.props.activeTab === 'sent' || this.props.activeTab === 'inbox' || this.props.activeTab === 'drafts')) {
            return (<button type="button" onClick={this.showMoreClicked} className="c-btn c-btn--default c-modal__button u-margin-bottom-c">{buttonText}</button>);
        }

    }
    renderThatsAllText() {
        let thatsallText = 'That’s all of them. Any new messages you send will appear at the top of this list. We display messages up to 13 months in the past.';
        if (this.props.activeTab === 'sent') {
            thatsallText = 'That’s all of them. Any new messages you send will appear at the top of this list. We display messages up to 13 months in the past.'
        } else if (this.props.activeTab === 'drafts') {
            thatsallText = 'That’s all of them. Any new drafts you save will appear at the top of this list. We display messages up to 13 months in the past.';
        }
        return thatsallText;
    }
    renderNoMessagesText() {
        if (this.props.activeTab === 'sent') {
            //  this.props.dispatch(sendMessageForAccessibiltiy('You don’t have any sent messages'));
            return (<li className="c-messagelist__wrapper">You don’t have any sent messages.</li>);
        } else if (this.props.activeTab === 'drafts') {
            // this.props.dispatch(sendMessageForAccessibiltiy('You haven’t saved any drafts'));
            return (<li className="c-messagelist__wrapper">You haven’t saved any drafts.</li>);
        } else {
            // this.props.dispatch(sendMessageForAccessibiltiy('You don’t have any messages'));
            return (<li className="c-messagelist__wrapper">You don’t have any messages.</li>);
        }
    }
    render() {

        return (
            <section>
                <ol className="c-messagelist">
                    {this.props.messages.length === 0 ? this.renderNoMessagesText() : this.showMessages()}
                </ol>
                {this.renderShowMoreButton()}
                {this.state.showThatsAllMessage && <p className="u-margin-bottom-c">{this.renderThatsAllText()}</p>}
            </section>
        );
    }
}

// export default SecureMessageList;
/**
 * Maps the state of the component to the state of the redux store
 * @param {object} state. State of the application
 */
const mapState = (state) => {
    return {
        messagesubjects: state.subjects,
        messageaccounts: state.accounts,
        messagesFetched: state.messages.fetched,
    }
};
export default connect(mapState)(SecureMessageList);

