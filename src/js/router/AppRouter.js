import { Switch, BrowserRouter, Route, Redirect, withRouter } from 'react-router-dom';
import React from 'react';
import LandingPage from '../components/LandingPage';
import Main from '../components/Main';
import NewSecureMessage from '../components/NewSecureMessage';
import ViewMessage from '../components/ViewMessage';
import ReplySecuremessage from '../components/ReplySecureMessage';
import { withSubscription,accessibilityWrapper } from '../components/wrappers/GenericWrapper';
import DraftSecureMessage from '../components/DraftSecureMessage';
import AccessibilityMessage from '../components/common/AccessibilityMessage';
import ErrorPage from '../components/common/ErrorPage';
import { FolderList } from '../components/FolderList';
import { DocumentList } from '../components/DocumentList';
import { DocumentView } from '../components/DocumentView';


const RouteWithLayout = ({ Component, ...restProps }) => <Route {...restProps} render={(routeProps) => 
    <Main>
        <Component {...restProps} {...routeProps} />
    </Main>
} />

/** 
 * @class AppRouter Class to initiate and route the application 
 */

const RoutesWithLayout = (props) => (
    <Switch>
        <RouteWithLayout exact path={`${window.baseURl}/securemessages`} Component={LandingPage} content={props.content} />
        <RouteWithLayout exact path={`${window.baseURl}/securemessages/view`} Component={ViewMessage} content={props.content} />
        <RouteWithLayout exact path={`${window.baseURl}/securemessages/new`} Component={NewSecureMessage} content={props.content} />
        <RouteWithLayout exact path={`${window.baseURl}/securemessages/reply`} Component={ReplySecuremessage} content={props.content} />
        <RouteWithLayout exact path={`${window.baseURl}/securemessages/draft`} Component={DraftSecureMessage} content={props.content} />
        <Redirect exact from = '/' to = {`${window.baseURl}/securemessages`} key='redirect'/>;    
    </Switch>
)

const RoutesWithLayoutAndSubscription = withRouter(withSubscription(RoutesWithLayout))

class AppRouter extends React.Component {
    /**
    * Initiates the application in BrowserRouter. Please refer to react-router v4 docs.
    * @return {ReactComponent} Displays the components wrapped around BrowserRouter and Routes the application.
    */ 
      render() {
        return (
            <BrowserRouter>
                <div>
                    <Route path={`${window.baseURl}/securemessages`} render={() => (
                        <RoutesWithLayoutAndSubscription {...this.props} />
                    )} />
                    <AccessibilityMessage/>
                    <RouteWithLayout path='/errormessage' Component={ErrorPage} />
                    <RouteWithLayout
                        path={`${window.baseURl}/my-documents`}
                        exact
                        Component={FolderList}
                        session={this.props.session}
                        client={this.props.client}
                    />
                    <RouteWithLayout
                        Component={DocumentList}
                        session={this.props.session}
                        client={this.props.client}
                        path={`${window.baseURl}/my-documents/:product`}
                        exact
                    />
                    <Route path={`${window.baseURl}/my-documents/:product/:documentId`} exact component={DocumentView} />
                </div>
            </BrowserRouter>
        );
    }
}

export default AppRouter;


