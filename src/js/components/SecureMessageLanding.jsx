import React from 'react';
import { connect } from 'react-redux';

// import axios from "axios";
import StepHeader from './StepHeaderComponent.jsx'
import GetTabs from './common/GetTabs.jsx'
import ButtonComponent from './ButtonComponent.jsx';
import Inbox from './InboxComponent.jsx'


import { getSecureMessages } from '../actions/SecureMessageActions.js';
// import { getConsent } from '../actions/ConsentAction';
// import { getPermission } from '../actions/PermissionAction';

class SecureMessageLanding extends React.Component {
    constructor() {
      super();
    }
    componentWillMount() {
      this.props.dispatch(getSecureMessages());
    }
    componentWillReceiveProps(nextProps) {
      // this.getMessagesSeperate(this.props.messages);
      // if (nextProps.token.tokenFetched === true){
      //   if(!nextProps.consent.consentFetched && !nextProps.consent.fetching){
      //     this.props.dispatch(getConsent(false));
      //   } else{
      //     this.setState({meoData : JSON.parse(window.localStorage.getItem('setMeoData'))});
      //   }
      // }  
    }

    // getMessagesSeperate(messages){

    // }
    // linkClick = (consent) => {
    //   this.props.dispatch(getPermission());
    //   this.props.history.push({
    //     pathname: '/summary',
    //     state: { detail: consent }
    //   })
    // }
    // loadCardComponent = () =>{
    //   if(consents && consents.length > 0){

    //   }
    // }


    render = () => {
      const { messages } = this.props;
      let icon = ['glyphicon glyphicon-remove', 'glyphicon glyphicon-remove', 'glyphicon glyphicon-star', 'glyphicon glyphicon-remove', 'glyphicon glyphicon-remove'];
      let titleName = ['Inbox', 'Drafts', 'Sent'];
      let tabContent = [<Inbox messages={messages.inboxMessage?messages.inboxMessage:null}/>, 
        <Inbox messages={messages.draftMessage?messages.draftMessage:null}/>,
        <Inbox messages={messages.sentMessage?messages.sentMessage:null}/>];
      
        return (<div className = "container dyb">
          <StepHeader showheaderCrumbs={true}  headerCrumbsMessage="Back to accounts" headerTitle='Messages' 
              headerSubtext={ [ "Got an enquiry? Send a message to the Team at B - we’re here to help. What’s more, because you’re logged in, these messages are safe and secure.",
                              "Messages will be kept in your inbox going back 13 months. If you’d like to access older messages, please contact the Team at B." ] }/>
          <ButtonComponent className="c-btn c-btn--primary" buttonName="New secure Message" navigate={true} />
          <GetTabs IconFlag={false} icon={icon} titleName={titleName} tabContent={tabContent} />
          </div>);
    }
}

const mapState = (state) => {
  return {
    messages : state.SecureMessages.messages,
  };
}


export default connect(mapState)(SecureMessageLanding);
