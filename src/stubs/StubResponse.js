class StubResponse {
  getConsent() {
    const consentResponse =
        {
       "user_id" : "123456",
       "consents" : [
          {
             "consent_id" : "67889",
             "client_id" : "00000",
             "client_name" : "Amazon",
             "scope_name" : "<scope_name>",
             "scope_description" : "<scope_description>",
             "consent_format" : "<consent_format>",
             "required_trust_level" : "<required_trust_level>",
             "start_date" : "2017-04-14T01:00:00+01:00",
             "expiry_date" : "2017-07-14T01:00:00+01:00",
             "client_scope_credentials" : [
                {
                   "credential_type" : "Active",
                   "pin_type" : "SET"
                }
             ],
             "client_scope_tandcs_applicable" : "false",
             "client_scope_tandcs_service_name" : "<service_name>",
             "must_accept_new_client_scope_tandcs" : "false",
             "thumbnail_link" : "<url to third party logo>",
             "accounts" : [
                {
                   "account_number" : "121212-19857624",
                   "account_name" : "B Current",
                   "nickname" : "Nickname",
                   "product_type" : "IM136"
                },
             ]
          },
       ]
    };
    return consentResponse;
  }
}
