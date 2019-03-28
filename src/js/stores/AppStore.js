import { applyMiddleware, createStore, compose } from "redux"
import { buildMiddleware, dependencies as docDependencies } from "document-management-web-ui";
import AppApi from "../api/AppApi";
import reducer from "../reducers";

const composeEnhancers = (process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) 
                            ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
                            : compose;

const middleware = (session, clientContext, config, dependencies = {
    native: docDependencies.native,
    api: new docDependencies.Api(clientContext, session, {
        apiBaseUrl: config.apiBaseUrl2
    }), // documentManagmentApi
    secureMessagesApi: new AppApi(config, clientContext, session)
}) => {
    return applyMiddleware(
        buildMiddleware(clientContext, session, { apiBaseUrl: config.apiBaseUrl2 }, dependencies)
    );
};

export default (session, clientContext, config, dependencies) => createStore(reducer, composeEnhancers(middleware(session, clientContext, config, dependencies)))