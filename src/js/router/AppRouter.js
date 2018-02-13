import { Switch, BrowserRouter, Route, Redirect } from 'react-router-dom';
import React from 'react';
import LandingPage from '../components/LandingPage';
import Main from '../components/Main';
import NewSecureMessage from '../components/NewSecureMessage';
import ViewMessage from '../components/ViewMessage';
import ReplySecuremessage from '../components/ReplySecureMessage';
import { withSubscription,accessibilityWrapper } from '../components/wrappers/GenericWrapper';
import DraftSecureMessage from '../components/DraftSecureMessage';
import AccessibilityMessage from '../components/common/AccessibilityMessage'

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
                   <Route path = {`${window.baseURl}/securemessages`} render = { (props) => (<LandingPage {...this.props} {...props} />)} />
                   <Route path = {`${window.baseURl}/viewmessage`} render = {(props) => (<ViewMessage {...this.props} {...props}/>)}/>
                   <Route path = {`${window.baseURl}/newsecuremessage`} render = {(props) => (<NewSecureMessage {...this.props} {...props}/>)}/>
                   <Route path = {`${window.baseURl}/replysecuremessage`} render = {(props) => (<ReplySecuremessage {...this.props} {...props}/>)}/>
                   <Route path = {`${window.baseURl}/draftsecuremessage`} render = {(props) => (<DraftSecureMessage {...this.props} {...props}/>)}/>
                   <Redirect from = '/' to = {`${window.baseURl}/securemessages`} key='redirect'/>;    
                </Switch>
                <AccessibilityMessage/>
                </Main>
            </BrowserRouter>
        );
    }
}

//export default accessibilityWrapper(withSubscription(AppRouter));
export default withSubscription(AppRouter);


