import { Switch, BrowserRouter, Route, Redirect } from 'react-router-dom';
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

class AppRouter extends React.Component {
    /**
    * Initiates the application in BrowserRouter. Please refer to react-router v4 docs.
    * @return {ReactComponent} Displays the components wrapped around BrowserRouter and Routes the application.
    */ 
      render() {
        return (
            <BrowserRouter>
                <div>
                        <Switch>
                            <RouteWithLayout path = {`${window.baseURl}/securemessages`} Component={LandingPage} {...this.props} />
                            <RouteWithLayout path = {`${window.baseURl}/viewmessage`} Component={ViewMessage} {...this.props} />
                            <RouteWithLayout path = {`${window.baseURl}/newsecuremessage`} Component={NewSecureMessage} {...this.props} />
                            <RouteWithLayout path = {`${window.baseURl}/replysecuremessage`} Component={ReplySecuremessage} {...this.props} />
                            <RouteWithLayout path = {`${window.baseURl}/draftsecuremessage`} Component={DraftSecureMessage} {...this.props} />
                            <RouteWithLayout path = '/errormessage' Component={ErrorPage} />
                            <RouteWithLayout path={`${window.baseURl}/my-documents`} session={{ bank_id: "CB" }}  exact Component={FolderList} />
                            <RouteWithLayout
                                Component={DocumentList}
                                session={{ bank_id: "CB" }} client={{ client: { app_title: "WEB", user_tracking_id: "24"}}}
                                path={`${window.baseURl}/my-documents/:product`}
                                exact
                            />
                            <Redirect exact from = '/' to = {`${window.baseURl}/securemessages`} key='redirect'/>;    
                        </Switch>
                        <AccessibilityMessage/>
                    <Route path={`${window.baseURl}/my-documents/:product/:documentId`} exact component={DocumentView} />
                </div>
            </BrowserRouter>
        );
    }
}

export default withSubscription(AppRouter);


