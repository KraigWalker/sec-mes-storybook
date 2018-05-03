import React from 'react';
import { shallow, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import TestUtils from 'react-addons-test-utils';
import { createMockStore } from 'redux-test-utils';
import { LandingPage } from '../LandingPage';
import { Provider } from "react-redux";

let props;
let state;
describe("Landing Page else snapshot", () => {
    const dispatch = jest.fn();
    const linkClick = jest.fn();
    const postMessage = jest.fn();
    let props = {
        content: {
            back: 'Back',
            retry: 'Retry',
            backToAccounts: 'Back to accounts'
        },
        messages: {
            error: false,
            fetched: false
        },
        dispatch: dispatch
    };

    let component = shallow(<LandingPage {...props} />);
    it('should match to snapshot', () => {
        expect(component).toMatchSnapshot();
    });
});
describe("Landing Page if snapshot", () => {
    const dispatch = jest.fn();
    const push = jest.fn();
    let props = {
        content: {
            back: 'Back',
            retry: 'Retry',
            backToAccounts: 'Back to accounts'
        },
        messages: {
            error: true,
            fetched: true
        },
        history: {
            push: push
        },
        dispatch: dispatch
    };
    let component = shallow(<LandingPage {...props} />);
    it('should match to snapshot', () => {
        expect(push).toBeCalled();
    });
});
describe("Landing Page if snapshot", () => {
    it('should call link clicked method', () => {
        const dispatch = jest.fn();
        let props = {
            content: {

            },
            messages: {
                error: false,
                fetched: false
            },
            dispatch: dispatch
        };
        const wrapper = shallow(
            <LandingPage {...props} />
        );
        wrapper.find('SecureMessageTabs').simulate('click');
    });
});
describe("Landing Page if snapshot", () => {
    it('should call handle back clicked method', () => {
        const dispatch = jest.fn();
        let props = {
            content: {

            },
            messages: {
                error: false,
                fetched: false
            },
            dispatch: dispatch
        };
        const wrapper = shallow(
            <LandingPage {...props} />
        );
        wrapper.find('a').simulate('click');
       // expect(getActiveTab).toBeCalled();
    });
});