
import axios from "axios";
import ApiUtils from './ApiUtils';

const _getMessageURL = 'http://localhost:8000/js/content/getSecureMessages.json';
const _getMessageSubjectsURL = 'http://localhost:8000/js/content/messageSubjectsResponse.json';
const _getAccountsURL = 'http://localhost:8000/js/content/getAccounts.json';
class AppApi {
  static getSecureMessages(success, error) {
    ApiUtils.makeRequest({ url: _getMessageURL, method: 'GET' }, success, error);
  }
  static getSubjects(success, error) {
    ApiUtils.makeRequest({ url: _getMessageSubjectsURL, method: 'GET' }, success, error);
  }
  static getAccounts(success,error) {
    ApiUtils.makeRequest({ url: _getAccountsURL, method: 'GET' }, success, error);
  }
}

export default AppApi;
