import { Switch, MemoryRouter, Route, Redirect, withRouter } from 'react-router-dom';
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


const RouteWithLayout = ({ Component, isDocumentLibraryEnabled, ...restProps }) => <Route {...restProps} render={(routeProps) => 
    <Main isDocumentLibraryEnabled={isDocumentLibraryEnabled}>
        <Component {...restProps} {...routeProps} />
    </Main>
} />

/** 
 * @class AppRouter Class to initiate and route the application 
 */

const RoutesWithLayout = (props) => (
    <Switch>
        <RouteWithLayout path='/securemessages/errormessage' Component={ErrorPage} />
        <RouteWithLayout
            exact
            path={`/securemessages/view`}
            Component={ViewMessage}
            content={props.content}
            isDocumentLibraryEnabled={props.isDocumentLibraryEnabled}
            isReadOnly
        />
        <RouteWithLayout
            path={`/securemessages`}
            Component={LandingPage}
            content={props.content}
            isDocumentLibraryEnabled={props.isDocumentLibraryEnabled}
            isReadOnly
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
            <MemoryRouter>
                <div>
                    <Route path={`/securemessages`} render={() => (
                        <RoutesWithLayoutAndSubscription {...this.props} />
                    )} />
                    <AccessibilityMessage/>
                    <RouteWithLayout
                        path={`my-documents`}
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
                        path={`my-documents/:displayCategory`}
                        isDocumentLibraryEnabled={isDocumentLibraryEnabled}
                        exact
                    />
                    <Route path={`my-documents/:displayCategory/:documentId`} exact component={DocumentView} />
                    <Redirect exact from = '/' to = {`securemessages`} key='redirect'/>
                </div>
            </MemoryRouter>
        );
    }
}

export default AppRouter;


