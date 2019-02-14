import { applyMiddleware, createStore } from "redux"
import { buildMiddleware } from "document-management-web-ui";
import AppApi from "../api/AppApi";
import reducer from "../reducers";

const middleware = (session, clientContext, config, dependencies = {
    native: dependencies.native,
    api: dependencies.api,
    secureMessagesApi: new AppApi(config, clientContext, session)
}) => { 
    return applyMiddleware(
        buildMiddleware(clientContext, session, { apiBaseUrl: config.apiBaseUrl2 }, dependencies)
    );
};

export default (session, clientContext, config, dependencies) => createStore(reducer, middleware(session, clientContext, config, dependencies))