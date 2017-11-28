import React from 'react';
import StepHeader from '../common/StepHeader';
import SecureMessageSummary from '../common/SecureMessageSummary';
import TextArea from '../common/TextAreaComponent';
import Threads from '../common/ThreadList'
import _ from 'lodash';
import { connect } from 'react-redux';
import { getSecureMessages, setViewMessageDetail, updateMessage } from '../../actions/AppActions';
import {getThreadsBL} from '../../bl/SecureMessageBL'
import {getMessageType, updateMessageStatus} from '../../utils/SecureMessageUtils';

class ViewMessage extends React.Component {
    componentWillMount(){
        this.props.dispatch(getSecureMessages());
    }
    componentDidMount(){
        const { messageDetail} = this.props.location;
        messageDetail && this.props.dispatch(setViewMessageDetail(this.props.location.messageDetail)); //to set current viewing message
        // Below is to update New message to Read message status.
        if(messageDetail && this.props.location.messageDetail.status === "NEW"){
            let UpdatedMessageList = this.props.messages;
            let updatedMessage= updateMessageStatus(this.props.location.messageDetail, 'READ');
            _.forEach(UpdatedMessageList, message => {message.id === updatedMessage.id && message.status === updatedMessage.status });
            this.props.dispatch(updateMessage(updatedMessage,UpdatedMessageList));
        }
    }
    getThreads(messages, currentMessage){
        const threads =  getThreadsBL(messages, currentMessage);
        return <Threads Threads={threads} />
    }

    render() {
        const { messageDetail} = this.props.location.messageDetail?this.props.location:this.props;
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md1-18">
                        <StepHeader showheaderCrumbs={true} headerCrumbsPath={{ pathname : '/securemessages'}} headerCrumbsMessage="Back" 
                        headerTitle={(getMessageType(messageDetail.status)== 'sent')?this.props.headerDetails.senttitle:this.props.headerDetails.inboxtitle}/>
                    </div>
                </div>
                    <SecureMessageSummary message= { messageDetail } viewMessageFlag={true} readFlag={messageDetail.status === "READ"} sentFlag={getMessageType(messageDetail.status) === "sent"}/>
                    <div className="c-field">
                        <TextArea messageBody={messageDetail.messageBody} disableText={true}/>
                    </div>
                    {this.getThreads(this.props.messages, messageDetail)}
                
            </div>
        );
    }
}


const mapState = (state) => { 
    return {
        messages: state.messages.messages,
        messageDetail: state.viewMessage.messageDetail
    }
};


export default connect(mapState)(ViewMessage);
