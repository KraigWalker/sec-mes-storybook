import React from 'react';
import content from '../../content';
import config from '../../config';
import { connect } from 'react-redux';
import { fetchSecureMessages } from '../../actions/AppActions';

export function withSubscription(WrappedComponent) {
    const mapState = (state) => {
        return {
            fetched: state.messages.fetched,
        }
    };
    return connect(mapState) (class extends React.PureComponent {
        constructor() {
            super();
            this.state = {
                content: content,
                config: config,
            }
        }
        componentWillMount() {
            !this.props.fetched && this.props.dispatch(fetchSecureMessages());
        }
        componentWillReceiveProps(nextProps) {
            !nextProps.fetched && this.props.dispatch(fetchSecureMessages());
        }
        
        render() {
            return (
                <WrappedComponent content = {this.state.content} config = {this.state.config}/>
            );
        }
    });
}
export function accessibilityWrapper(WrappedComponent) {
    let currentMessage = '';
    const mapState = (state) => {
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

