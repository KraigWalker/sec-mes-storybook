import { Switch, BrowserRouter, Route, Redirect } from 'react-router-dom';
import React from 'react';
import _ from 'lodash';
import LandingPage from '../components/LandingPage';
import Inbox from '../components/Inbox';
import Main from '../components/Main';
import StepHeader from '../components/common/StepHeader';
import RouteContent from '../content/routeContent';

/** 
 * @class AppRouter Class to initiate and route the application 
 */

class AppRouter extends React.Component {

    /**
 * Initiates the application in BrowserRouter. Please refer to react-router v4 docs.
 * @return {ReactComponent} Displays the components wrapped around BrowserRouter and Routes the application.
 */
        getComponents (component, props){
            switch(component){
                case 'securemessages':
                return <LandingPage {...props}/>;
                case 'inbox':
                return <Inbox {...props}/>;
            }
        };

        getRoutes () {
            const allRoutes = [];
            console.log(this.props);
            _.map(RouteContent, (route, index) => {
                allRoutes.push(<Route path = {route.path} render={(props) => (
                    <div>
                        <StepHeader showheaderCrumbs={false} onClick={() => {}} headerCrumbsMessage="" headerTitle={route.title} headerSubtext={route.subtext}/>
                        {this.getComponents(route.component, props)}
                    </div>
                )}/>);
            });
            allRoutes.push(<Redirect from = '/' to = '/securemessages'/>);
            return allRoutes;
        }
 
      render (props) {
        return (
            <BrowserRouter>
                <div>
                    <Main {...props}>
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
