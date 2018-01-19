
import axios from "axios";
import ApiUtils from './ApiUtils';
import config from '../config';
const _getMessageURLEndpoint = '/banks/CB/securemessages';
const _getMessageSubjectsURL = '/banks/CB/securemessages/subjects';
const _getAccountsURL = 'http://localhost:8000/js/content/getAccounts.json';
//const __sendMessageURL = '/banks/CB/securemessages/{message_id}';
class AppApi {
  static fetchSecureMessages(success, error) {
    ApiUtils.makeRequest({ url: config.apiBaseUrl + _getMessageURLEndpoint, method: 'GET' }, success, error);
  }
  static getSubjects(success, error) {
    ApiUtils.makeRequest({ url: config.apiBaseUrl +  _getMessageSubjectsURL, method: 'GET' }, success, error);
  }
  static getAccounts(success,error) {
    ApiUtils.makeRequest({ url: _getAccountsURL, method: 'GET' }, success, error);
  }
  static sendMessageData(requestData,success,error) {
    console.log('SEND MESSAGE DATA:',requestData);
   // ApiUtils.makeRequest({ url: _sendMessageURL, method: 'POST' ,requestData : SendMessageRequestEntity.getMessageRequestData()}, success, error);
  }
  static updateMessage(requestData,success,error){
    console.log('UPDATE MESSAGE DATA', requestData)
   ApiUtils.makeRequest({ url: _sendMessageURL, method: 'POST' ,requestData : SendMessageRequestEntity.getMessageRequestData()}, success, error);
  }
  static sendDeleteMessageData(deleteData,success,error){
    console.log('DELETE DATA',deleteData);
  }
  static sendDraftMessageData(draftData,success,error){
    console.log('Draft DATA',draftData);
  }
  
}

export default AppApi;
