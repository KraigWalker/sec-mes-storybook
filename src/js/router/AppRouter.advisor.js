import {Switch, MemoryRouter,
    Route, Redirect, withRouter} from 'react-router-dom';
import React from 'react';
import LandingPage from '../components/LandingPage';
import Main from '../components/Main';
import ViewMessage from '../components/ViewMessage';
import {withSubscription} from '../components/wrappers/GenericWrapper';
import AccessibilityMessage from '../components/common/AccessibilityMessage';
import ErrorPage from '../components/common/ErrorPage';
import {ListView} from '../components/ListView';
import {DocumentView} from '../components/DocumentView';

const RouteWithLayout = ({Component, isDocumentLibraryEnabled, ...restProps}) => <Route {...restProps}
                                                                                        render={(routeProps) =>
                                                                                            <Main
                                                                                                isDocumentLibraryEnabled={isDocumentLibraryEnabled}>
                                                                                                <Component {...restProps} {...routeProps} />
                                                                                            </Main>
                                                                                        }/>

/**
 * @class AppRouter Class to initiate and route the application
 */

const RoutesWithLayout = (props) => (
    <Switch>
        <RouteWithLayout path='/securemessages/error' Component={ErrorPage}/>
        <RouteWithLayout
            exact
            path={`/securemessages/view`}
            Component={ViewMessage}
            content={props.content}
            client={props.client}
            session={props.session}
            isDocumentLibraryEnabled={props.isDocumentLibraryEnabled}
            isReadOnly
        />
        <RouteWithLayout
            path={`/securemessages`}
            Component={LandingPage}
            content={props.content}
            client={props.client}
            session={props.session}
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
        const {isDocumentLibraryEnabled} = this.props;
        return (
            <MemoryRouter>
                <div>
                    <Route path={`/securemessages`} render={() => (
                        <RoutesWithLayoutAndSubscription {...this.props} />
                    )}/>
                    <AccessibilityMessage/>

                    <Switch>
                        <Route 
                            path={`/my-documents/:bankId(CB|YB)/:documentId`}
                            component={DocumentView}
                        />
                        <RouteWithLayout
                            path={`/my-documents/`}
                            exact
                            Component={ListView}
                            session={this.props.session}
                            client={this.props.client}
                            isDocumentLibraryEnabled={isDocumentLibraryEnabled}
                        />
                        <Redirect exact from='/' to={`securemessages`} key='redirect'/>

                    </Switch>
                </div>
            </MemoryRouter>
        );
    }
}

export default AppRouter;


