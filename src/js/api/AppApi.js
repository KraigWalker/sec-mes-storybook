
import axios from "axios";
import ApiUtils from './ApiUtils';
import config from '../config';
import SendMessageRequestEntity from '../entities/SendMessageRequestEntity';
import { parseDraft, deleteMessage, updateMessage } from '../parsers/MessageParser';
const _getMessageURLEndpoint = '/banks/CB/securemessages';
const _getMessageSubjectsURL = '/banks/CB/securemessages/subjects';
//const _getAccountsURL = 'http://localhost:8000/js/content/getAccounts.json';
const _getAccountsURL = '/banks/CB/accounts';
const _sendMessageURL = '/banks/CB/securemessages/825f7b50-f908-48d6-96fb-ecf086593b75';
class AppApi {
  static fetchSecureMessages(success, error) {
    ApiUtils.makeRequest({ url: config.apiBaseUrl + _getMessageURLEndpoint, method: 'GET' }, success, error);
  }
  static getSubjects(success, error) {
    ApiUtils.makeRequest({ url: config.apiBaseUrl +  _getMessageSubjectsURL, method: 'GET' }, success, error);
  }
  static getAccounts(success,error) {
    ApiUtils.makeRequest({ url: config.apiBaseUrl + _getAccountsURL, method: 'GET' }, success, error);
  }
  static sendMessageData(requestData,success,error) {
    let reqData = parseDraft(requestData);
    ApiUtils.makeRequest({ url: config.apiBaseUrl + _getMessageURLEndpoint, method: 'POST', requestData : reqData}, success, error);
  }
  static updateMessage(requestData,success,error){
    console.log('UPDATE MESSAGE DATA', requestData)
   ApiUtils.makeRequest({ url: config.apiBaseUrl + _sendMessageURL, method: 'POST' ,requestData : updateMessage()}, success, error);
  }
  static sendDeleteMessageData(deleteData,success,error){
    console.log('DELETE DATA',deleteData);
    ApiUtils.makeRequest({ url: config.apiBaseUrl + _sendMessageURL, method: 'DELETE' ,deleteData : deleteMessage()}, success, error);
  }
  // static sendDraftMessageData(draftData,success,error){
  //   console.log('Draft DATA',draftData);
  //   let updateUrl = config.apiBaseUrl + _sendMessageURL;
  //   let url = updateUrl.replace('{message_id}', "822000-12341234");
  //   console.log(url);
  //    ApiUtils.makeRequest({ url: url, method: 'PUT' ,requestData : SendMessageRequestEntity.getMessageRequestData()}, success, error);
  //   }
  }

export default AppApi;
