import React from 'react';
import {SecureMessageTabs} from '../SecureMessageTabs';
import {shallow} from 'enzyme';
import {TabButton} from ""

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
    const tabs = [{id: "INBOX", title: "Inbox (1)"}, {id: "DRAFT", title: "Drafts"}, {
        id: "SENT",
        title: "Sent"
    }, {id: "ARCHIVED", title: "Archive"}];
    it('should match to snapshot', () => {
        expect(component).toMatchSnapshot();

    });
    it("renders the tab groups", () => {
        const {tabButtons} = component.find("TabGroup").props();
        expect(Array.isArray(tabButtons)).toBe(true);
        expect(tabButtons).toEqual(tabs);
    });
    it('onClick method test', () => {
        component.instance().onclick();
        component.setState({tab: 'inbox'});
        expect(component.instance().state.tab).toBe('inbox');
    });
});
