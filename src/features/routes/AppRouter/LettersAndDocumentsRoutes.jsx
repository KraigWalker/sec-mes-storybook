import { Suspense } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import loadable from '@loadable/component';

const DocumentListView = loadable(
  import('../../documents/views/DocumentListView')
);
const SingleDocumentView = loadable(
  import('../../documents/views/SingleDocumentView')
);

function LettersAndDocumentsRoutes() {
  // The `path` lets us build <Route> paths that are
  // relative to the parent route, while the `url` lets
  // us build relative links.
  let { path } = useRouteMatch();

  return (
    <Suspense fallback={() => null}>
      <Switch>
        <Route exact path={`${path}`} component={DocumentListView} />
        <Route
          exact
          path={`${path}/:documentId`}
          component={SingleDocumentView}
        />
      </Switch>
    </Suspense>
  );
}

export { LettersAndDocumentsRoutes };
