
import axios from "axios";
import ApiUtils from './ApiUtils';

const _getMessageURL = 'http://localhost:8000/js/content/getSecureMessages.json';
class AppApi {
  static getSecureMessages(success, error) {
    ApiUtils.makeRequest({ url: _getMessageURL, method: 'GET' }, success, error);
  }
}

export default AppApi;
