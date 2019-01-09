
import ApiUtils from './ApiUtils';
import { parseDraft, deleteMessage, replyMessage, updateMessage } from '../parsers/MessageParser';
import StringsConstants from '../constants/StringsConstants';
import ConfigUtils from '../utils/ConfigUtils';

const _getMessageURLEndpoint = '/banks/{bank_id}/securemessages';
const _getMessageSubjectsURL = '/banks/{bank_id}/securemessages/subjects';
const _getAccountsURL = '/banks/{bank_id}/accounts/default';
const _sendMessageURL = '/banks/{bank_id}/securemessages/{message_id}';
const _getAccountSegmentEndpoint = '/banks/{bank_id}/customers';
const _getCustomerDetailsEndpoint = '/banks/{bank_id}/customers/{customer_id}';
//const _getAccountSegmentEndpoint = '/user/details'; //TODOxCYBG will be used for SME

class AppApi {
	static fetchSecureMessages(success, error) {
		ApiUtils.makeRequest({ url: `${ConfigUtils.config.apiBaseUrl}${_getMessageURLEndpoint}`, method: 'GET', apiVersion: '1.2.0' }, success, error);
	}

	static getSubjects(success, error) {
		ApiUtils.makeRequest({ url: `${ConfigUtils.config.apiBaseUrl}${_getMessageSubjectsURL}`, method: 'GET', apiVersion: '1.2.0' }, success, error);
	}

	static getAccounts(success, error) {
		ApiUtils.makeRequest({ url: `${ConfigUtils.config.apiBaseUrl}${_getAccountsURL}`, method: 'GET', apiVersion: '0.8.0' }, success, error);
	}

	static sendMessageData(requestData, status, name, success, error) {
		const reqData = parseDraft(requestData, status, name);
		ApiUtils.makeRequest({ url: `${ConfigUtils.config.apiBaseUrl}${_getMessageURLEndpoint}`, method: 'POST', apiVersion: '1.2.0', requestData: reqData }, success, error);
	}

	static replyMessageData(requestData, ids, status, name, success, error) {
		const reqData = replyMessage(requestData, ids, status, name);
		ApiUtils.makeRequest({ url: `${ConfigUtils.config.apiBaseUrl}${_getMessageURLEndpoint}`, method: 'POST', apiVersion: '1.2.0', requestData: reqData }, success, error);
	}

	static updateMessageData(requestData, id, status, success, error) {
		const updateUrl = `${ConfigUtils.config.apiBaseUrl}${_sendMessageURL}`;
		const url = updateUrl.replace('{message_id}', id);
		let reqData;
		switch (status) {
			case StringsConstants.DELETED:
				reqData = deleteMessage(requestData, id, status);
				break;
			case StringsConstants.DRAFT:
				reqData = updateMessage(requestData, id, status);
				break;
			case StringsConstants.PENDING:
				reqData = updateMessage(requestData, id, status);
				break;
			case StringsConstants.READ:
				reqData = deleteMessage(requestData, id, status);
				break;
			default:
		}
		ApiUtils.makeRequest({ url, method: 'PUT', requestData: reqData, apiVersion: '1.2.0' }, success, error);
	}

	static fetchAccountSegment(success, error) {
		ApiUtils.makeRequest({ url: `${ConfigUtils.config.apiBaseUrl2}${_getAccountSegmentEndpoint}`, method: 'GET', apiVersion: '0.8.0' }, success, error);
	}

	static fetchCustomerDetails(success, error, id) {
		const updateUrl = `${ConfigUtils.config.apiBaseUrl2}${_getCustomerDetailsEndpoint}`;
		const url = updateUrl.replace('{customer_id}', id);
		ApiUtils.makeRequest({ url, method: 'GET', apiVersion: '0.8.0' }, success, error);
	}
}

export default AppApi;
