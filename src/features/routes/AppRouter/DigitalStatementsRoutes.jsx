import { Switch, Route, useRouteMatch } from 'react-router-dom';
import loadable from '@loadable/component';

const SelectAccountView = loadable(
  import('../../digitalStatements/views/AccountSelectorView')
);

/** @todo consider removing hyphenation as this is an inconsistent pattern */

function DigitalStatementsRoutes() {
  // The `path` lets us build <Route> paths that are
  // relative to the parent route, while the `url` lets
  // us build relative links.
  let { path } = useRouteMatch();

  return (
    <Switch>
      <Route
        exact
        path={`${path}/select-account}`}
        component={SelectAccountView}
      />
    </Switch>
  );
}

export { DigitalStatementsRoutes };
