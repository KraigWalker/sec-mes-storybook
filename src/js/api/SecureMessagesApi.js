
import axios from "axios";
// fetch("/login", {
//   method: "POST",
//   body: form
// })

class SecureMessagesApi {
  getSecureMessages(success, error, meoData) {
    // console.log("token api meo data: " + meoData.bank_id + " " + meoData.system_code);
    axios.get('http://localhost:8000/js/content/getSecureMessages.json')
    .then(response =>  { success(response.data) })
    .catch(err =>  { error(err) });
     
    /* axios.post('http://staff-token-service.95553401.nonprod.obps.io/ibapi/v2/stafftoken/token', {
         bank_id: meoData.bank_id,
         system_code: meoData.system_code
       },
      {
        headers: {
          'iv-groups':'eu-meo-group5-grp',
           'Content-Type':'application/json',
           'iv-user':'IntTest01',
           'Cache-Control':'no-cache'
        }  
      })
       .then(response => { success(response.data)})
       .catch(err => {error(err)})*/
  }
}

export default new SecureMessagesApi();
