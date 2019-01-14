import { applyMiddleware, createStore } from "redux"
import { buildMiddleware } from "document-management-web-ui";

import reducer from "../reducers";

const middleware = (session, clientContext) => applyMiddleware(
    buildMiddleware(clientContext, session, { apiBaseUrl: "http://localhost:8888" })
)

export default (session, clientContext) => createStore(reducer, middleware(session, clientContext))