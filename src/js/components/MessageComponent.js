import React from 'react';

class MessageComponent extends React.Component {
    render() {
        const { message } = this.props;
        return (
            <div>
                <dl>
                    <dt>{message.getSubject()}</dt>
                    <dd>Subject</dd>
                    <dt>{message.getStatus()}</dt>
                    <dd>Status</dd>
                    <dt>{message.getMessageBody()}</dt>
                    <dd>Message Body</dd>
                </dl>
            </div>
        );
    }
}

export default MessageComponent;
