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
    <Main {...restProps} >
        <Component {...restProps} {...routeProps} />
    </Main>
} />

/** 
 * @class AppRouter Class to initiate and route the application 
 */

const RoutesWithLayout = (props) => (
    <Switch>
        <RouteWithLayout
            exact
            path={`${window.baseURl}/securemessages/view`}
            Component={ViewMessage}
            content={props.content}
            isDocumentLibraryEnabled={props.isDocumentLibraryEnabled}
            session={props.session}
        />
        <RouteWithLayout
            exact
            path={`${window.baseURl}/securemessages/new`}
            Component={NewSecureMessage}
            content={props.content}
            isDocumentLibraryEnabled={props.isDocumentLibraryEnabled}
            session={props.session} 
        />
        <RouteWithLayout
            exact
            path={`${window.baseURl}/securemessages/reply`}
            Component={ReplySecuremessage}
            content={props.content}
            isDocumentLibraryEnabled={props.isDocumentLibraryEnabled}
            session={props.session}
        />
        <RouteWithLayout
            exact
            path={`${window.baseURl}/securemessages/draft`}
            Component={DraftSecureMessage}
            content={props.content}
            isDocumentLibraryEnabled={props.isDocumentLibraryEnabled}
            session={props.session}
        />
        <RouteWithLayout
            path={`${window.baseURl}/securemessages`}
            Component={LandingPage}
            content={props.content}
            isDocumentLibraryEnabled={props.isDocumentLibraryEnabled}
            session={props.session}
        />
        <Redirect
            exact
            from = '/'
            to = {`${window.baseURl}/securemessages`}
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
            <BrowserRouter>
                <div>
                    <Route path={`${window.baseURl}/securemessages`} render={() => (
                        <RoutesWithLayoutAndSubscription {...this.props} />
                    )} />
                    <AccessibilityMessage/>
                    <RouteWithLayout path='/errormessage' Component={ErrorPage} />
                    <Switch>
                        <RouteWithLayout
                            path={`${window.baseURl}/my-documents/:bankId(CB|YB|DYB)`}
                            exact
                            Component={FolderList}
                            session={this.props.session}
                            client={this.props.client}
                            isDocumentLibraryEnabled={isDocumentLibraryEnabled}
                        />
                        <RouteWithLayout
                            Component={DocumentList}
                            session={this.props.session}
                            client={this.props.client}
                            path={`${window.baseURl}/my-documents/:bankId(CB|YB|DYB)/:displayCategory`}
                            isDocumentLibraryEnabled={isDocumentLibraryEnabled}
                            exact
                        />
                        <Route 
                            path={`${window.baseURl}/my-documents/:bankId(CB|YB|DYB)/:displayCategory/:documentId`}
                            exact
                            component={DocumentView}
                        />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default AppRouter;


