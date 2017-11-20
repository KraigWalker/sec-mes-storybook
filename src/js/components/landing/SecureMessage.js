import React from 'react';
import GetIcon from '../common/GetIcon';

class SecureMessage extends React.Component {
    render() {
        const { message } = this.props;
        return (
            <div>
                <div className="c-message">
                <span className="c-message__icon"><GetIcon id="icon-Information" width="24px" height="24px"/></span>
                <div className="c-message__summary">
                    <div className="c-message__summary__head">
                        <label className="c-message__summary__head__subject">{message.getSubject()}</label>
                        <span className="c-message__summary__head__actions">
                            <button className="c-btn c-btn--link zero-padding c-message__summary__head__actions__reply">Reply</button>
                            <a href="#/" className="c-message__summary__head__actions__reply--sm"><GetIcon id="icon-Information" width="24px" height="24px"/></a>
                            <button className="c-btn c-btn--link zero-padding c-message__summary__head__actions__delete">Delete</button>
                            <a href="#/" className="c-message__summary__head__actions__delete--sm"><GetIcon id="icon-delete" width="24px" height="24px"/></a>
                        </span>
                    </div>
                    <p className="c-message__summary__account">Some account number</p>
                    <p className="c-message__summary__ref">{message.getStatus()}</p>
                    <p className="c-message__summary__date">Some Date</p>
                </div>
                </div>
            </div>
        );
    }
}

export default SecureMessage;
