
import React from 'react';
import SecureMessageSummary from '../common/SecureMessageSummary';
import StepHeader from '../common/StepHeader';
import TextAreaComponent from '../common/TextAreaComponent';
import DropDownComponent from '../common/DropDownComponent'
import { Link } from 'react-router-dom';
import RegexUtils from '../utils/RegexUtils.js';
import SendMessageRequestEntity from '../../entities/SendMessageRequestEntity.js'
import { connect } from 'react-redux';
import { getMessageSubjects, getAccounts, sendMessageData } from '../../actions/AppActions';
let messageEntity = new SendMessageRequestEntity();
import { getThreadsBL } from '../../bl/SecureMessageBL'
import Threads from '../common/ThreadList'
class ReplySecureMessage extends React.Component {
    constructor(props) {
        super(props);
        this.textChange = this.textChange.bind(this);
        this.selectSubject = this.selectSubject.bind(this);
        this.sendData = this.sendData.bind(this);
        this.getThreads = this.getThreads.bind(this);
        this.state = {
            chars_left: 43,
            showPopup: false,
        };
    }
    selectSubject(value, id) {
        if (id === 'accounts') {
            messageEntity.setAccount(value);
        }
        if (id === 'subjects') {
            messageEntity.setSubject(value);
        }
    }
    textChange(e) {
        this.setState({ chars_left: 43 - e.length });
        let extractedString = RegexUtils.matchString(e);
        if (extractedString !== null) {
            let lastFour = RegexUtils.getLastFourDigits(extractedString);
            messageEntity.setMessage(e.replace(new RegExp(extractedString, 'g'), '************' + lastFour));
        } else messageEntity.setMessage(e);


    }
    renderRemainingChar() {
        if (this.state.chars_left <= 3) {
            return <p>Characters Left: {this.state.chars_left}</p>;
        } else return '';
    }
    sendData() {
        this.props.dispatch(sendMessageData(messageEntity.getMessageRequestData()));
    }
    getThreads(messages, currentMessage) {
        const threads = getThreadsBL(messages, currentMessage);
        return <Threads Threads={threads} currentMessage={currentMessage} isFromReplyMessage={true} />
    }
    render() {
        const { backPath } = this.props.location;
        const { messageDetail } = this.props.location.messageDetail ? this.props.location : this.props;
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md1-18">
                        <StepHeader showheaderCrumbs={true} onClick={() => { }} headerCrumbsMessage="Back" headerTitle="Reply" headerCrumbsPath={{ pathname: backPath }} />
                    </div>
                </div>
                {/*<Link to='/securemessages'> Back To Homepage</Link><br />*/}

                <div className="c-field">
                    <label className="c-field__label c-field__label--block" htmlFor="subjects">
                        Subject
            </label>
                    <div className="c-field__controls">
                        <DropDownComponent subjects={this.props.location.messageDetail.subject} name='subjects' id='subjects' selectSubject={this.selectSubject} isFromDraftOrReply={true} selectedValue={this.props.location.messageDetail.subject} isFromReply={true} />
                    </div>
                </div>

                <div className="c-field">
                    <label className="c-field__label c-field__label--block" htmlFor="subjects">
                        Message relates to
            </label>
                    <div className="c-field__controls">
                        <DropDownComponent accounts={this.props.location.messageDetail.account.accountNumber} selectSubject={this.selectSubject} name='accounts' id='accounts' isFromDraftOrReply={true} selectedValue={this.props.location.messageDetail.account.accountNumber} isFromReply={true} />
                    </div>
                </div>


                <div className="c-field">
                    <label className="c-field__label c-field__label--block" htmlFor="subjects">
                        Message
            </label>
                    <div className="c-field__controls">
                        <TextAreaComponent textData={this.textChange} />
                    </div>
                    {this.renderRemainingChar()}
                    {this.getThreads(this.props.messages, messageDetail)}
                </div>

                {/* {this.state.showPopup ? this.returnModalComponent() : ''} */}
                <Link to='/securemessages'>
                    <input type='button' name='cancel' value='Back' className="c-btn c-btn--secondary" />
                </Link>&nbsp;

        <button name='Save Draft' className="c-btn c-btn--secondary">Save Draft</button>&nbsp;
        <button name='Send' className="c-btn c-btn--default" onClick={this.sendData}>Send</button>
            </div>
        );
    }
};
const mapState = (state) => {
    return {
        subjects: state.subjects,
        messages: state.messages.messages,
        accounts: state.accounts,
    }
};
export default connect(mapState)(ReplySecureMessage);