import React from 'react';
import content from '../../content';
import { connect } from 'react-redux';
export function withSubscription(WrappedComponent) {
    return class extends React.Component {
        constructor() {
            super();
            this.state = {
                content: content,
            }
        }
        render() {
            return (
                <WrappedComponent content = {this.state.content} config = {this.state.config}/>
            );
        }
    }
}
export function accessibilityWrapper(WrappedComponent) {
    let currentMessage = '';
    const mapState = (state) => {
        console.log(state)
        return {
            message: state.accessibilityReducer.accessibilityMessage,
            fetched: state.messages.fetched,
        }
    };
    return connect(mapState)(class extends React.Component {
        componentDidUpdate(prevProps, prevState) {
            if (currentMessage) {
                setTimeout(() => {
                    currentMessage = '';
                }, 500);
            }
        }
        render() {
        currentMessage = this.props.message;
        return (
            <div>
                <div className="u-visually-hidden off-screen" role="status" aria-live="polite" aria-atomic="true">
                    {currentMessage &&  this.props.fetched ? <span>{currentMessage}</span> : ''}
                </div>
                <WrappedComponent/>
            </div>
        );
    }
})
}

