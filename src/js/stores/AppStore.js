import { applyMiddleware, createStore, compose } from 'redux';
import {
  buildMiddleware,
  dependencies as docDependencies,
} from 'document-management-lib';
import AppApi from '../api/AppApi';
import getReducer from '../reducers';

const composeEnhancers =
  process.env.NODE_ENV !== 'production' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

const middleware = (
  session,
  clientContext,
  config,
  dependencies = {
    native: docDependencies.native,
    api: new docDependencies.Api(clientContext, session, {
      apiBaseUrlPAAS: config.paasBaseApiUrl,
      apiBaseUrl: config.libertyBaseApiUrl,
    }), // documentManagmentApi
    secureMessagesApi: new AppApi(config, clientContext, session),
  }
) => {
  return applyMiddleware(
    buildMiddleware(
      clientContext,
      session,
      {
        apiBaseUrlPAAS: config.paasBaseApiUrl,
        apiBaseUrl: config.libertyBaseApiUrl,
      },
      dependencies
    )
  );
};

export default (session, clientContext, config, dependencies) => {
  return createStore(
    getReducer(session.brand),
    composeEnhancers(middleware(session, clientContext, config, dependencies))
  );
};
