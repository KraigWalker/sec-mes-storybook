import React from 'react';
import content from '../../content';
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