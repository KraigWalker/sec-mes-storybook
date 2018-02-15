const token = {
    acccessToken() {
        let accessToken = new window.URL(window.location.href);
        let params;
        let hasKeyValue = {};
        let bearer = 'Bearer ';
        let bearerToken = 'Bearer 7b676003-7794-4dea-975f-7ce97f4463b2';
        if (accessToken.hash.length > 0 && window.location.hash) {
            params = accessToken.hash.substr(1);
            hasKeyValue.accessToken = params.split('=')[1];
        }
        if (hasKeyValue.accessToken !== undefined) {
            bearerToken = bearer + hasKeyValue.accessToken;
        } 
        return bearerToken
    }
};

export default token;