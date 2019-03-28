import React from "react";
import SendSecureMessage from "./SendSecureMessage";
import { connect } from "react-redux";
import { PENDING, DRAFT } from "../constants/StringsConstants";
import { BuildSendMessageRequestEntity } from '../bl/SecureMessageBL';
import {popupState, sendMessageForAccessibiltiy, updateMessageData } from "../actions/AppActions"

class DraftSecureMessageNew extends React.Component {
    constructor(props) {
        super(props);
        this.onMount = this.onMount.bind(this);
        this.send = this.send.bind(this);
        this.save = this.save.bind(this);
    }
    onMount() { }

    sendMessageData(messageEntity, status) {
        const { accounts, location} = this.props;
        const { id } = location.messageDetail;
    
        const sendRequestMessage = BuildSendMessageRequestEntity(accounts, messageEntity);
        this.props.updateMessageData(sendRequestMessage.getMessageRequestData(), id, status);
    }
    send(messageEntity) {
        this.sendMessageData(messageEntity, PENDING);

    }
    save(messageEntity) {
        this.sendMessageData(messageEntity, DRAFT);
    }
    render() {
        const { messageDetail } = this.props.location;
        const { messages, content } = this.props;
        return <SendSecureMessage {...this.props} 
            messageInfo={messageDetail} 
            onSend={this.send} 
            onSave={this.save} 
            onMount={this.onMount} 
            hasErrors={messages.draftMessageError}
            selectedSubject={messageDetail.subject}
            selectedAccount={content.pleaseSelect}/>;
    }
}

const mapState = state => ({
    subjects: state.subjects,
    messages: state.messages,
    accounts: state.accounts
});

const mapStateToProps = {
    popupState,
    updateMessageData,
    sendMessageForAccessibiltiy
};
export default connect(mapState, mapStateToProps)(DraftSecureMessageNew);
