import React from 'react';
import { shallow, mount } from 'enzyme';
import SecureMessageLandingReducer from '../SecureMessageLandingReducer';
import renderer from 'react-test-renderer';

describe('>>>R E D U C E R --- Test AccessibilityReducer', () => {
    it('should return the initial state', () => {
        expect(SecureMessageLandingReducer(undefined, {})).toEqual({ messages: [], fetching: false, fetched: false, error: false,
            successModal: false, activeTab: 'inbox', newMessageError: false, sendingMessages: [], draftError: false, deletingMessages: [], updated: false, updating: false });
    });
    it('+++ reducer for REQUEST_SECURE_MESSAGES', () => {
        let state = { messages: [], fetching: false, fetched: false, error: false, successModal: false, activeTab: 'inbox', newMessageError: false, draftError: false, deletingMessages: [] };
        state = SecureMessageLandingReducer(state, { type: "REQUEST_SECURE_MESSAGES" });
        expect(state).toEqual({ messages: [], fetching: true, fetched: false, error: false, successModal: false, activeTab: 'inbox', newMessageError: false, draftError: false,  deletingMessages: [] });
    });
    it('+++ reducer for REQUEST_SECURE_MESSAGES_SUCCESS', () => {
        let state = { messages: [], fetching: false, fetched: false, error: false, successModal: false, activeTab: 'inbox', newMessageError: false, draftError: false,  deletingMessages: [] };
        state = SecureMessageLandingReducer(state, {
            type: "REQUEST_SECURE_MESSAGES_SUCCESS", payload: [{
                id: 1,
                thread_id: "24569088-5cf1-43ea-873f-c",
                reference: "L09SDF09SDFSD",
                subject: "Payment Enquiries",
                account: {
                    id: "1234455555",
                    number: 111111 - 11111111,
                },
                payload: {
                    body: {
                        data: "Hi, \nI am so so..."
                    }
                },
                date_created: "2017-10-17T10:56:43",
                status: "PENDING"
            }],
        });
        expect(state).toEqual({
            messages: [{
                id: 1,
                thread_id: "24569088-5cf1-43ea-873f-c",
                reference: "L09SDF09SDFSD",
                subject: "Payment Enquiries",
                account: {
                    id: "1234455555",
                    number: 111111 - 11111111,
                },
                payload: {
                    body: {
                        data: "Hi, \nI am so so..."
                    }
                },
                date_created: "2017-10-17T10:56:43",
                status: "PENDING"
            }],
            fetching: false, fetched: true, error: false, successModal: false, activeTab: 'inbox', newMessageError: false, draftError: false,
            deletingMessages: []
        });
    });
    it('+++ reducer for REQUEST_SECURE_MESSAGES_FAILURE', () => {
        let state = { messages: [], fetching: false, fetched: false, error: false, successModal: false, activeTab: 'inbox', newMessageError: false, draftError: false,  deletingMessages: [] };
        state = SecureMessageLandingReducer(state, { type: "REQUEST_SECURE_MESSAGES_FAILURE" });
        expect(state).toEqual({ messages: [], fetching: false, fetched: true, error: true, successModal: false, activeTab: 'inbox', newMessageError: false, draftError: false,  deletingMessages: [] });
    });
    it('+++ reducer for REQUEST_TAB_ACTIVE', () => {
        let state = { messages: [], fetching: false, fetched: false, error: false, successModal: false, activeTab: 'inbox', newMessageError: false, draftError: false,  deletingMessages: [] };
        state = SecureMessageLandingReducer(state, { type: "REQUEST_TAB_ACTIVE", payload: "draft" });
        expect(state).toEqual({ messages: [], fetching: false, fetched: false, error: false, successModal: false, activeTab: 'draft', newMessageError: false, draftError: false,  deletingMessages: [] });
    });
    it('+++ reducer for UPDATE_SECURE_MESSAGE_SUCCESS', () => {
        let state = { messages: [], fetching: false, fetched: false, error: false, successModal: false, activeTab: 'inbox', newMessageError: false, draftError: false,  deletingMessages: [] };
        state = SecureMessageLandingReducer(state, { type: "UPDATE_SECURE_MESSAGE_SUCCESS" });
        expect(state).toEqual({ messages: [], fetching: false, fetched: false, error: false, successModal: true,
            isSavingDraft: false, updating: false, activeTab: 'inbox', newMessageError: false, draftError: false,  deletingMessages: [] });
    });
    it('+++ reducer for ERROR_BACK_BUTTON', () => {
        let state = { messages: [], fetching: false, fetched: false, error: false, successModal: false, activeTab: 'inbox', newMessageError: false, draftError: false,  deletingMessages: [] };
        state = SecureMessageLandingReducer(state, { type: "ERROR_BACK_BUTTON" });
        expect(state).toEqual({ messages: [], fetching: false, fetched: false, error: false, successModal: false, activeTab: 'inbox', newMessageError: false, draftError: false,  deletingMessages: [] });
    });
    it('+++ reducer for UPDATE_SECURE_MESSAGE_DRAFT_FAILURE', () => {
        let state = { messages: [], fetching: false, fetched: false, error: false, successModal: false, activeTab: 'inbox', newMessageError: false, draftError: false,  deletingMessages: [] };
        state = SecureMessageLandingReducer(state, { type: "UPDATE_SECURE_MESSAGE_DRAFT_FAILURE" });
        expect(state).toEqual({ messages: [], fetching: false, fetched: true, error: false, successModal: false,
            isSavingDraft: false, activeTab: 'inbox', newMessageError: false, draftError: true,  deletingMessages: [] });
    });
    it('+++ reducer for UPDATE_NEW_SECURE_MESSAGE_FAILURE', () => {
        let state = { messages: [], fetching: false, fetched: false, error: false, successModal: false, activeTab: 'inbox', newMessageError: false, draftError: false,  deletingMessages: [] };
        state = SecureMessageLandingReducer(state, { type: "UPDATE_NEW_SECURE_MESSAGE_FAILURE" });
        expect(state).toEqual({ messages: [], fetching: false, fetched: true, error: false, successModal: false,
            isSavingDraft: false, activeTab: 'inbox', newMessageError: true, draftError: false,  deletingMessages: [] });
    });
    it('+++ reducer for SET_POPUP_STATE', () => {
        let state = { messages: [], fetching: false, fetched: false, error: false, successModal: false, activeTab: 'inbox', newMessageError: false, draftError: false,  deletingMessages: [] };
        state = SecureMessageLandingReducer(state, { type: "SET_POPUP_STATE" });
        expect(state).toEqual({ messages: [], fetching: false, fetched: false, error: false, successModal: false, activeTab: 'inbox', newMessageError: false, draftError: false,  deletingMessages: [] });
    });
    it('+++ reducer for defult case', () => {
        let state = { messages: [], fetching: false, fetched: false, error: false, successModal: false, activeTab: 'inbox', newMessageError: false, draftError: false,  deletingMessages: [] };
        state = SecureMessageLandingReducer(state, { type: "" });
        expect(state).toEqual({ messages: [], fetching: false, fetched: false, error: false, successModal: false, activeTab: 'inbox', newMessageError: false, draftError: false,  deletingMessages: [] });
    });
});
