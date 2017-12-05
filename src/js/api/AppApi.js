
import axios from "axios";
import ApiUtils from './ApiUtils';

const _getMessageURL = 'http://localhost:8000/js/content/getSecureMessages.json';
const _getMessageSubjectsURL = 'http://localhost:8000/js/content/messageSubjectsResponse.json';
const _getAccountsURL = 'http://localhost:8000/js/content/getAccounts.json';
class AppApi {
  static fetchSecureMessages(success, error) {
    ApiUtils.makeRequest({ url: _getMessageURL, method: 'GET' }, success, error);
  }
  static getSubjects(success, error) {
    ApiUtils.makeRequest({ url: _getMessageSubjectsURL, method: 'GET' }, success, error);
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
    // ApiUtils.makeRequest({ url: _sendMessageURL, method: 'POST' ,requestData : SendMessageRequestEntity.getMessageRequestData()}, success, error);
  }
  static sendDeleteMessageData(deleteData,success,error){
    console.log('DELETE DATA',deleteData);
  }
  static sendDraftMessageData(draftData,success,error){
    console.log('Draft DATA',draftData);
  }
  
}

export default AppApi;
