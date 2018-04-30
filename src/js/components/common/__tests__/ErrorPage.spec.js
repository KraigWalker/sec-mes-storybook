import React from 'react';
import { shallow, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import TestUtils from 'react-addons-test-utils';
import { createMockStore } from 'redux-test-utils';
import { ErrorPage } from '../ErrorPage';
import { Provider } from "react-redux";

let props;
let state;
describe("New Secure message snapshot", () => {
    const dispatch = jest.fn();
    let props = {
        content: {
            back: 'Back',
            retry: 'Retry',
            backToAccounts: 'Back to accounts'
        },
        messages: {
            fetching: false,
        },
        dispatch: dispatch
    };
    let component = shallow(<ErrorPage {...props} />);
    it('should match to snapshot', () => {
        expect(component).toMatchSnapshot();
    });
    it('should match to snapshot', () => {
        const wrapper = shallow(
            <ErrorPage {...props} />
        );
        wrapper.find('button').simulate('click');
        expect(props.content.retry).toEqual('Retry');
    });
    it('should match to snapshot', () => {
        const handleBackButton = jest.fn();
        const wrapper = shallow(
            <ErrorPage {...props} />
        );
       
         for (let index = 0; index < wrapper.length; index += 1) {
              wrapper.find('a').at(index).simulate('click');
             if (index === 0) {
				expect(props.content.backToAccounts).toEqual('Back to accounts');
             } else {
                expect(props.content.back).toEqual('Back');
             }
         }
    });
});
describe("New Secure message snapshot", () => {
    const dispatch = jest.fn();
    let props = {
        content: {
            back: 'Back',
        },
        messages: {
            fetching: true,
        },
        dispatch: dispatch
    };
    let component = shallow(<ErrorPage {...props} />);
    it('should match to snapshot', () => {
        expect(component).toMatchSnapshot();
    });
});
