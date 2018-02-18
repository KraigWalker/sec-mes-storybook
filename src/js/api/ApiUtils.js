import axios from 'axios';
import { getClientContext, getClientContextCB } from './ApiHeaders';
import token from '../token.js';
const requestHeaders = {
    'x-bpi-client-context': JSON.stringify(getClientContext()),
    'x-bpi-version': '1.2.0',
    'Authorization': token.acccessToken(),
    'Content-Type': 'application/json',
};

const accountRequestHeader = {
    'x-bpi-client-context': JSON.stringify(getClientContextCB()),
    'x-bpi-version': '0.8.0',
    'Authorization': token.acccessToken(),
    'Content-Type': 'application/json',
}

class ApiUtils {
    static makeRequest(apiData, onSuccess, onFail) {
        switch (apiData.method) {
            case 'GET':
                if (apiData.url !== 'https://my-dev.cybservices.co.uk/bpiInt3/banks/CB/accounts/default') {
                    return axios.get(apiData.url, { headers: requestHeaders })
                        .then(response => { onSuccess(response.data); })
                        .catch(error => { onFail(error); });
                }
                else return axios.get(apiData.url, { headers: accountRequestHeader })
                    .then(response => { onSuccess(response.data); })
                    .catch(error => { onFail(error); });

            case 'POST':
                return axios.post(apiData.url, apiData.requestData, { headers: requestHeaders })
                    .then(response => {
                        onSuccess(response);
                    })
                    .catch(error => { onFail(error); });
            case 'PUT':
                return axios.put(apiData.url, apiData.requestData, { headers: requestHeaders })
                    .then(response => { onSuccess(response); })
                    .catch(error => { onFail(error); });
            case 'DELETE':
                return axios.delete(apiData.url, apiData.requestData, { headers: requestHeaders })
                    .then(response => { onSuccess(response.data); })
                    .catch(error => { onFail(error); });
        }
    }
}

export default ApiUtils;
