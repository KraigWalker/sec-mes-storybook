import { AppRouter } from './features/routes/AppRouter';

function App({ isSMEUser = false }) {
  /** @todo get isSMEUser via redux hook */

  return <AppRouter hideLettersAndDocuments={isSMEUser} />;
}

export { App };
