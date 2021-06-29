import { Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import loadable from '@loadable/component';

const BASE = '/';
const OLD_SECURE_MESSAGES_PATH = '/securemessages';
const OLD_LETTERS_AND_DOCUMENTS_PATH = '/my-documents';
const SECURE_MESSAGES = '/secure-messages';
const LETTERS_AND_DOCUMENTS = '/documents';
const DIGITAL_STATEMENTS = '/digital-statements';

function EmptyComponent() {
  return null;
}

const SecureMessagesRoutes = loadable(() =>
  import('./SecureMessagesRoutes').then((module) => module.SecureMessagesRoutes)
);

const LettersAndDocumentsRoutes = loadable(() =>
  import('./LettersAndDocumentsRoutes').then(
    (module) => module.LettersAndDocumentsRoutes
  )
);
const DigitalStatementsRoutes = loadable(() =>
  import('./DigitalStatementsRoutes').then(
    (module) => module.DigitalStatementsRoutes
  )
);

function AppRouter() {
  return (
    <Suspense fallback={EmptyComponent}>
      <Switch>
        <Redirect from={OLD_SECURE_MESSAGES_PATH} to={SECURE_MESSAGES} />
        <Redirect
          from={OLD_LETTERS_AND_DOCUMENTS_PATH}
          to={LETTERS_AND_DOCUMENTS}
        />
        {/** @todo We actually wanna create a SecureMessagesAppLayout that provides handles `/secure-messages/*` */}
        <Route path={SECURE_MESSAGES} component={SecureMessagesRoutes} />
        <Route
          path={LETTERS_AND_DOCUMENTS}
          component={LettersAndDocumentsRoutes}
        />
        <Route path={DIGITAL_STATEMENTS} component={DigitalStatementsRoutes} />
        <Redirect exact from={BASE} to={SECURE_MESSAGES} />
      </Switch>
    </Suspense>
  );
}

export { AppRouter };
