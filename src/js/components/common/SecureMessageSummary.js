import React from 'react';
import GetIcon from './GetIcon';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import cx from 'classnames';
import MessageEntity from '../../entities/MessageEntity';
import ModalComponent from '../common/ModalComponent';
import {sendDeleteData, sendMessageData} from '../../actions/AppActions';
import SendMessageRequestEntity from '../../entities/SendMessageRequestEntity.js'
import { connect } from 'react-redux';
let messageEntity = new SendMessageRequestEntity();
class SecureMessageSummary extends React.Component {
    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
        this.state = {
            showDeleteConfirmModal: false,
            showDeleteSuccessModal: false,
        };
        this.returnModalComponent = this.returnModalComponent.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.deleteClick = this.deleteClick.bind(this);
        this.returnDeleteSuccessModalComponent = this.returnDeleteSuccessModalComponent.bind(this);
        this.closeSuccessModal = this.closeSuccessModal.bind(this);
    }

    handleClick() {
        alert("clicked");
    };
    handlebttn() {
        alert("bttn clicked");
    };
    getSummaryIcon = () => {
        let iconId = (this.props.readFlag) ? 'icon-message-open' : 'icon-envelope';
        return ((!this.props.draftFlag && !this.props.threadFlag && !this.props.sentFlag) && <span className="c-message__icon"><GetIcon id={iconId} width="24px" height="24px" /></span>);
    }
    hasOnClick = (message) => {
        let path = (this.props.draftFlag) ? '/draftsecuremessage' : '/viewmessage';
        // console.log("this.props.readFlag " + this.props.readFlag);
        // console.log("message.getSubject() -----------> " + message.getSubject());
        let messageTitle ='';
        if (!this.props.sentFlag && !this.props.draftFlag) {
            messageTitle = `Unread ` + message.getSubject();
        } else {            
            messageTitle = message.getSubject();
        }
        if (this.props.readFlag && this.props.hasOnClick) {
            // console.log("this.props.readFlag inside if -----> " + this.props.readFlag);
            return (<Link to={{ pathname: path, messageDetail: message }} className="c-message__summary__head__title__subject__link">{message.getSubject()}</Link>);
        } else if (this.props.hasOnClick) {
            return (<Link aria-label={`${messageTitle}`} to={{ pathname: path, messageDetail: message }} className="c-message__summary__head__title__subject__link">{message.getSubject()}</Link>);
        } else
            return message.getSubject()

        // if (this.props.hasOnClick) {
        //     return (<Link aria-label="Unread payment enquiries" to={{ pathname: path, messageDetail: message }} className="c-message__summary__head__title__subject__link">{message.getSubject()}</Link>);
        // } else
        //     return message.getSubject()
    }
    getReplyButton = (message) => {
        let replymessage = ``;
        if (this.props.readFlag) {
            replymessage = `Reply ` + message.getSubject();
        } else {
            replymessage = `Reply Unread ` + message.getSubject();        
        }
        return (!this.props.draftFlag && !this.props.threadFlag && !this.props.sentFlag) && 
            (<Link to={{ pathname: '/replysecuremessage', backPath: this.props.viewMessageFlag ? '/viewmessage' : '/securemessages', messageDetail: message }} className="c-btn c-btn--link c-message__summary__head__actions__reply u-no-padding">
                <span id="replyMsg" className="c-message__summary__head__actions__reply__txt" aria-label={`${replymessage}`}>Reply</span>
                <span className="c-message__summary__head__actions__reply__icon">
                    <GetIcon id="icon-reply" width="24px" height="24px" />
                </span>
            </Link>)
    }

    getDeleteButton = (message) => {
        let deletemessage = ``;
        if (!this.props.sentFlag && !this.props.draftFlag) {
            if (this.props.readFlag) {
                deletemessage = `Delete ` + message.getSubject();
            } else {
                deletemessage = `Delete Unread ` + message.getSubject();   
            }
        } else {
            deletemessage = `Delete ` + message.getSubject();            
        }
        return !this.props.threadFlag && (<button className="c-btn c-btn--link c-message__summary__head__actions__delete u-no-padding" onClick={this.handleDelete}>
            <span id="deleteMsg" className="c-message__summary__head__actions__delete__txt" aria-label={`${deletemessage}`}>Delete</span>
            <span className="c-message__summary__head__actions__delete__icon">
                <GetIcon id="icon-delete" width="24px" height="24px" />
            </span>
        </button>)
    }
    handleDelete(data) {
        this.setState({ showDeleteConfirmModal: true });
    }
    closeModal() {
        setTimeout(() => {
            document.getElementById('headingTag').focus();
        }, 20);
        this.setState({ showDeleteConfirmModal: false });
    }
    deleteClick() {
        this.setState({ showDeleteSuccessModal: true, showDeleteConfirmModal: false });
        this.props.dispatch(updateMessageData(this.props.message, this.props.message.id, "DELETED"));
    }
    closeSuccessModal(){
       // document.getElementById('headingTag').focus();
        this.setState({ showDeleteSuccessModal: false });
    }
    returnDeleteSuccessModalComponent() {
        let bodyContent = <div>Message Deleted</div>;
        let footerButtons = <div><button type="button" onClick={this.closeSuccessModal} className="c-btn c-btn--primary c-modal__button">OK</button></div>;
        return (<ModalComponent show
            onHide={this.closeSuccessModal}
            customClass={"c-modal c-modal--center"}
            bsSize="medium"
            modalheading={''}
            modalbody={bodyContent}
            modalfooter={footerButtons}
            modalInContainer={false}
            closeButton />);
    }
    returnModalComponent() {
        let bodyContent = <div className="callout callout__error">You won’t be able to recover this message if you delete it.</div>;
        let footerButtons = <div><button type="button" onClick={this.closeModal} className="c-btn c-btn--secondary c-modal__button">Close</button>
            <button type="button" onClick={this.deleteClick} className="c-btn c-btn--default c-modal__button">Delete message</button></div>;
        return (<ModalComponent show
            onHide={this.closeModal}
            customClass={"c-modal"}
            bsSize="medium"
            modalheading={'Delete this message?'}
            modalbody={bodyContent}
            modalfooter={footerButtons}
            modalInContainer={false}
            closeButton />);
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
            'c-message__summary--no-icon': this.props.draftFlag || this.props.sentFlag,
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
                            <h2 id="subjectMsg" className={subjectClass}>
                                {this.hasOnClick(message)}
                            </h2>
                            <p className="c-message__summary__head__title__ref">{message.getReference()}</p>
                        </div>
                        <div className={actionsClass}>
                            {this.getReplyButton(message)}
                            {this.getDeleteButton(message)}
                        </div>
                    </div>
                    {!this.props.viewMessageFlag && <p className="c-message__summary__account">{message.getMessageBody()}</p>}
                    {this.props.viewMessageFlag && <p className="c-message__summary__account">Account : {this.props.message.account.accountNumber}</p>}
                    <p className="c-message__summary__date">{message.getDateCreated()}</p>
                </div>
                {this.state.showDeleteConfirmModal && this.returnModalComponent()}
                {this.state.showDeleteSuccessModal && this.returnDeleteSuccessModalComponent()}
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
/**
 * Maps the state of the component to the state of the redux store
 * @param {object} state. State of the application
 */
const mapState = (state) => {
    return {
        messagesubjects: state.subjects,
        messageaccounts: state.accounts,
    }
};
export default connect(mapState)(SecureMessageSummary);
