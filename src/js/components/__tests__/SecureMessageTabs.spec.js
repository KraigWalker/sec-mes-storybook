import React from 'react';
import { SecureMessageTabs } from '../SecureMessageTabs';
import { shallow } from 'enzyme';
import { Tab } from "react-bootstrap";

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

describe("inbox messages tab header", () => {

    const dispatch = jest.fn();
    it('has 2 new messages', () => {
        let props = {
            content: {
                back: 'Back',
            },
            messages: {
                inboxMessages: [
                    {
                        status: 'NEW'
                    },
                    {
                        status: 'READ'
                    },
                    {
                        status: 'NEW'
                    }
                ]
            },
            dispatch: dispatch
        };
        let component = shallow(<SecureMessageTabs {...props} />);
        expect(component.find(Tab).first().props().title).toEqual("Inbox (2)")
    });

    it('has 0 new messages', () => {
        let props = {
            content: {
                back: 'Back',
            },
            messages: {
                inboxMessages: [
                    {
                        status: 'READ'
                    },
                    {
                        status: 'READ'
                    },
                    {
                        status: 'READ'
                    }
                ]
            },
            dispatch: dispatch
        };
        let component = shallow(<SecureMessageTabs {...props} />);
        expect(component.find(Tab).first().props().title).toEqual("Inbox")
    });

    it('has no messages', () => {
        let props = {
            content: {
                back: 'Back',
            },
            messages: {
            },
            dispatch: dispatch
        };
        let component = shallow(<SecureMessageTabs {...props} />);
        expect(component.find(Tab).first().props().title).toEqual("Inbox")
    });
});