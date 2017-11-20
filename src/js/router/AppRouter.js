import { Switch, BrowserRouter, Route, Redirect } from 'react-router-dom';
import React from 'react';
import _ from 'lodash';
import LandingPage from '../components/landing/LandingPage';
import Main from '../components/Main';
import NewSecureMessage from '../components/NewSecureMessage';
import RouteContent from '../content/routeContent';

/** 
 * @class AppRouter Class to initiate and route the application 
 */

class AppRouter {

    /**
 * Initiates the application in BrowserRouter. Please refer to react-router v4 docs.
 * @return {ReactComponent} Displays the components wrapped around BrowserRouter and Routes the application.
 */
        static getComponents (route, props){
            switch(route.component){
                case 'securemessages':
                return <LandingPage {...props} headerDetails={route.headerDetails}/>;
                case 'newsecuremessage' : 
                return <NewSecureMessage {...props} headerDetails={route.headerDetails}/>
            }
        };

        static getRoutes () {
            const allRoutes = [];
            console.log(this.props);
            _.map(RouteContent, (route, index) => {
                allRoutes.push(<Route path = {route.path} render={(props) => (
                        this.getComponents(route, props)
                )} key={index}/>);
            });
            allRoutes.push(<Redirect from = '/' to = '/securemessages' key='redirect'/>);
            return allRoutes;
        }
 
      static init () {
        return (
            <BrowserRouter>
                <div>
                    <Main>
                    <Switch>
                        {this.getRoutes()}
                        {/* <Route path = '/securemessages' render={(props) => 
                            (<Header title="Secure Messages"><LandingPage/></Header>)}/>
                        <Route path = '/securemessages:inbox' component = { Inbox }/>
                        <Redirect from = '/' to = '/securemessages'/>  */}
                    </Switch>
                    </Main>
                </div>
            </BrowserRouter>
        );
    }
}

export default AppRouter;
