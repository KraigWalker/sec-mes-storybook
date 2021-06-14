import { AppRouter } from './features/routes/AppRouter';
import { useDispatch } from 'react-redux';
import { fetchConfig } from './features/config/configSlice';
import { useEffect } from 'react';

function App({ isSMEUser = false }) {
  /**
   * @todo get isSMEUser via redux hook
   * If the user is an SME User, then there are special restrictions
   * that may effect them.
   * Only Business Administrators can view messages for example, so
   * we'd have to check that.
   */

  const dispatch = useDispatch();

  useEffect(
    /**
     * Fetch the contents of `config.json` on startup.
     */
    function startupFetchConfigHook() {
      dispatch(fetchConfig());
    },
    [dispatch]
  );

  return <AppRouter hideLettersAndDocuments={isSMEUser} />;
}

export { App };
