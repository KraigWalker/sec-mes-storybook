import React from 'react';
import StepHeader from '../common/StepHeader';
import SecureMessageSummary from '../common/SecureMessageSummary';
import TextArea from '../common/TextAreaComponent';
import Threads from '../common/ThreadList'
import { connect } from 'react-redux';
import { getSecureMessages } from '../../actions/AppActions';
import {getThreadsBL} from '../../bl/SecureMessageBL'
import {getMessageType} from '../../utils/SecureMessageUtils';

class ViewMessage extends React.Component {
    componentWillMount(){
        this.props.dispatch(getSecureMessages());
    }
    
    getThreads(messages, currentMessage){
        const threads =  getThreadsBL(messages, currentMessage);
        return <Threads Threads={threads} />
    }

    render() {
        const { messageDetail} = this.props.location;
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md1-18">
                        <StepHeader showheaderCrumbs={true} headerCrumbsPath={{ pathname : '/securemessages'}} headerCrumbsMessage="Back" 
                        headerTitle={(getMessageType(messageDetail.status)== 'sent')?this.props.headerDetails.senttitle:this.props.headerDetails.inboxtitle}/>
                    </div>
                </div>
                    <SecureMessageSummary message= { messageDetail }></SecureMessageSummary>
                    <div className="c-field">
                        <TextArea messageBody={messageDetail.messageBody} disableText={true}/>
                    </div>
                    {this.getThreads(this.props.messages.messages, messageDetail)}
                
            </div>
        );
    }
}


const mapState = (state) => { 
    return {
        messages: state.messages
    }
};


export default connect(mapState)(ViewMessage);
