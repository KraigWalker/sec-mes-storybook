import { applyMiddleware, createStore } from "redux"

import logger from "redux-logger"
import thunk from "redux-thunk"

import reducer from "../reducers"
import { buildMiddleware } from "document-management-web-ui";

const middleware = applyMiddleware(
    buildMiddleware({}, {}, { apiBaseUrl: "http://localhost:8888" })
)

export default createStore(reducer, middleware)