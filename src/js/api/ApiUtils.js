import axios from 'axios';
const requestHeaders = {

};

class ApiUtils {
    static makeRequest(apiData, onSuccess, onFail) {
        switch (apiData.method) {
            case 'GET':
                return axios.get(apiData.url)
                    .then(response => { onSuccess(response); })
                    .catch(error => { onFail(error); });
            case 'POST':
                return axios.post(apiData.url, apiData.requestData, requestHeaders)
                    .then(response => { onSuccess(response); })
                    .catch(error =>{ onFail(error); });
        }
    }
}

export default ApiUtils;
