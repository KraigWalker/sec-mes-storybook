import React from 'react';
import PropTypes from 'prop-types';
import SvgIcon from '../common/GetIcon';
import cx from 'classnames';
import MessageEntity from '../../entities/MessageEntity';

class SecureMessage extends React.Component {
    constructor(props){
        console.log(PropTypes);
        super(props);
    }
    render() {
        const { message } = this.props;
        let messageClass = cx({
            'c-message': true,
			'c-message--stacked': this.props.listFlag,
            'c-message--read': this.props.readFlag,
            'u-cursor-pointer': true,
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

        let iconId = this.props.readFlag ? 'icon-message-open' : 'icon-envelope';
        return (
            <div className={messageClass}>
                {
                    this.props.draftFlag
                    ? null
                    : <span className="c-message__icon"><SvgIcon id={iconId} width="24px" height="24px"/></span>
                }
                
                <div className={summaryClass}>
                    <div className="c-message__summary__head">
                        <div className={titleClass}>
                            <h2 className={subjectClass}>{message.getSubject()}</h2>
                            <p className="c-message__summary__head__title__ref">(Reference number)</p>
                        </div>
                        <div className="c-message__summary__head__actions">
                            {
                                this.props.draftFlag
                                ? null
                                :
                                <button className="c-btn c-btn--link zero-padding c-message__summary__head__actions__reply">
                                    <span className="c-message__summary__head__actions__reply__txt">Reply</span>
                                    <span className="c-message__summary__head__actions__reply__icon">
                                        <SvgIcon id="icon-reply" width="24px" height="24px"/>
                                    </span>
                                </button>
                            }
                            <button className="c-btn c-btn--link zero-padding c-message__summary__head__actions__delete">
                                <span className="c-message__summary__head__actions__reply__txt">Delete</span>
                                <span className="c-message__summary__head__actions__reply__icon">
                                    <SvgIcon id="icon-delete" width="24px" height="24px"/>
                                </span>
                            </button>
                        </div>
                    </div>
                    <p className="c-message__summary__account">First line of message</p>
                    <p className="c-message__summary__date">Date</p>
                </div>
            </div>
        );
    }
}

SecureMessage.propTypes = {
    listFlag: PropTypes.bool,
    draftFlag: PropTypes.bool,
    readFlag: PropTypes.bool,
    message: PropTypes.instanceOf(MessageEntity),
};
SecureMessage.defaultProps = {
	listFlag: false,
    draftFlag: false,
    readFlag: false,
};

export default SecureMessage;
