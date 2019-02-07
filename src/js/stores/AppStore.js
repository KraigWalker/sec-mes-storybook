import { applyMiddleware, createStore } from "redux"
import { buildMiddleware } from "document-management-web-ui";


import reducer from "../reducers";

const middleware = (session, clientContext, config) => applyMiddleware(
    buildMiddleware(clientContext, session, { apiBaseUrl: config.apiBaseUrl3 })
)

export default (session, clientContext, config) => createStore(reducer, middleware(session, clientContext, config))