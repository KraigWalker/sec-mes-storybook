import { applyMiddleware, createStore } from "redux"
import { buildMiddleware, dependencies } from "document-management-web-ui";
import AppApi from "../api/AppApi";

import reducer from "../reducers";
console.log(buildMiddleware)
const middleware = (session, clientContext, config) => { 
    return applyMiddleware(
        buildMiddleware(clientContext, session, { apiBaseUrl: config.apiBaseUrl2 }, {
            native: dependencies.native,
            api: dependencies.api,
            secureMessagesApi: new AppApi(config, clientContext, session)
        })
    );
};

export default (session, clientContext, config) => createStore(reducer, middleware(session, clientContext, config))