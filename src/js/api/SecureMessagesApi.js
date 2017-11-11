
import axios from "axios";

class SecureMessagesApi {
  getSecureMessages(success, error, meoData) {
    axios.get('http://localhost:8000/js/content/getSecureMessages.json')
    .then(response =>  { success(response.data) })
    .catch(err =>  { error(err) });
  }
}

export default new SecureMessagesApi();
