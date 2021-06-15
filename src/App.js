import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppRouter } from './features/routes/AppRouter';
import { appStartup } from './features/config/configSlice';

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
    function startupHook() {
      dispatch(appStartup());
    },
    [dispatch]
  );

  return <AppRouter hideLettersAndDocuments={isSMEUser} />;
}

export { App };
