import React from 'react';
import StepHeader from '../common/StepHeader';
import SecureMessageSummary from '../common/SecureMessageSummary';

class ViewMessage extends React.Component {
    getMessageType(type){
        if(type == 'SENT' || type == 'PENDING'){
            return 'sent';
        } else if(type == 'NEW' || type == 'READ'){
            return 'inbox';
        }

    }
    render() {
        const { messageDetail} = this.props.location;
        // { pathname : '/securemessage', activetab : this.getMessageType(messageDetail.status) }
        return (
            <div>
                
                <StepHeader showheaderCrumbs={true} headerCrumbsPath={{ pathname : '/securemessage'}} headerCrumbsMessage="Back" 
                headerTitle={(this.getMessageType(messageDetail.status)== 'sent')?this.props.headerDetails.senttitle:this.props.headerDetails.inboxtitle}/>
                <SecureMessageSummary message= { messageDetail }></SecureMessageSummary>
            </div>
        );
    }
}

export default ViewMessage;
