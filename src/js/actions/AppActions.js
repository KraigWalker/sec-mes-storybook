import AppConstants from '../constants/AppConstants';
import { parseMessages } from '../parsers/MessageParser';
import { parseSubjects, parseAccounts } from '../parsers/MessageSubjectParser';

export function fetchSecureMessages() {
	return function (dispatch, _, { AppApi }) {
		const payload = {
			type: AppConstants.REQUEST_SECURE_MESSAGES,
		};
		dispatch(payload);
		const success = response => {
			const parseData = response ? parseMessages(response) : [];
			const payload = {
				type: AppConstants.REQUEST_SECURE_MESSAGES_SUCCESS,
				payload: parseData,
			};
			dispatch(payload);
		};
		const error = error => {
			const payload = {
				type: AppConstants.REQUEST_SECURE_MESSAGES_FAILURE,
			};
			dispatch(payload);
		};
		AppApi.fetchSecureMessages(success, error);
	};
}
export function getMessageSubjects() {
	return function (dispatch, _, { AppApi }) {
		const success = response => {
			const parseData = parseSubjects(response);
			const payload = {
				type: AppConstants.REQUEST_SUBJECTS_SUCCESS,
				payload: parseData,
			};
			dispatch(payload);
		};
		const error = error => {
			const payload = {
				type: AppConstants.REQUEST_SUBJECTS_FAILURE,
				payload: error,
			};
			dispatch(payload);
		};
		AppApi.getSubjects(success, error);
	};
}
export function getAccounts() {
	return function (dispatch, _, { AppApi }) {
		const success = response => {
			const parseData = parseAccounts(response);
			const payload = {
				type: AppConstants.REQUEST_ACCOUNTS_SUCCESS,
				payload: parseData,
			};
			dispatch(payload);
		};
		const error = error => {
			const payload = {
				type: AppConstants.REQUEST_SECURE_MESSAGES_FAILURE,
				payload: error,
			};
			dispatch(payload);
		};
		AppApi.getAccounts(success, error);
	};
}

export function getActiveTab(activeTab) {
	return function (dispatch) {
		const payload = {
			type: AppConstants.REQUEST_TAB_ACTIVE,
			payload: activeTab,
		};
		dispatch(payload);
	};
}

export function backButton() {
	return function (dispatch) {
		const payload = {
			type: AppConstants.ERROR_BACK_BUTTON,
		};
		dispatch(payload);
	};
}
export function sendMessageData(requestData, status, name) {
	return function (dispatch, _, { AppApi }) {
		const success = response => {
			const payload = {
				type: AppConstants.UPDATE_SECURE_MESSAGE_SUCCESS,
			};
			dispatch(payload);
		};
		const error = error => {
			const payload = {
				type: AppConstants.UPDATE_NEW_SECURE_MESSAGE_FAILURE,
				payload: error,
			};
			dispatch(payload);
		};
		AppApi.sendMessageData(requestData, status, name, success, error);
	};
}

export function replyMessageData(requestData, ids, status, name) {
	return function (dispatch, _, { AppApi }) {
		const success = response => {
			const payload = {
				type: AppConstants.UPDATE_SECURE_MESSAGE_SUCCESS,
			};
			dispatch(payload);
		};
		const error = error => {
			const payload = {
				type: AppConstants.UPDATE_NEW_SECURE_MESSAGE_FAILURE,
				payload: error,
			};
			dispatch(payload);
		};
		AppApi.replyMessageData(requestData, ids, status, name, success, error);
	};
}

export function updateMessageData(requestData, id, status) {
	return function (dispatch, _, { AppApi }) {
		const success = () => {
			const payload = {
				type: AppConstants.UPDATE_SECURE_MESSAGE_SUCCESS,
			};
			dispatch(payload);
		};
		const error = error => {
			const payload = {
				type: AppConstants.UPDATE_SECURE_MESSAGE_DRAFT_FAILURE,
				payload: error,
			};
			dispatch(payload);
		};
		AppApi.updateMessageData(requestData, id, status, success, error);
	};
}
export function setViewMessageDetail(messageDetail) {
	return function (dispatch) {
		const payload = {
			payload: messageDetail,
			type: AppConstants.SET_VIEW_MESSAGE_DETAIL,
		};
		dispatch(payload);
	};
}

export function delMessageData(requestData, id, status) {
	return function (dispatch, _, { AppApi }) {
		const success = () => {
			const payload = {
				type: AppConstants.DELETE_SECURE_MESSAGE_SUCCESS,
			};
			dispatch(payload);
		};
		const error = error => {
			const payload = {
				type: AppConstants.UPDATE_SECURE_MESSAGE_DRAFT_FAILURE,
				payload: error,
			};
			dispatch(payload);
		};
		AppApi.updateMessageData(requestData, id, status, success, error);
	};
}

export function sendMessageForAccessibiltiy(message) {
	return function (dispatch) {
		const payload = {
			payload: message,
			type: AppConstants.SEND_MESSAGE_FOR_ACCESSIBILITY,
		};
		dispatch(payload);
	};
}

export function popupState() {
	return function (dispatch) {
		const payload = {
			type: AppConstants.SET_POPUP_STATE,
		};
		dispatch(payload);
	};
}

export function closeDelModal() {
	return function (dispatch) {
		const payload = {
			type: AppConstants.UPDATE_SECURE_MESSAGE_SUCCESS,
		};
		dispatch(payload);
	};
}

export function getCustomerID() {
	return function (dispatch, _, { AppApi }) {
		const payload = {
			type: AppConstants.REQUEST_SEGMENT_DATA,
		};
		dispatch(payload);
		const success = response => {
			const payload = {
				type: AppConstants.REQUEST_SEGMENTS_SUCCESS,
				payload: response,
			};
			dispatch(payload);
		};
		const error = error => {
			const payload = {
				type: AppConstants.REQUEST_SECURE_MESSAGES_FAILURE,
				payload: error,
			};
			dispatch(payload);
		};
		AppApi.fetchAccountSegment(success, error);
	};
}

export function getCustomerName(id) {
	return function (dispatch, _, { AppApi }) {
		const payload = {
			type: AppConstants.REQUEST_CUSTOMER_NAME,
		};
		dispatch(payload);
		const success = response => {
			const payload = {
				type: AppConstants.REQUEST_CUSTOMER_NAME_SUCCESS,
				payload: response,
			};
			dispatch(payload);
		};
		const error = error => {
			const payload = {
				type: AppConstants.REQUEST_CUSTOMER_NAME_FAILURE,
				payload: error,
			};
			dispatch(payload);
		};
		AppApi.fetchCustomerDetails(success, error, id);
	};
}

export function setMode(mode) {
	return {
		type: AppConstants.SET_MODE,
		payload: mode
	};
}