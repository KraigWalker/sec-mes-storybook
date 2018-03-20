const token = {
    accessToken() {
        let accessToken = window.location;
        let hashKeyValue = {};
        let hashValue = {};
        let params;
        let bearer = 'Bearer ';
        let bearerToken = 'Bearer 7b676003-7794-4dea-975f-7ce97f4463b2';
        if (accessToken.hash.length > 0 && window.location.hash) {
            params = accessToken.hash.substr(1);
            hashKeyValue.accessToken = params.split('&')[0];
            hashValue.accessToken = hashKeyValue.accessToken.split('=')[1];
            if (hashValue.accessToken !== undefined) {
                bearerToken = bearer + hashValue.accessToken;
            }
        }
        return bearerToken;
    },
    getBankId() {
        let accessToken = window.location;
        let hashKeyValue = {};
        let hashValue = {};
        let params;
        let bankID = 'CB';
        if (accessToken.hash.length > 0 && window.location.hash) {
            params = accessToken.hash.substr(1);
            hashKeyValue.bankId = params.split('&')[1];
            hashValue.bankId = hashKeyValue.bankId.split('=')[1];
            if(hashValue.bankId !== undefined){
                bankID = hashValue.bankId;
            };
        }
        return bankID;
    },
    getClientContext() {
        let accessToken = window.location;
        let hashKeyValue = {};
        let hashValue = {};
        let params;
        if (accessToken.hash.length > 0 && window.location.hash) {
            params = accessToken.hash.substr(1);
            hashKeyValue.appTitle = params.split('&')[2];
            hashValue.appTitle = hashKeyValue.appTitle.split('=')[1];
            hashValue.appTitle = hashValue.appTitle.replace("%20", " ");
            hashKeyValue.userTrackingId = params.split('&')[3];
            hashValue.userTrackingId = hashKeyValue.userTrackingId.split('=')[1];
        }
        return {
            client: {
                app_title: hashValue.appTitle | 'CB Web',
                user_tracking_id: hashValue.userTrackingId | null 
            }
        }
    },

};

export default token;