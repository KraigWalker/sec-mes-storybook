import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sendMessageForAccessibiltiy } from '../../actions/AppActions';
// import AccessibilityStore from '../../stores/AccessibilityStore';
let currentMessage = '';
class AccessibilityMessage extends Component {
  componentDidUpdate() {
    if (currentMessage) {
      setTimeout(() => {
        this.props.dispatch(sendMessageForAccessibiltiy(''));
      }, 500);
    }
  }

  render() {
    currentMessage = this.props.message;
    return (
      <div
        className="u-visually-hidden off-screen"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {currentMessage ? <span>{currentMessage}</span> : ''}
      </div>
    );
  }
}
/**
 * Maps the state of the component to the state of the redux store
 * @param {object} state. State of the application
 */
const mapState = (state) => {
  return {
    message: state.accessibility.message,
  };
};

export default connect(mapState)(AccessibilityMessage);
