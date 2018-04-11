import axios from "axios";
//import { getClientContext, getClientContextCB } from './ApiHeaders';
import token from "../token.js";
const apiParams = {
  accessToken: token.accessToken(),
  clientContext: token.getClientContext(),
  bankId: token.getBankId()
};

const requestHeaders = {
  "x-bpi-client-context": JSON.stringify(apiParams.clientContext),
  Authorization: apiParams.accessToken,
  "Content-Type": "application/json"
};

class ApiUtils {
  static makeRequest(apiData, onSuccess, onFail) {
    apiData.url = apiData.url.replace("{bank_id}", apiParams.bankId);
    requestHeaders["x-bpi-version"] = apiData.apiVersion;
    switch (apiData.method) {
      case "GET":
          return axios
            .get(apiData.url, { headers: requestHeaders })
            .then(response => {
              onSuccess(response.data);
            })
            .catch(error => {
              onFail(error);
            });
      case "POST":
        return axios
          .post(apiData.url, apiData.requestData, { headers: requestHeaders })
          .then(response => {
            onSuccess(response);
          })
          .catch(error => {
            onFail(error);
          });
      case "PUT":
        return axios
          .put(apiData.url, apiData.requestData, { headers: requestHeaders })
          .then(response => {
            onSuccess(response);
          })
          .catch(error => {
            onFail(error);
          });
      case "DELETE":
        return axios
          .delete(apiData.url, apiData.requestData, { headers: requestHeaders })
          .then(response => {
            onSuccess(response.data);
          })
          .catch(error => {
            onFail(error);
          });
    }
  }
}

export default ApiUtils;
