import { Suspense } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import loadable from '@loadable/component';

const DraftSecureMessageView = loadable(() =>
  import('../../messages/views/DraftSecureMessageView')
);
const NewSecureMessageView = loadable(() =>
  import('../../messages/views/NewSecureMessageView')
);
const SecureMessagesListView = loadable(() =>
  import('../../messages/views/SecureMessageListView')
);
const SingleSecureMessageView = loadable(() =>
  import('../../messages/views/SingleSecureMessageView')
);
const ReplySecureMessageView = loadable(() =>
  import('../../messages/views/ReplySecureMessageView')
);

/**
 *@todo consider hoisting this to AppRouter
 *const ErrorView = loadable(
 *  import('')
 * );
 */

/**
 * @todo instead of /view, have the url == /:id for better history?
 */

function SecureMessagesRoutes() {
  // The `path` lets us build <Route> paths that are
  // relative to the parent route, while the `url` lets
  // us build relative links.
  let { path } = useRouteMatch();
  return (
    <Suspense fallback={() => null}>
      <Switch>
        <Route
          strict
          exact
          path={`${path}`}
          component={SecureMessagesListView}
        />
        <Route
          strict
          exact
          path={`${path}/new`}
          component={NewSecureMessageView}
        />
        <Route
          strict
          exact
          paths={`${path}/draft`}
          component={DraftSecureMessageView}
        />
        {/**
         * @todo consider the possible /:messageId/reply in tandem with changes
         * to the `/view` behaviour discussed below
         */}
        <Route
          strict
          exact
          path={`${path}/reply`}
          component={ReplySecureMessageView}
        />
        {/**
         * @todo Redirect `/view` without a messageId to inbox (List View).
         * @todo Redirect urls missing `/view` but have a messageId.
         */}
        <Route
          strict
          exact
          path={`${path}/view/:messageId`}
          component={SingleSecureMessageView}
        />
        {/*<Route path={`${path}/error`} />*/}
      </Switch>
    </Suspense>
  );
}

export { SecureMessagesRoutes };
