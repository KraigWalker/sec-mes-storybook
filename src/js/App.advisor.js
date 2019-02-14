import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from "react-redux";
import AppRouter from './router/AppRouter.advisor';
import createStore from './stores/AppStore';
import { getTheme, WebUIThemeProvider } from "web-ui-components/lib/utilities/themes";
import { setMode } from './actions/AppActions';
import StringConstants from './constants/StringsConstants';
import { buildClientContext } from './utils/ContextUtils';

export const App = ({ config }) => {

    const clientContext = buildClientContext(config.appTitle, config.userTrackingId, config.state);

    const session = {
        access_token: config.accessToken,
        bank_id: config.bankId,
        brand: config.branId
    };

    const defaultTheme = getTheme(config.brandId);
    const theme = {
        ...defaultTheme,
        fonts: {
            ...defaultTheme.fonts,
            display: {
                // Limitiation of component library within "non-web-component" app
                bold: "CYBHouschkaAltProBold !important"
            }
        }
    };

    const envConfig = {
        apiBaseUrl: config.bpiApiUrl,
        apiBaseUrl2: config.ibApiUrl
    }

    const store = createStore(session, clientContext, envConfig);

    store.dispatch(setMode(StringConstants.READ_ONLY));
    console.log(AppRouter);
    return (
        <Provider store={store}>
            <WebUIThemeProvider theme={theme}>
                <AppRouter session={session} client={clientContext}/>
            </WebUIThemeProvider>
        </Provider>
    )
};

App.PropTypes = {
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
}
