import axios from "axios";
import moment from 'moment';

class ApiUtils {
  constructor(clientContext, accessToken, bankId, headers) {
    this.bankId = bankId;
    this.requestHeaders = {
      "x-bpi-client-context": JSON.stringify(clientContext),
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      ...headers,
    };
  }
  makeRequest(apiData, onSuccess, onFail) {
    apiData.url = apiData.url.replace("{bank_id}", this.bankId);
    this.requestHeaders["x-bpi-version"] = apiData.apiVersion;
    switch (apiData.method) {
      case "GET":
        return axios
          .get(apiData.url, { headers: this.requestHeaders })
          .then(response => {
            onSuccess(response.data);
          })
          .catch(error => {
            onFail(error);
          });
      case "POST":
        return axios
          .post(apiData.url, apiData.requestData, { headers: this.requestHeaders })
          .then(response => {
            onSuccess(response);
          })
          .catch(error => {
            onFail(error);
          });
      case "PUT":
        return axios
          .put(apiData.url, apiData.requestData, { headers: this.requestHeaders })
          .then(response => {
            onSuccess(response);
          })
          .catch(error => {
            onFail(error);
          });
      case "DELETE":
        return axios
          .delete(apiData.url, apiData.requestData, { headers: this.requestHeaders  })
          .then(response => {
            onSuccess(response.data);
          })
          .catch(error => {
            onFail(error);
          });
    }
  }
}

export const getStaffHeaders = (session) => ({
  "x-bpi-customer-id": session.customer_number,
  "x-bpi-trust-level": session.accessTokenScope || "40",
  "x-bpi-trust-created-dt": session.scopeCreatedDate || moment().format("YYYY-MM-DDTHH:mm:ss"),
  "x-bpi-customer-bank-id": session.bank_id
});

export default ApiUtils;
