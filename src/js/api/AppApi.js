import ApiUtils from "./ApiUtils";
import {
  createNewMessage,
  replyMessage,
  updateMessage
} from "../parsers/MessageParser";

const _getMessageURLEndpoint = "/banks/{bank_id}/securemessages";
const _getMessageSubjectsURL = "/banks/{bank_id}/securemessages/subjects";
const _getAccountsURL = "/banks/{bank_id}/accounts/default";
const _sendMessageURL = "/banks/{bank_id}/securemessages/{message_id}";
const _getAccountSegmentEndpoint = "/banks/{bank_id}/customers";
const _getCustomerDetailsEndpoint = "/banks/{bank_id}/customers/{customer_id}";

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
  }
  fetchSecureMessages(success, error) {
    this.apiUtils.makeRequest(
      {
        url: `${this.config.apiBaseUrl2}${_getMessageURLEndpoint}`,
        method: "GET",
        apiVersion: "1.2.0"
      },
      success,
      error
    );
  }

  getSubjects(success, error) {
    this.apiUtils.makeRequest(
      {
        url: `${this.config.apiBaseUrl2}${_getMessageSubjectsURL}`,
        method: "GET",
        apiVersion: "1.2.0"
      },
      success,
      error
    );
  }

  getAccounts(success, error) {
    this.apiUtils.makeRequest(
      {
        url: `${this.config.apiBaseUrl2}${_getAccountsURL}`,
        method: "GET",
        apiVersion: "0.8.0"
      },
      success,
      error
    );
  }

  sendMessageData(requestData, status, name, success, error) {
    const reqData = createNewMessage(requestData, status, name);
    this.apiUtils.makeRequest(
      {
        url: `${this.config.apiBaseUrl2}${_getMessageURLEndpoint}`,
        method: "POST",
        apiVersion: "1.2.0",
        requestData: reqData
      },
      success,
      error
    );
  }


  replyMessageData(requestData, ids, status, name, success, error) {
    const reqData = replyMessage(requestData, ids, status, name);
    this.apiUtils.makeRequest(
      {
        url: `${this.config.apiBaseUrl2}${_getMessageURLEndpoint}`,
        method: "POST",
        apiVersion: "1.2.0",
        requestData: reqData
      },
      success,
      error
    );
  }

  updateMessageData(requestData, id, status, success, error) {
    const updateUrl = `${this.config.apiBaseUrl2}${_sendMessageURL}`;
	  const url = updateUrl.replace("{message_id}", id);

    const reqData = updateMessage(requestData, id, status);
    this.apiUtils.makeRequest(
      { url, method: "PUT", requestData: reqData, apiVersion: "1.2.0" },
      success,
      error
    );
  }
}

export default AppApi;
