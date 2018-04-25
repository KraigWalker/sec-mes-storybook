import React from 'react';
import { shallow, mount } from 'enzyme';
import AccessibilityReducer from '../AccessibilityReducer';
import renderer from 'react-test-renderer';

describe('>>>R E D U C E R --- Test AccessibilityReducer', () => {
    it('should return the initial state', () => {
        expect(AccessibilityReducer(undefined, {})).toEqual({ accessibilityMessage: '' });
    });
    it('+++ reducer for SEND_MESSAGE_FOR_ACCESSIBILITY', () => {
        let state = { accessibilityMessage: '' };
        state = AccessibilityReducer(state, { type: "SEND_MESSAGE_FOR_ACCESSIBILITY", payload: 'New SecureMessage' });
        expect(state).toEqual({ accessibilityMessage: 'New SecureMessage' });
    });
    it('+++ reducer for SEND_MESSAGE_FOR_ACCESSIBILITY', () => {
        let state = { accessibilityMessage: '' };
        state = AccessibilityReducer(state, { type: "" });
        expect(state).toEqual({ accessibilityMessage: '' });
    });
});