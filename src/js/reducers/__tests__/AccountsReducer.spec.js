import React from 'react';
import { shallow, mount } from 'enzyme';
import AccountsReducer from '../AccountsReducer';
import renderer from 'react-test-renderer';

describe('>>>R E D U C E R --- Test AccountsReducer', () => {
    it('+++ reducer for REQUEST_SECURE_MESSAGES', () => {
        let state = { accounts: [], fetching: false, fetched: false }
        state = AccountsReducer(state, { type: "REQUEST_SECURE_MESSAGES" })
        expect(state).toEqual({ accounts: [], fetching: true, fetched: false })
    });
    it('+++ reducer for REQUEST_ACCOUNTS_SUCCESS', () => {
        let state = { accounts: [], fetched: false, fetching: false }
        state = AccountsReducer(state, {
            type: "REQUEST_ACCOUNTS_SUCCESS", payload: [{
                name: 'B Current',
                number: '824000-70016301',
                accountId: '16ef57e9-a2e3-4395-93da-35c613d67bb6',
                display_name: 'gdfgfgg',
                display_order: 1,
            }]
        })
        expect(state).toEqual(
            {
                accounts: [{
                    name: 'B Current',
                    number: '824000-70016301',
                    accountId: '16ef57e9-a2e3-4395-93da-35c613d67bb6',
                    display_name: 'gdfgfgg',
                    display_order: 1
                }], fetched: true, fetching: false
            })
    });
    it('+++ reducer for default case', () => {
        let state = { accounts: [], fetching: false, fetched: false }
        state = AccountsReducer(state, { type: "" })
        expect(state).toEqual({ accounts: [], fetching: false, fetched: false })
    });
});