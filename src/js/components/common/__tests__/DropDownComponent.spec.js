import React from 'react';
import { Router } from 'react-router-dom';
import { shallow, mount } from 'enzyme';
import { createMockStore } from 'redux-test-utils';
import { Provider } from "react-redux";
import createBrowserHistory from 'history/createBrowserHistory'
import TestData from '../../../content/secureMessagesTestData.json'
import { DropDownComponent } from '../DropDownComponent'

let component;
let props;

describe("Dropdown snapshot", () => {
    const dispatch = jest.fn();
    let props = {
        content: {
            back: 'Back',
        },
        messages: {
            successModal: false,
            newMessageError: false,
            messages: []
        },
        messagesubjects:{
          error: true
        },
        dispatch: dispatch
    };
    let component = shallow(<DropDownComponent {...props} />);
    component.setState({ showErrorModal: true });
    it('should match to snapshot', () => {
        expect(component).toMatchSnapshot();
    });
});