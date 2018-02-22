import React from 'react';
import GetIcon from './GetIcon';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import cx from 'classnames';
import MessageEntity from '../../entities/MessageEntity';
import ModalComponent from '../common/ModalComponent';
import { updateMessageData} from '../../actions/AppActions';
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
    
    getSummaryIcon = () => {
        const { message } = this.props;
        let iconId = message.status === 'READ' ? 'icon-message-open' : 'icon-envelope';
        return (<span className="c-message__icon"><GetIcon id={iconId} width="24px" height="24px" /></span>);
    }
    hasOnClick = () => {
        const { message } = this.props;
        let path = message.status === 'DRAFT' ? `${window.baseURl}/draftsecuremessage` : `${window.baseURl}/viewmessage`;
        let messageTitle =''    ;
        if (message.status === 'NEW') {
            messageTitle = `Unread ` + message.getSubject();
        } else {            
            messageTitle = message.getSubject();
        }
        if (!this.props.threadFlag) {
            if (message.status === 'READ') {
                return (<Link to={{ pathname: path, messageDetail: message }} className="c-message__summary__head__title__subject__link">{message.getSubject()}</Link>);
            } else {
                return (<Link aria-label={`${messageTitle}`} to={{ pathname: path, messageDetail: message }} className="c-message__summary__head__title__subject__link">{message.getSubject()}</Link>);        
            }
        } else {
            return message.getSubject();
        }
    }
    getReplyButton = () => {
        const { message } = this.props;
        let replymessage = ``;
        if (message.status === 'READ') {
            replymessage = `Reply ` + message.getSubject();
        } else {
            replymessage = `Reply Unread ` + message.getSubject();        
        }
        return (!this.props.threadFlag) && 
            (<Link to={{ pathname: `${window.baseURl}/replysecuremessage`, backPath: this.props.viewMessageFlag ? `${window.baseURl}/viewmessage` : `${window.baseURl}/securemessages`, messageDetail: message }} className="c-btn c-btn--link c-message__summary__head__actions__reply u-no-padding">
                <span id="replyMsg" className="c-message__summary__head__actions__reply__txt" aria-label={`${replymessage}`}>Reply</span>
                <span className="c-message__summary__head__actions__reply__icon">
                    <GetIcon id="icon-reply" width="24px" height="24px" />
                </span>
            </Link>)
    }

    getDeleteButton = () => {
        const { message } = this.props;
        let deletemessage = ``;
       if (!message.status !== 'NEW' ) {
            deletemessage = `Delete ` + message.getSubject();
        } else {
            deletemessage = `Delete Unread ` + message.getSubject();   
        }
        return (<button className="c-btn c-btn--link c-message__summary__head__actions__delete u-no-padding" onClick={this.handleDelete}>
            <span id="deleteMsg" className="c-message__summary__head__actions__delete__txt" aria-label={`${deletemessage}`}>Delete</span>
            <span className="c-message__summary__head__actions__delete__icon">
                <GetIcon id="icon-delete" width="24px" height="24px" />
            </span>
        </button>);
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
        let bodyContent = <div><div><GetIcon id="icon-success" width="68px" height="68px" /></div>Message Deleted</div>;
        let footerButtons = <div><button type="button" onClick={this.closeSuccessModal} className="c-btn c-btn--primary c-btn--sm c-modal__button">OK</button></div>;
        return (<ModalComponent show
            onHide={this.closeSuccessModal}
            customClass={"c-modal c-modal--center"}
            bsSize={'small'}
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
            'c-message--read': message.status === 'READ',
            'u-position-relative': !this.props.threadFlag,
            'c-message--noborder': this.props.threadFlag,
        });
        let summaryClass = cx({
            'c-message__summary': true,
            'c-message__summary--no-icon': message.status === 'DRAFT' || message.status === 'SENT' || message.status === 'PENDING',
        });
        let titleClass = cx({
            'c-message__summary__head__title': true,
            'c-message__summary__head__title--draft': message.status === 'DRAFT',
        });
        let subjectClass = cx({
            'c-message__summary__head__title__subject': true,
            'c-message__summary__head__title__subject--read': message.status !== 'NEW',
        });
        let actionsClass = cx({
            'c-message__summary__head__actions': true,
            'u-position-relative': !this.props.threadFlag,
        });


        return (
            <div className={messageClass}>
                {(message.status === 'READ' || message.status === 'NEW') && this.getSummaryIcon()}
                <div className={summaryClass} >
                    <div className="c-message__summary__head">
                        <div className={titleClass}>
                            <h2 id="subjectMsg" className={subjectClass}>
                                {this.hasOnClick()}
                            </h2>
                            <p className="c-message__summary__head__title__ref">{message.getReference()}</p>
                        </div>
                        <div className={actionsClass}>
                            {(message.status === 'NEW' || message.status === 'READ') && this.getReplyButton(message)}
                            {!this.props.threadFlag && this.getDeleteButton()}
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
