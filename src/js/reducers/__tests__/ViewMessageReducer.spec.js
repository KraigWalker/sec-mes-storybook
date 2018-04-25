import React from 'react';
import { shallow, mount } from 'enzyme';
import ViewMessageReducer from '../ViewMessageReducer';
import renderer from 'react-test-renderer';

describe('>>>R E D U C E R --- Test ViewMessageReducer', () => {
    it('+++ reducer for SET_VIEW_MESSAGE_DETAIL', () => {
        let state = { messageDetail: {}, delSuccessModal: false };
        state = ViewMessageReducer(state, {
            type: "SET_VIEW_MESSAGE_DETAIL", payload: {
                account: {
                    accountId: undefined,
                    name: null,
                    number: undefined
                },
                dateCreated: "20-04-2018",
                id: "CB20001417",
                message: "abc",
                reference: "CB20001417",
                status: "NEW",
                subject: "General Feedback",
                threadID: null
            }
        });
        expect(state).toEqual({
            messageDetail: {
                account: {
                    accountId: undefined,
                    name: null,
                    number: undefined
                },
                dateCreated: "20-04-2018",
                id: "CB20001417",
                message: "abc",
                reference: "CB20001417",
                status: "NEW",
                subject: "General Feedback",
                threadID: null
            }, delSuccessModal: false
        });
    });
    it('+++ reducer for GET_VIEW_MESSAGE_DETAIL', () => {
        let state = { messageDetail: {}, delSuccessModal: false };
        state = ViewMessageReducer(state, { type: "GET_VIEW_MESSAGE_DETAIL" });
        expect(state).toEqual({ messageDetail: {}, delSuccessModal: false });
    });
    it('+++ reducer for DELETE_SECURE_MESSAGE_SUCCESS', () => {
        let state = { messageDetail: {}, delSuccessModal: false };
        state = ViewMessageReducer(state, { type: "DELETE_SECURE_MESSAGE_SUCCESS" });
        expect(state).toEqual({ messageDetail: {}, delSuccessModal: true });
    });
    it('+++ reducer for UPDATE_SECURE_MESSAGE_SUCCESS', () => {
        let state = { messageDetail: {}, delSuccessModal: false };
        state = ViewMessageReducer(state, { type: "UPDATE_SECURE_MESSAGE_SUCCESS" });
        expect(state).toEqual({ messageDetail: {}, delSuccessModal: false });
    });
    it('+++ reducer for SET_POPUP_STATE', () => {
        let state = { messageDetail: {}, delSuccessModal: false };
        state = ViewMessageReducer(state, { type: "SET_POPUP_STATE" });
        expect(state).toEqual({ messageDetail: {}, delSuccessModal: false, error: false });
    });
    it('+++ reducer for default', () => {
        let state = { messageDetail: {}, delSuccessModal: false };
        state = ViewMessageReducer(state, { type: "" });
        expect(state).toEqual({ messageDetail: {}, delSuccessModal: false });
    });
});