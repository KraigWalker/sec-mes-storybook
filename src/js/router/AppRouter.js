import { Switch, BrowserRouter, Route, Redirect } from 'react-router-dom';
import React from 'react';
import SecureMessageLanding from '../components/SecureMessageLanding';
import Inbox from '../components/Inbox';
import Main from '../components/Main';

/** 
 * @class AppRouter Class to initiate and route the application 
 */

class AppRouter {
/**
 * Initiates the application in BrowserRouter. Please refer to react-router v4 docs.
 * @return {ReactComponent} Displays the components wrapped around BrowserRouter and Routes the application.
 */
    static init() {
        return (
        <Main>
            <BrowserRouter>
            <div>
                <Switch>
                    <Route path = '/securemessages'  component = { SecureMessageLanding }/>
                    <Route path = '/securemessages:inbox' component = { Inbox }/>
                    <Redirect from = '/' to = '/securemessages'/>
                </Switch>
            </div>
            </BrowserRouter>
        </Main>
    );
    }
}

export default AppRouter;
