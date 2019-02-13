import { buildClientContext } from '../js/utils/ContextUtils';

const accessToken = window.location;
const hashKeyValue = {};
const hashValue = {};
let params;
const token = {
	accessToken() {
		const bearer = 'Bearer ';
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
		let bankID = 'CB';
		if (accessToken.hash.length > 0 && window.location.hash) {
			params = accessToken.hash.substr(1);
			hashKeyValue.bankId = params.split('&')[1];
			hashValue.bankId = hashKeyValue.bankId.split('=')[1];
			if (hashValue.bankId !== undefined) {
				bankID = hashValue.bankId;
			}
		}
		return bankID;
	},
	getClientContext() {
		if (accessToken.hash.length > 0 && window.location.hash) {
			params = accessToken.hash.substr(1);
			hashKeyValue.appTitle = params.split('&')[2];
			hashValue.appTitle = hashKeyValue.appTitle.split('=')[1];
			hashValue.appTitle = hashValue.appTitle.replace('%20', ' ');
			hashKeyValue.userTrackingId = params.split('&')[3];
			hashValue.userTrackingId = hashKeyValue.userTrackingId.split('=')[1];
		}
		return buildClientContext(hashValue.appTitle, hashValue.userTrackingId, this.getFingerPrints());
	},
	getContentBankId() {
		let contentBankID = 'CB';
		if (accessToken.hash.length > 0 && window.location.hash) {
			params = accessToken.hash.substr(1);
			hashKeyValue.contentBankId = params.split('&')[4];
			hashValue.contentBankId = hashKeyValue.contentBankId.split('=')[1];
			if (hashValue.contentBankId !== undefined) {
				contentBankID = hashValue.contentBankId;
			}
		}
		return contentBankID;
	},
	getFingerPrints() {
		let stateID;
		if (accessToken.hash.length > 0 && window.location.hash) {
			params = accessToken.hash.substr(1);
			hashKeyValue.stateID = params.split('&')[5];
			hashValue.stateID = hashKeyValue.stateID.split('=')[1];
			if (hashValue.stateID !== undefined) {
				stateID = hashValue.stateID;
			}
		}
		return stateID;
	},

};

export default token;
