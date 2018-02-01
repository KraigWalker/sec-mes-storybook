
import axios from "axios";
import ApiUtils from './ApiUtils';
import config from '../config';
import SendMessageRequestEntity from '../entities/SendMessageRequestEntity';
import { parseDraft } from '../parsers/MessageParser';
import { updateMessage } from '../parsers/MessageParser';
const _getMessageURLEndpoint = '/banks/CB/securemessages';
const _getMessageSubjectsURL = '/banks/CB/securemessages/subjects';
//const _getAccountsURL = 'http://localhost:8000/js/content/getAccounts.json';
const _getAccountsURL = '/banks/CB/accounts';
const _sendMessageURL = '/banks/CB/securemessages/{message_id}';
class AppApi {
  static fetchSecureMessages(success, error) {
    ApiUtils.makeRequest({ url: config.apiBaseUrl + _getMessageURLEndpoint, method: 'GET' }, success, error);
  }

  static getSubjects(success, error) {
    ApiUtils.makeRequest({ url: config.apiBaseUrl + _getMessageSubjectsURL, method: 'GET' }, success, error);
  }

  static getAccounts(success, error) {
    ApiUtils.makeRequest({ url: config.apiBaseUrl + _getAccountsURL, method: 'GET' }, success, error);
  }

  static sendMessageData(requestData, success, error) {
    let reqData = parseDraft(requestData);
    ApiUtils.makeRequest({ url: config.apiBaseUrl + _getMessageURLEndpoint, method: 'POST', requestData: reqData }, success, error);
  }

  static updateMessageData(requestData, id, status, success, error) {
    let reqData = updateMessage(requestData, id, status);
    let updateUrl = config.apiBaseUrl + _sendMessageURL;
    let url = updateUrl.replace('{message_id}', id);
    ApiUtils.makeRequest({ url: url, method: 'PUT', requestData: reqData }, success, error);
  }
}

export default AppApi;
