import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { dependencies } from 'document-management-lib';
import { WebUIThemeProvider } from 'web-ui-components/lib/utilities/themes';
import AppRouter from './router/AppRouter.advisor';
import createStore from './stores/AppStore';
import { setMode } from './actions/AppActions';
import StringConstants from './constants/StringsConstants';
import { buildClientContext } from './utils/ContextUtils';
import AppApi from './api/AppApi';
import ApiUtils, { getStaffHeaders } from './api/ApiUtils';
import './polyfill';

export const App = ({ config }) => {
  const clientContext = buildClientContext(
    config.appTitle,
    config.userTrackingId,
    config.state
  );

  const session = {
    access_token: config.accessToken,
    bank_id: config.bankId,
    brand: config.brandId,
    customer_number: config.customerNumber,
  };

  const envConfig = {
    libertyBaseApiUrl: config.bpiApiUrl,
    paasBaseApiUrl: config.ibApiUrl + '/ibapi/v2',
    enableCategoryAttachmentParam: config.enableCategoryAttachmentParam,
  };

  const staffHeaders = getStaffHeaders(session);

  const apiUtils = new ApiUtils(
    clientContext,
    session.access_token,
    session.bank_id,
    staffHeaders
  );

  const deps = {
    native: dependencies.native,
    api: new dependencies.InternalApi(clientContext, session, {
      libertyBaseApiUrl: envConfig.paasBaseApiUrl,
    }),
    secureMessagesApi: new AppApi(envConfig, clientContext, session, apiUtils),
  };

  const store = createStore(session, clientContext, envConfig, deps);
  store.dispatch(setMode(StringConstants.READ_ONLY));

  return (
    <Provider store={store}>
      <WebUIThemeProvider brandID={config.brandId}>
        <AppRouter session={session} client={clientContext} />
      </WebUIThemeProvider>
    </Provider>
  );
};

App.propTypes = {
  config: PropTypes.shape({
    bankId: PropTypes.string.isRequired,
    brandId: PropTypes.string.isRequired,
    staffId: PropTypes.string.isRequired,
    staffBranchSortCode: PropTypes.string.isRequired,
    appTitle: PropTypes.string.isRequired,
    bpiApiUrl: PropTypes.string.isRequired,
    ibApiUrl: PropTypes.string.isRequired,
    staffTokenServiceUrl: PropTypes.string.isRequired,
  }).isRequired,
};
