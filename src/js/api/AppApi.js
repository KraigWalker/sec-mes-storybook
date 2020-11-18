import ApiUtils from './ApiUtils';
import {
  createNewMessage,
  updateExistingMessage,
} from '../parsers/MessageParser';

const _getMessageURLEndpoint = '/banks/{bank_id}/securemessages';
const _getMessageSubjectsURL = '/banks/{bank_id}/securemessages/subjects';
const _getAccountsURL = '/banks/{bank_id}/accounts/default';
const _sendMessageURL = '/banks/{bank_id}/securemessages/{message_id}';

class AppApi {
  constructor(
    config,
    clientContext,
    session,
    apiUtils = new ApiUtils(
      clientContext,
      session.access_token,
      session.bank_id
    )
  ) {
    this.config = config;
    this.apiUtils = apiUtils;
    this.callAPI = this.callAPI.bind(this);
  }

  fetchSecureMessages(success, error) {
    this.apiUtils.makeRequest(
      {
        url: `${this.config.paasBaseApiUrl}${_getMessageURLEndpoint}`,
        method: 'GET',
        apiVersion: '1.2.0',
      },
      success,
      error
    );
  }

  getSubjects(success, error) {
    this.apiUtils.makeRequest(
      {
        url: `${this.config.paasBaseApiUrl}${_getMessageSubjectsURL}`,
        method: 'GET',
        apiVersion: '1.2.0',
      },
      success,
      error
    );
  }

  getAccounts(success, error) {
    this.apiUtils.makeRequest(
      {
        url: `${this.config.paasBaseApiUrl}${_getAccountsURL}`,
        method: 'GET',
        apiVersion: '0.8.0',
      },
      success,
      error
    );
  }

  callAPI({ action, url, reqData, success, error }) {
    if (!url) {
      url = `${this.config.paasBaseApiUrl}${_getMessageURLEndpoint}`;
    }
    this.apiUtils.makeRequest(
      {
        url,
        method: action,
        apiVersion: '1.2.0',
        requestData: reqData,
      },
      success,
      error
    );
  }

  createNewMessage({ requestData, ids, status, name, success, error }) {
    const reqData = createNewMessage({
      data: requestData,
      ids,
      status,
      name,
    });
    this.callAPI({
      action: 'POST',
      reqData,
      success,
      error,
    });
  }

  updateExistingMessage({ requestData, status, success, error }) {
    const updateUrl = `${this.config.paasBaseApiUrl}${_sendMessageURL}`;
    const url = updateUrl.replace('{message_id}', requestData.id);
    const reqData = updateExistingMessage({
      data: requestData,
      status,
    });
    this.callAPI({
      action: 'PUT',
      url,
      reqData,
      success,
      error,
    });
  }
}

export default AppApi;
