
import axios from "axios";
import ApiUtils from './ApiUtils';
import config from '../config';
import SendMessageRequestEntity from '../entities/SendMessageRequestEntity';
import { parseDraft, deleteMessage } from '../parsers/MessageParser';
import { updateMessage } from '../parsers/MessageParser';
const _getMessageURLEndpoint = '/banks/{bank_id}/securemessages';
const _getMessageSubjectsURL = '/banks/{bank_id}/securemessages/subjects';
//const _getAccountsURL = 'http://localhost:8000/js/content/getAccounts.json';
const _getAccountsURL = '/banks/{bank_id}/accounts/default';
const _sendMessageURL = '/banks/{bank_id}/securemessages/{message_id}';



class AppApi {
  static fetchSecureMessages(success, error) {
    ApiUtils.makeRequest({ url: config.apiBaseUrl + _getMessageURLEndpoint, method: 'GET' }, success, error);
  }

  static getSubjects(success, error) {
    ApiUtils.makeRequest({ url: config.apiBaseUrl + _getMessageSubjectsURL, method: 'GET' }, success, error);
  }

  static getAccounts(success, error) {
    // ApiUtils.makeRequest({ url: config.apiBaseUrl + _getAccountsURL, method: 'GET' }, success, error);
  }

  static sendMessageData(requestData, status, success, error) {
    let reqData = parseDraft(requestData, status);
    ApiUtils.makeRequest({ url: config.apiBaseUrl + _getMessageURLEndpoint, method: 'POST', requestData: reqData }, success, error);
  }
  static updateMessageData(requestData, id, status, success, error) {
    let updateUrl = config.apiBaseUrl + _sendMessageURL;
    let url = updateUrl.replace('{message_id}', id);
    let reqData;
    switch(status){
      case 'DELETED' :
       reqData = deleteMessage(requestData, id, status);
      break;
      case 'SENT' :
        reqData = updateMessage(requestData, id, status);
      break;
      case  'DRAFT' :
        reqData = updateMessage(requestData, id, status);
      break;
      case 'PENDING' :
        reqData = updateMessage(requestData, id, status);
      break;
      case 'READ' :
        reqData = deleteMessage(requestData, id, status);
    }
   ApiUtils.makeRequest({ url: url, method: 'PUT', requestData: reqData }, success, error);
  }
 }

export default AppApi;
