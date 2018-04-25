import React from 'react';
import { shallow, mount } from 'enzyme';
import MessageSubjectReducer from '../MessageSubjectReducer';
import renderer from 'react-test-renderer';

describe('>>>R E D U C E R --- Test MessageSubjectReducer', () => {
    it('+++ reducer for REQUEST_SECURE_MESSAGES', () => {
        let state = { subjects: [], fetching: false, fetched: false, error: false };
        state = MessageSubjectReducer(state, { type: "REQUEST_SECURE_MESSAGES" });
        expect(state).toEqual({ subjects: [], fetching: true, fetched: false, error: false });
    });
    it('+++ reducer for REQUEST_SUBJECTS_SUCCESS', () => {
        let state = { subjects: [], fetching: false, fetched: false, error: false };
        state = MessageSubjectReducer(state, {
            type: "REQUEST_SUBJECTS_SUCCESS", payload: [{
                key: '0',
                value: 'Borrowing Needs'
            }]
        });
        expect(state).toEqual({
            subjects: [{
                key: '0',
                value: 'Borrowing Needs'
            }], fetching: false, fetched: true, error: false
        })
    });
    it('+++ reducer for REQUEST_SUBJECTS_FAILURE', () => {
        let state = { subjects: [], fetching: false, fetched: false, error: false };
        state = MessageSubjectReducer(state, { type: "REQUEST_SUBJECTS_FAILURE" });
        expect(state).toEqual({ subjects: [], fetching: false, fetched: true, error: true });
    });
    it('+++ reducer for SET_POPUP_STATE', () => {
        let state = { subjects: [], fetching: false, fetched: false, error: false };
        state = MessageSubjectReducer(state, { type: "SET_POPUP_STATE" });
        expect(state).toEqual({ subjects: [], fetching: false, fetched: false, error: false });
    });
    it('+++ reducer for default', () => {
        let state = { subjects: [], fetching: false, fetched: false, error: false };
        state = MessageSubjectReducer(state, { type: "" });
        expect(state).toEqual({ subjects: [], fetching: false, fetched: false, error: false });
    });
});