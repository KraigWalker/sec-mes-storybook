import axios from "axios";

class ApiUtils {
  constructor(clientContext, accessToken, bankId) {
    this.bankId = bankId;
    this.requestHeaders = {
      "x-bpi-client-context": JSON.stringify(clientContext),
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
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
          .get(apiData.url, { headers: this.requestHeaders })
          .post(apiData.url, apiData.requestData, { headers: this.requestHeaders })
          .then(response => {
            onSuccess(response);
          })
          .catch(error => {
            onFail(error);
          });
      case "PUT":
        return axios
          .get(apiData.url, { headers: this.requestHeaders })
          .put(apiData.url, apiData.requestData, { headers: this.requestHeaders })
          .then(response => {
            onSuccess(response);
          })
          .catch(error => {
            onFail(error);
          });
      case "DELETE":
        return axios
          .get(apiData.url, { headers: this.requestHeaders })
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

export default ApiUtils;
