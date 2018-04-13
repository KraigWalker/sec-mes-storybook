
import axios from "axios";
import ApiUtils from './ApiUtils';
import SendMessageRequestEntity from '../entities/SendMessageRequestEntity';
import { parseDraft, deleteMessage, replyMessage, updateMessage } from '../parsers/MessageParser';
const _getMessageURLEndpoint = '/banks/{bank_id}/securemessages';
const _getMessageSubjectsURL = '/banks/{bank_id}/securemessages/subjects';
//const _getAccountsURL = 'http://localhost:8000/js/content/getAccounts.json';
const _getAccountsURL = '/banks/{bank_id}/accounts/default';
const _sendMessageURL = '/banks/{bank_id}/securemessages/{message_id}';
import StringsConstants from '../constants/StringsConstants.js';
import ConfigUtils  from '../utils/ConfigUtils';

class AppApi {

  static fetchSecureMessages(success, error) {
    ApiUtils.makeRequest({ url: `${ConfigUtils.config.apiBaseUrl}${_getMessageURLEndpoint}`, method: 'GET', apiVersion: "1.2.0" }, success, error);
  }

  static getSubjects(success, error) {
    ApiUtils.makeRequest({ url: `${ConfigUtils.config.apiBaseUrl}${_getMessageSubjectsURL}`, method: 'GET', apiVersion: "1.2.0" }, success, error);
  }

  static getAccounts(success, error) {
     ApiUtils.makeRequest({ url:`${ConfigUtils.config.apiBaseUrl}${_getAccountsURL}`, method: 'GET', apiVersion: "0.8.0" }, success, error);
  }

  static sendMessageData(requestData, status, success, error) {
    let reqData = parseDraft(requestData, status);
    ApiUtils.makeRequest({ url: `${config.apiBaseUrl}${_getMessageURLEndpoint}`, method: 'POST', apiVersion: "1.2.0", requestData: reqData }, success, error);
  }

  static replyMessageData(requestData, ids, status, success, error) {
    let reqData = replyMessage(requestData, ids, status);
    ApiUtils.makeRequest({ url: `${config.apiBaseUrl}${_getMessageURLEndpoint}`, method: 'POST', apiVersion: "1.2.0", requestData: reqData }, success, error);
  }

  static updateMessageData(requestData, id, status, success, error) {
    let updateUrl = `${config.apiBaseUrl}${_sendMessageURL}`;
    let url = updateUrl.replace('{message_id}', id);
    let reqData;
    switch(status){
      case StringsConstants.DELETED :
       reqData = deleteMessage(requestData, id, status);
      break;
      case  StringsConstants.DRAFT :
        reqData = updateMessage(requestData, id, status);
      break;
      case StringsConstants.PENDING :
        reqData = updateMessage(requestData, id, status);
      break;
      case StringsConstants.READ :
        reqData = deleteMessage(requestData, id, status);
    }
   ApiUtils.makeRequest({ url: url, method: 'PUT', requestData: reqData, apiVersion: "1.2.0" }, success, error);
  }
 }

export default AppApi;
