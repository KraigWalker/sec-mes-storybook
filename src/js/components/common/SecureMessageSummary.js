import React from 'react';
import GetIcon from './GetIcon';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import cx from 'classnames';
import MessageEntity from '../../entities/MessageEntity';

class SecureMessageSummary extends React.Component {

    handleClick () {
        alert("clicked");
    };
    handlebttn () {
        alert("bttn clicked");
    };

    render() {
        const { message } = this.props;
            
            let messageClass = cx({
                'c-message': true,
                'c-message--stacked': this.props.listFlag,
                'c-message--read': this.props.readFlag,
                'u-position-relative': this.props.hasOnClick,
            });
    
            let summaryClass = cx({
                'c-message__summary': true,
                'c-message__summary--draft': this.props.draftFlag,
            });
    
            let titleClass = cx({
                'c-message__summary__head__title': true,
                'c-message__summary__head__title--draft': this.props.draftFlag,
            });
    
            let subjectClass = cx({
                'c-message__summary__head__title__subject': true,
                'c-message__summary__head__title__subject--read': this.props.readFlag,
            });
    
            let actionsClass = cx({
                'c-message__summary__head__actions': true,
                'u-position-relative': this.props.hasOnClick,
            });
    
            let iconId = this.props.readFlag ? 'icon-message-open' : 'icon-envelope';
        return (
            <div className={messageClass}>
            {this.props.draftFlag ? null : <span className="c-message__icon"><GetIcon id={iconId} width="24px" height="24px"/></span>}
            <div className={summaryClass} >
                <div className="c-message__summary__head">
                    <div className={titleClass}>
                        <h2 className={subjectClass}>
                            {this.props.hasOnClick? <Link  to = {{ pathname : '/viewmessage', messageDetail : message }} className="c-message__summary__head__title__subject__link">
                                                        {message.getSubject()}
                                                    </Link> : message.getSubject()
                            }
                        </h2>
                        <p className="c-message__summary__head__title__ref">{message.getReference()}</p>
                    </div>
                    <div className={actionsClass}>
                        {
                            this.props.draftFlag ? null
                            :
                            <button className="c-btn c-btn--link c-message__summary__head__actions__reply u-no-padding" onClick={this.handlebttn}>
                                <span className="c-message__summary__head__actions__reply__txt">Reply</span>
                                <span className="c-message__summary__head__actions__reply__icon">
                                    <GetIcon id="icon-reply" width="24px" height="24px"/>
                                </span>
                            </button>
                        }
                        <button className="c-btn c-btn--link c-message__summary__head__actions__delete u-no-padding" onClick={this.handlebttn}>
                            <span className="c-message__summary__head__actions__delete__txt">Delete</span>
                            <span className="c-message__summary__head__actions__delete__icon">
                                <GetIcon id="icon-delete" width="24px" height="24px"/>
                            </span>
                        </button>
                    </div>
                </div>
                <p className="c-message__summary__account">First line of message</p>
                <p className="c-message__summary__date">{message.getDateCreated()}</p>
            </div>
        </div>
        );
    }
}

SecureMessageSummary.propTypes = {
    listFlag: PropTypes.bool,
    draftFlag: PropTypes.bool,
    readFlag: PropTypes.bool,
    hasOnClick: PropTypes.bool,
    message: PropTypes.instanceOf(MessageEntity),
};
SecureMessageSummary.defaultProps = {
	listFlag: false,
    draftFlag: false,
    readFlag: false,
    hasOnClick: false,
};

export default SecureMessageSummary;
