import axios from "axios";
//import { getClientContext, getClientContextCB } from './ApiHeaders';
import token from "../token.js";
import config from '../../../config/env-config';
const apiParams = {
  accessToken: token.accessToken(),
  clientContext: token.getClientContext(),
  bankId: token.getBankId()
};

const requestHeaders = {
  "x-bpi-client-context": JSON.stringify(apiParams.clientContext),
  "x-bpi-version": "1.2.0",
  Authorization: apiParams.accessToken,
  "Content-Type": "application/json"
};

const accountRequestHeader = {
  "x-bpi-client-context": JSON.stringify(apiParams.clientContext),
  "x-bpi-version": "0.8.0",
  Authorization: apiParams.accessToken,
  "Content-Type": "application/json"
};

class ApiUtils {
  static makeRequest(apiData, onSuccess, onFail) {
    apiData.url = apiData.url.replace("{bank_id}", apiParams.bankId);
    switch (apiData.method) {
      case "GET":
        if (
          apiData.url !==
          `${config.apiBaseUrl}/banks/${apiParams.bankId}/accounts/default`
        ) {
          return axios
            .get(apiData.url, { headers: requestHeaders })
            .then(response => {
              onSuccess(response.data);
            })
            .catch(error => {
              onFail(error);
            });
        } else
          return axios
            .get(apiData.url, { headers: accountRequestHeader })
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
