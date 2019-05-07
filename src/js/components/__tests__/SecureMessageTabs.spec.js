import React from 'react';
import { SecureMessageTabs } from '../SecureMessageTabs';
import { shallow } from 'enzyme';

describe("New Secure message snapshot", () => {
    const dispatch = jest.fn();
    let props = {
        content: {
            back: 'Back',
        },
        messages: {
            inboxMessages: [
                {
                    status: 'NEW'
                },
            ]
        },
        dispatch: dispatch
    };
    let component = shallow(<SecureMessageTabs {...props} />);
    it('should match to snapshot', () => {
        expect(component).toMatchSnapshot();
    });
    it('onClick method test', () => {
        component.instance().onclick();
        component.setState({ tab: 'inbox' });
        expect(component.instance().state.tab).toBe('inbox');
    });
});