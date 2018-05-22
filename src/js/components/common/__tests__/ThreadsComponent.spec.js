import React from 'react';
import { shallow } from 'enzyme';
import { ThreadsComponent } from '../ThreadsComponent';

jest.mock('../SecureMessageSummary');

describe("ThreadsComponent snapshot", () => {
    const dispatch = jest.fn();
    let props = {
        content: {
        },
        ThreadDetail: {
          message: []
        },
        messages: {
        },
        dispatch: dispatch
    };
    let component = shallow(<ThreadsComponent {...props} />);
    it('should match to snapshot', () => {
        expect(component).toMatchSnapshot();
    });
});