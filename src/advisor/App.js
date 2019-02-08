import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import AppRouter from './router/AppRouter.advisor';
import createStore from './stores/AppStore';
import ConfigUtils from './utils/ConfigUtils';
import token from "./token";
import { getTheme, WebUIThemeProvider } from "web-ui-components/lib/utilities/themes";

const app = document.getElementById('app');
 /**
  * Starts the application with the Provider Wrapper from Redux
  * @return {ReactComponent} AppRouter which initiates the application.
 */
const parseHash = hash => hash
  .split("&")
  .map(v => v.split("="))
  .reduce( (pre, [key, value]) => ({ ...pre, [key]: value }), {} )

const hash = parseHash(window.location.hash.substring(1));



const clientContext = token.getClientContext();


const App = ({ config }) => {
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

    const store = createStore(session);

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
