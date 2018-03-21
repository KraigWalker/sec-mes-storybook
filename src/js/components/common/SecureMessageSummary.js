import React from 'react';
import GetIcon from './GetIcon';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import cx from 'classnames';
import MessageEntity from '../../entities/MessageEntity';
import ModalComponent from '../common/ModalComponent';
import { updateMessageData } from '../../actions/AppActions';
import SendMessageRequestEntity from '../../entities/SendMessageRequestEntity.js';
import { connect } from 'react-redux';

const messageEntity = new SendMessageRequestEntity();
class SecureMessageSummary extends React.Component {
	constructor(props) {
		super(props);
		this.handleDelete = this.handleDelete.bind(this);
		this.state = {
			showDeleteConfirmModal: false,
			showDeleteSuccessModal: false,
			showSendServiceErrorModal: false,
		};
		this.returnModalComponent = this.returnModalComponent.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.deleteClick = this.deleteClick.bind(this);
		this.returnDeleteSuccessModalComponent = this.returnDeleteSuccessModalComponent.bind(
			this
		);
    this.closeSuccessModal = this.closeSuccessModal.bind(this);
    this.errorCloseClicked = this.errorCloseClicked.bind(this);
		this.retryServiceCall = this.retryServiceCall.bind(this);
	}

  getSummaryIcon = () => {
  	if (!this.props.threadFlag) {
  		const { message } = this.props;
  		const iconId =
      message.status === 'READ' ? 'icon-message-open' : 'icon-envelope';
  		return (
  			<span className="c-message__icon">
  				<GetIcon id={iconId} width="24px" height="24px" />
  			</span>
  		);
  	}
  };
  hasOnClick = () => {
    const { message } = this.props;
    let path =
      message.status === "DRAFT"
        ? `${window.baseURl}/draftsecuremessage`
        : `${window.baseURl}/viewmessage`;
    let messageTitle = "";
    if (message.status === "NEW") {
      //   this.props.dispatch(updateMessageData(message, message.id, "READ"));
      messageTitle = `Unread ` + message.getSubject();
    } else {
      messageTitle = message.getSubject();
    }
    if (!this.props.threadFlag) {
      if (message.status === "READ") {
        return (
          <Link
            to={{ pathname: path, messageDetail: message }}
            className="c-message__summary__head__title__subject__link"
          >
            {message.getSubject()}
          </Link>
        );
      } 
        return (
          <Link
            aria-label={`${messageTitle}`}
            to={{ pathname: path, messageDetail: message }}
            className="c-message__summary__head__title__subject__link"
          >
            {message.getSubject()}
          </Link>
        );
      
    } else {
      return message.getSubject();
    }
  };
  getReplyButton = () => {
  	const { message } = this.props;
  	let replymessage = '';
  	if (message.status === 'READ') {
  		replymessage = 'Reply ' + message.getSubject();
  	} else {
  		replymessage = 'Reply Unread ' + message.getSubject();
  	}
  	return (
  		!this.props.threadFlag && (
  			<Link
  				to={{
  					pathname: `${window.baseURl}/replysecuremessage`,
  					backPath: this.props.viewMessageFlag
  						? `${window.baseURl}/viewmessage`
  						: `${window.baseURl}/securemessages`,
  					messageDetail: message,
  				}}
  				className="c-btn c-btn--link c-message__summary__head__actions__reply u-no-padding"
  			>
  				<span
  					id="replyMsg"
  					className="c-message__summary__head__actions__reply__txt"
	aria-label={`${replymessage}`}
  				>
            Reply
  				</span>
	<span className="c-message__summary__head__actions__reply__icon">
	<GetIcon id="icon-reply" width="24px" height="24px" />
  				</span>
  			</Link>
  		)
  	);
  };

  getDeleteButton = () => {
  	const { message } = this.props;
  	let deletemessage = '';
  	if (!message.status !== 'NEW') {
  		deletemessage = 'Delete ' + message.getSubject();
  	} else {
  		deletemessage = 'Delete Unread ' + message.getSubject();
  	}
  	return (
	<button
  			className="c-btn c-btn--link c-message__summary__head__actions__delete u-no-padding"
  			onClick={this.handleDelete}
  		>
  			<span
	id="deleteMsg"
	className="c-message__summary__head__actions__delete__txt"
	aria-label={`${deletemessage}`}
  			>
          Delete
  			</span>
  			<span className="c-message__summary__head__actions__delete__icon">
	<GetIcon id="icon-delete" width="24px" height="24px" />
  			</span>
  		</button>
  	);
  };
  handleDelete(data) {
  	this.setState({ showDeleteConfirmModal: true });
  }
  errorCloseClicked() {
  	this.setState({ showSendServiceErrorModal: false });
  }
  retryServiceCall() {
  	if (this.state.showSendServiceErrorModal) {
  		this.props.dispatch(
  			updateMessageData(
  				this.props.message,
  				this.props.message.id,
  				'DELETED'
  			)
  		);
  	}
  }
  closeModal() {
  	setTimeout(() => {
  		document.getElementById('headingTag').focus();
  	}, 20);
  	this.setState({ showDeleteConfirmModal: false });
  }
  deleteClick() {
  	this.setState({
  		showDeleteSuccessModal: true,
  		showDeleteConfirmModal: false,
  		showSendServiceErrorModal: true,
  	});
  	this.props.dispatch(
  		updateMessageData(this.props.message, this.props.message.id, 'DELETED')
  	);
  }
  closeSuccessModal() {
  	// document.getElementById('headingTag').focus();
  	this.setState({ showDeleteSuccessModal: false });
  }
  returnDeleteSuccessModalComponent() {
  	const bodyContent = (
  		<div>
	<div>
	<GetIcon id="icon-success" width="68px" height="68px" />
  			</div>{this.props.content.messageDeleted}
  		</div>
  	);
  	const footerButtons = this.props.viewMessageFlag ? (
  		<div>
  			<Link
	to={`${window.baseURl}/securemessages`}
  				type="button"
  				onClick={this.closeSuccessModal}
	className="c-btn c-btn--primary c-btn--sm c-modal__button"
  			>
          OK
  			</Link>
  		</div>
  	) : (
	<div>
  			<button
  				type="button"
  				onClick={this.closeSuccessModal}
	className="c-btn c-btn--primary c-btn--sm c-modal__button"
  			>
          OK
  			</button>
  		</div>
  	);
  	return (
	<ModalComponent
  			show
  			customClass="c-modal c-modal--center"
  			bsSize="small"
	modalheading=""
	modalbody={bodyContent}
	modalfooter={footerButtons}
  			modalInContainer={false}
	closeButton={false}
  		/>
  	);
  }
  returnErrorModal() {
  	const bodyContent = (
	<div>
	<h3>{this.props.content.sorryHeader}</h3>
	<br />
	<p>{this.props.content.tryAgain}</p>
  			<br />
	<p>{this.props.content.getInTouch}</p>
    </div>
  	);
  	const footerButtons = (
  		<div>
		<button
  				type="button"
  				className="c-btn c-btn--secondary c-modal__button"
  				onClick={this.errorCloseClicked}
  			>
        Back
     </button>
		<button
		type="button"
		onClick={this.retryServiceCall}
		className="c-btn c-btn--default c-modal__button"
  			>
		{this.props.content.retry}
  			</button>
	</div>
  	);
  	return (
	<ModalComponent
	show
	onHide={this.errorCloseClicked}
	customClass="c-modal c-modal--center"
  			bsSize="medium"
  			modalheading=""
	modalbody={bodyContent}
	modalfooter={footerButtons}
  			modalInContainer={false}
	closeButton
  		/>
  	);
  }
  returnModalComponent() {
  	const bodyContent = (
	<div className="callout callout__error">
	{this.props.content.deleteMessageBody}
  		</div>
  	);
  	const footerButtons = (
	<div>
  			<button
  				type="button"
  				onClick={this.closeModal}
  				className="c-btn c-btn--secondary c-modal__button"
  			>
	{this.props.content.dontDelButton}
  			</button>
  			<button
  				type="button"
  				onClick={this.deleteClick}
  				className="c-btn c-btn--default c-modal__button"
  			>
  				{this.props.content.delButton}
  			</button>
  		</div>
  	);
  	return (
	<ModalComponent
  			show
  			onHide={this.closeModal}
  			customClass="c-modal"
  			modalheading={this.props.content.deleteMessageHeading}
  			modalbody={bodyContent}
  			modalfooter={footerButtons}
	modalInContainer={false}
  			closeButton
  		/>
  	);
  }
  render() {
  	const { message } = this.props;
  	const messageClass = cx({
  		'c-message': true,
  		'c-message--stacked': this.props.listFlag,
  		'c-message--read': message.status === 'READ',
  		'u-position-relative': !this.props.threadFlag,
  		'c-message--noborder': this.props.threadFlag,
  	});
  	const summaryClass = cx({
  		'c-message__summary': true,
  		'c-message__summary--no-icon':
        message.status === 'DRAFT' ||
        message.status === 'SENT' ||
        message.status === 'PENDING',
  	});
  	const titleClass = cx({
  		'c-message__summary__head__title': true,
  		'c-message__summary__head__title--draft': message.status === 'DRAFT',
  	});
  	const subjectClass = cx({
  		'c-message__summary__head__title__subject': true,
  		'c-message__summary__head__title__subject--read': message.status !== 'NEW',
  	});
  	const actionsClass = cx({
  		'c-message__summary__head__actions': true,
  		'u-position-relative': !this.props.threadFlag,
  	});

  	const accNo = this.props.message.account.accountNumber
  		? this.props.message.account.accountNumber
  		: 'No specific account';
  	return (
  		<div className={messageClass}>
  			{(message.status === 'READ' || message.status === 'NEW') &&
          this.getSummaryIcon()}
  			<div className={summaryClass}>
	<div className="c-message__summary__head">
  					<div className={titleClass}>
  						<h2 id="subjectMsg" className={subjectClass}>
	{this.hasOnClick()}
  						</h2>
  						<p className="c-message__summary__head__title__ref">
  							{message.getReference()}
  						</p>
  					</div>
  					<div className={actionsClass}>
	{(message.status === 'NEW' || message.status === 'READ') &&
                this.getReplyButton(message)}
  						{!this.props.threadFlag && this.getDeleteButton()}
  					</div>
  				</div>
	{!this.props.viewMessageFlag && (
  					<p className="c-message__summary__account">
  						{message.getMessageBody()}
  					</p>
  				)}
  				{this.props.viewMessageFlag && (
  					<p className="c-message__summary__account">Account : {accNo}</p>
  				)}
  				<p className="c-message__summary__date">{message.getDateCreated()}</p>
  			</div>
	{this.state.showDeleteConfirmModal && this.returnModalComponent()}
  			{this.state.showDeleteSuccessModal &&
        this.props.messages.successModal &&
        this.returnDeleteSuccessModalComponent()}
  			{this.props.messages.draftError &&
        this.state.showSendServiceErrorModal &&
        this.returnErrorModal()}
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
const mapState = state => ({
    messages: state.messages,
    messagesubjects: state.subjects,
    messageaccounts: state.accounts
  });
export default connect(mapState)(SecureMessageSummary);
