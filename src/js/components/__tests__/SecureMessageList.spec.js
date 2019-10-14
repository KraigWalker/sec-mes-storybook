import React from 'react';
import { SecureMessageList } from '../SecureMessageList/SecureMessageList';
import { shallow } from 'enzyme';

describe("New Secure message snapshot", () => {
    const dispatch = jest.fn();
    const slice = jest.fn();
    let props = {
        content: {
            back: 'Back',
        },
        activeTab: 'SENT',
        messages: Array.from("1234567890"),
        messagesFetched: {
            fetching: false,
            successModal: false
        },
        dispatch: dispatch
    };
    let component = shallow(<SecureMessageList {...props} />);
    it('should match to snapshot', () => {
        component.setState({ showThatsAllMessage: true });
        expect(component).toMatchSnapshot();
    });
    it('showMoreClicked function test', () => {
        component.instance().showMoreClicked();
        component.setState({ showThatsAllMessage: true });
        expect(component.instance().state.showThatsAllMessage).toBeTruthy();
    });
    it('renderNoMessagesText function test', () => {
        component.instance().renderNoMessagesText();
        component.setState({ showMoreLimit: 8 });
        expect(component.instance().state.showMoreLimit).toBeLessThan(props.messages.length);
    });
    describe("renderNoMessagesText with DRAFT", () => {
        const dispatch = jest.fn();
        let props = {
            content: {
                noDraftMessages: 'noDraftMessages',
                thatsallTextDraft: 'thatsallTextDraft'
            },
            activeTab: 'DRAFT',
            messagesFetched: {
                fetching: false,
                successModal: false
            },
            messages: Array.from("123456789"),
            dispatch: dispatch
        };
        it('renderNoMessagesText function test', () => {
            let component = shallow(<SecureMessageList {...props} />);
            component.instance().renderNoMessagesText();
            component.setState({ showMoreLimit: 8 });
            expect(component.instance().state.showMoreLimit).toBeLessThan(props.messages.length);
        });
    });
    describe("New Secure message snapshot", () => {
        const dispatch = jest.fn();
        const slice = jest.fn();
        let props = {
            content: {
                back: 'Back',
            },
            messages: Array.from("1234567890"),
            messagesFetched: {
                fetching: true,
                successModal: true
            },
            dispatch: dispatch
        };
        let component = shallow(<SecureMessageList {...props} />);
        it('should match to snapshot', () => {
            expect(component).toMatchSnapshot();
        });
    });
});
