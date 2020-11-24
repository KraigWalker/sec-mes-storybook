import { Suspense } from 'react';
import { lazy } from '@loadable/component';
import {
  Switch,
  Route,
  Redirect,
  withRouter,
  useLocation,
  useParams,
} from 'react-router-dom';
// import { ConnectedLandingPage } from '../components/LandingPage';
// import Main from '../components/Main';
//import NewSecureMessage from '../components/NewSecureMessage';
//import { ViewMessage } from '../components/ViewMessage';
// import ReplySecuremessage from '../components/ReplySecureMessage';
import { withSubscription } from '../components/wrappers/GenericWrapper';
import AccessibilityMessage from '../components/common/AccessibilityMessage';
// import ErrorPage from '../components/common/ErrorPage';
//import { ListView } from '../components/ListView';
// import { AccountSelector } from '../components/AccountSelector';
// import { DocumentView } from '../components/DocumentView';
//import DraftSecureMessage from '../components/DraftSecureMessage';

function RouteWithLayout({ Component, ...restProps }) {
  return (
    <Route
      {...restProps}
      render={(routeProps) => (
        <Main {...restProps}>
          <Component {...restProps} {...routeProps} />
        </Main>
      )}
    />
  );
}

const ErrorPage = lazy(() =>
  import('../components/common/ErrorPage').then((mod) => mod.default)
);

const ViewMessage = lazy(() =>
  import('../components/ViewMessage').then((mod) => mod.ViewMessage)
);

const ListView = lazy(() =>
  import('../components/ListView').then((mod) => mod.ListView)
);

const NewSecureMessage = lazy(() =>
  import('../components/NewSecureMessage').then((mod) => mod.default)
);

const ConnectedLandingPage = lazy(() =>
  import('../components/LandingPage').then((mod) => mod.ConnectedLandingPage)
);

const AccountSelector = lazy(() =>
  import('../components/AccountSelector').then((mod) => mod.AccountSelector)
);

const DocumentView = lazy(() =>
  import('../components/DocumentView').then((mod) => mod.DocumentView)
);

const DraftSecureMessage = lazy(() =>
  import('../components/DraftSecureMessage').then((mod) => mod.default)
);

const ReplySecuremessage = lazy(() =>
  import('../components/ReplySecureMessage').then((mod) => mod.default)
);

const Main = lazy(() =>
  import('../components/Main').then((mod) => mod.default)
);

/**
 * @class AppRouter Class to initiate and route the application
 */
function RoutesWithLayout(props) {
  return (
    <Switch>
      <RouteWithLayout
        path="/securemessages/error"
        Component={ErrorPage}
        content={props.content}
      />
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
        Component={ReplySecuremessage}
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
        Component={ConnectedLandingPage}
        content={props.content}
        isDocumentLibraryEnabled={props.isDocumentLibraryEnabled}
        session={props.session}
      />
      <Redirect exact from="/" to={`/securemessages`} key="redirect" />
    </Switch>
  );
}

const RoutesWithLayoutAndSubscription = withRouter(
  withSubscription(RoutesWithLayout)
);

/**
 * Initiates the application in BrowserRouter. Please refer to react-router v4 docs.
 * @return {ReactComponent} Displays the components wrapped around BrowserRouter and Routes the application.
 */
function AppRouter(props) {
  const { isDocumentLibraryEnabled } = props;
  let location = useLocation();
  let params = useParams();
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Route
        path={`/securemessages`}
        render={() => <RoutesWithLayoutAndSubscription {...props} />}
      />
      <AccessibilityMessage />
      <Switch>
        <RouteWithLayout
          path={`/my-documents/:bankId(CB|YB)`}
          exact
          Component={ListView}
          session={props.session}
          client={props.client}
          isDocumentLibraryEnabled={isDocumentLibraryEnabled}
        />
        <Route
          path={`/my-documents/:bankId(CB|YB)/:documentId`}
          exact
          render={({ match, ...restProps }) => {
            console.log('restProps');
            console.dir(restProps);
            console.log('route props');
            console.dir(props);
            let query = new URLSearchParams(location.search);
            console.log('query:');
            console.dir(query);
            return (
              <DocumentView
                {...props}
                match={match}
                category={query.get('category')}
                documentId={params.documentId}
                session={props.session}
              />
            );
          }}
        />
        <RouteWithLayout
          Component={AccountSelector}
          session={props.session}
          client={props.client}
          path={`/digital-statements/select-account`}
          isDocumentLibraryEnabled={isDocumentLibraryEnabled}
          exact
        />
      </Switch>
    </Suspense>
  );
}

export default AppRouter;
