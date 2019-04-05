import { Switch, BrowserRouter, Route, Redirect, withRouter } from 'react-router-dom';
import React from 'react';
import LandingPage from '../components/LandingPage';
import Main from '../components/Main';
import NewSecureMessage from '../components/NewSecureMessage';
import ViewMessage from '../components/ViewMessage';
import ReplySecuremessageNew from '../components/ReplySecureMessage';
import { withSubscription } from '../components/wrappers/GenericWrapper';
import AccessibilityMessage from '../components/common/AccessibilityMessage';
import ErrorPage from '../components/common/ErrorPage';
import { ListView } from '../components/ListView';
import { AccountSelector } from '../components/AccountSelector';
import { DocumentView } from '../components/DocumentView';
import DraftSecureMessage from '../components/DraftSecureMessage';

const RouteWithLayout = ({ Component, ...restProps }) => <Route {...restProps} render={(routeProps) => 
    <Main {...restProps} >
        <Component {...restProps} {...routeProps} />
    </Main>
} />;

/** 
 * @class AppRouter Class to initiate and route the application 
 */

const RoutesWithLayout = (props) => (
    <Switch>
        <RouteWithLayout
            exact
            path={`/securemessages/view`}
            Component={ViewMessage}
            content={props.content}
            isDocumentLibraryEnabled={props.isDocumentLibraryEnabled}
            session={props.session}
            client={props.client}
        />
        <RouteWithLayout
            exact
            path={`/securemessages/new`}
            Component={NewSecureMessage}
            content={props.content}
            isDocumentLibraryEnabled={props.isDocumentLibraryEnabled}
            session={props.session} 
        />
        <RouteWithLayout
            exact
            path={`/securemessages/reply`}
            Component={ReplySecuremessageNew}
            content={props.content}
            isDocumentLibraryEnabled={props.isDocumentLibraryEnabled}
            session={props.session}
        />
        <RouteWithLayout
            exact
            path={`/securemessages/draft`}
            Component={DraftSecureMessage}
            content={props.content}
            isDocumentLibraryEnabled={props.isDocumentLibraryEnabled}
            session={props.session}
        />
        <RouteWithLayout
            path={`/securemessages`}
            Component={LandingPage}
            content={props.content}
            isDocumentLibraryEnabled={props.isDocumentLibraryEnabled}
            session={props.session}
        />
        <Redirect
            exact
            from = '/'
            to = {`/securemessages`}
            key='redirect'
        />    
    </Switch>
)

const RoutesWithLayoutAndSubscription = withRouter(withSubscription(RoutesWithLayout))

class AppRouter extends React.Component {
    /**
    * Initiates the application in BrowserRouter. Please refer to react-router v4 docs.
    * @return {ReactComponent} Displays the components wrapped around BrowserRouter and Routes the application.
    */ 
      render() {
        const { isDocumentLibraryEnabled } = this.props;
        return (
            <BrowserRouter basename={window.baseURl}>
                <div>
                    <Route path={`/securemessages`} render={() => (
                        <RoutesWithLayoutAndSubscription {...this.props} />
                    )} />
                    <AccessibilityMessage/>
                    <RouteWithLayout path='/errormessage' Component={ErrorPage} />
                    <Switch>
                        <RouteWithLayout
                            path={`/my-documents/:bankId(CB|YB|DYB)`}
                            exact
                            Component={ListView}
                            session={this.props.session}
                            client={this.props.client}
                            isDocumentLibraryEnabled={isDocumentLibraryEnabled}
                        />
                        <Route 
                            path={`/my-documents/:bankId(CB|YB|DYB)/:documentId`}
                            exact
                            component={DocumentView}
                        />
                        <RouteWithLayout
                            Component={AccountSelector}
                            session={this.props.session}
                            client={this.props.client}
                            path={`/digital-statements/select-account`}
                            isDocumentLibraryEnabled={isDocumentLibraryEnabled}
                            exact
                        />
                        
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default AppRouter;


