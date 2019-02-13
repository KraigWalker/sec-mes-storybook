import { applyMiddleware, createStore } from "redux"
import { buildMiddleware } from "document-management-web-ui";


import reducer from "../reducers";
console.log(buildMiddleware)
const middleware = (session, clientContext, config) => applyMiddleware(
    buildMiddleware(clientContext, session, { apiBaseUrl: config.apiBaseUrl2 })
)

export default (session, clientContext, config) => createStore(reducer, middleware(session, clientContext, config))