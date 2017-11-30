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
    getSummaryIcon = () => {
        let iconId = (this.props.readFlag || this.props.sentFlag)? 'icon-message-open' : 'icon-envelope';
        return ((!this.props.draftFlag && !this.props.threadFlag) && <span className="c-message__icon"><GetIcon id={iconId} width="24px" height="24px"/></span>);
    }
    hasOnClick = (message) => {
        let path = (this.props.draftFlag)? '/draftsecuremessage' : '/viewmessage';
        if(this.props.hasOnClick){
            return (<Link to = {{ pathname : path , messageDetail : message }} className="c-message__summary__head__title__subject__link">{message.getSubject()}</Link>);
        } else 
            return message.getSubject()
    }
    getReplyButton = () => {
        return (!this.props.draftFlag && !this.props.threadFlag && !this.props.sentFlag) &&
        (<Link  to = {{ pathname : '/replysecuremessage', backPath : this.props.viewMessageFlag?'/viewmessage':'/securemessages'}} className="c-btn c-btn--link c-message__summary__head__actions__reply u-no-padding">
            <span className="c-message__summary__head__actions__reply__txt">Reply</span>
            <span className="c-message__summary__head__actions__reply__icon">
                <GetIcon id="icon-reply" width="24px" height="24px"/>
            </span>
        </Link>)
    }

    getDeleteButton = () => {
        
        return !this.props.threadFlag && (<button className="c-btn c-btn--link c-message__summary__head__actions__delete u-no-padding" onClick={this.handleDelete}>
        <span className="c-message__summary__head__actions__delete__txt">Delete</span>
        <span className="c-message__summary__head__actions__delete__icon">
            <GetIcon id="icon-delete" width="24px" height="24px"/>
        </span>
        </button>)
    }
    render() {
        const { message } = this.props;
        let messageClass = cx({
            'c-message': true,
            'c-message--stacked': this.props.listFlag,
            'c-message--read': this.props.readFlag,
            'u-position-relative': this.props.hasOnClick,
            'c-message--noborder': this.props.threadFlag,
        });
        let summaryClass = cx({
            'c-message__summary': true,
            'c-message__summary--no-icon': this.props.draftFlag,
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
        

        return (
            <div className={messageClass}>
            {this.getSummaryIcon()}
            <div className={summaryClass} >
                <div className="c-message__summary__head">
                    <div className={titleClass}>
                        <h2 className={subjectClass}>
                            {this.hasOnClick(message)}
                        </h2>
                        <p className="c-message__summary__head__title__ref">{message.getReference()}</p>
                    </div>
                    <div className={actionsClass}>
                        {this.getReplyButton()}
                        {this.getDeleteButton()}
                    </div>
                </div>
                <p className="c-message__summary__account">{message.getMessageBody()}</p>
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
    threadFlag: PropTypes.bool,
    sentFlag: PropTypes.bool,
    message: PropTypes.instanceOf(MessageEntity),
};
SecureMessageSummary.defaultProps = {
	listFlag: false,
    draftFlag: false,
    readFlag: false,
    hasOnClick: false,
    threadFlag: false,
    sentFlag: false,
};

export default SecureMessageSummary;
