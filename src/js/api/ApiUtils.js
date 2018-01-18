import axios from 'axios';
import { getClientContext, getToken } from './ApiHeaders';
const requestHeaders = {
    'x-bpi-client-context' : JSON.stringify(getClientContext()),
    'x-bpi-version' : '1.2.0',
    'Authorization' : getToken(),
    'Content-Type' : 'application/json',
};

class ApiUtils {
    static makeRequest(apiData, onSuccess, onFail) {
        switch (apiData.method) {
            case 'GET':
                return axios.get(apiData.url, { headers: requestHeaders })
                    .then(response => { onSuccess(response.data); })
                    .catch(error => { onFail(error); });
            case 'POST':
                return axios.post(apiData.url, apiData.requestData)
                    .then(response => { onSuccess(response.data); })
                    .catch(error =>{ onFail(error); });
        }
    }
}

export default ApiUtils;
