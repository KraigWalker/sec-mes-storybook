import { accessibilityReducer } from '../AccessibilityReducer';

describe('accessibilityReducer', () => {
  it('should return the initial state', () => {
    expect(accessibilityReducer(undefined, {})).toEqual({
      message: '',
    });
  });

  it('+++ reducer for SEND_MESSAGE_FOR_ACCESSIBILITY', () => {
    let state = { message: '' };
    state = accessibilityReducer(state, {
      type: 'SEND_MESSAGE_FOR_ACCESSIBILITY',
      payload: 'New SecureMessage',
    });
    expect(state).toEqual({ message: 'New SecureMessage' });
  });

  it('+++ reducer for SEND_MESSAGE_FOR_ACCESSIBILITY', () => {
    let state = { message: '' };
    state = accessibilityReducer(state, { type: '' });
    expect(state).toEqual({ message: '' });
  });
});
