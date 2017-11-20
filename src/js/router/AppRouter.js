import { Switch, BrowserRouter, Route, Redirect } from 'react-router-dom';
import React from 'react';
import LandingPage from '../components/LandingPage';
import Inbox from '../components/Inbox';
import Main from '../components/Main';
import NewSecureMessage from '../components/NewSecureMessage';

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
            <BrowserRouter>
                <div>
                <Main>
                    <Switch>
                        <Route path = '/securemessages' component = { LandingPage }/>}/>
                        <Route path = '/securemessages:inbox' component = { Inbox }/>
                        <Route path = '/newsecuremessage' component = {NewSecureMessage}/>
                        <Redirect from = '/' to = '/securemessages'/>
                    </Switch>
                </Main>
                </div>
            </BrowserRouter>
       
    );
    }
}

export default AppRouter;
