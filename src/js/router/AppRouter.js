import { Switch, BrowserRouter, Route, Redirect } from 'react-router-dom';
import React from 'react';
import LandingPage from '../components/secureMessageLanding/LandingPage';
import Main from '../components/Main';
import NewSecureMessage from '../components/newSecureMessage/NewSecureMessage';
import ViewMessage from '../components/viewMessage/ViewMessage';
import ReplySecuremessage from '../components/replySecureMessage/ReplySecureMessage';
import { withSubscription } from '../components/wrappers/GenericWrapper';
import DraftSecureMessage from '../components/draftMessage/DraftSecureMessage'

/** 
 * @class AppRouter Class to initiate and route the application 
 */

class AppRouter extends React.Component {
    /**
    * Initiates the application in BrowserRouter. Please refer to react-router v4 docs.
    * @return {ReactComponent} Displays the components wrapped around BrowserRouter and Routes the application.
    */ 
      render() {
        return (
            <BrowserRouter>
                <Main>
                <Switch>
                   <Route path = '/securemessages' render = { () => { return <LandingPage {...this.props} />}} />
                   <Route path = '/viewmessage' render = {() => { return <ViewMessage {...this.props}/>}}/>
                   <Route path = '/newsecuremessage' render = {() => { return <NewSecureMessage {...this.props}/>}}/>
                   <Route path = '/replysecuremessage' render = {() => { return <ReplySecuremessage {...this.props}/>}}/>
                   <Redirect from = '/' to = '/securemessages' key='redirect'/>;    
                </Switch>
                </Main>
            </BrowserRouter>
        );
    }
}

export default withSubscription(AppRouter);
