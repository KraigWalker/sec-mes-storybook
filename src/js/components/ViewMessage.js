import React from "react";
import StepHeader from "./common/StepHeader";
import SecureMessageSummary from "./common/SecureMessageSummary";
import TextArea from "./common/TextAreaComponent";
import Threads from "./common/ThreadList";
import _ from "lodash";
import { connect } from "react-redux";
import {
  setViewMessageDetail,
  updateMessage,
  updateMessageData,
  popupState
} from "../actions/AppActions";
import { getThreadsBL } from "../bl/SecureMessageBL";
import {
  getMessageType,
  updateMessageStatus
} from "../utils/SecureMessageUtils";
import { Link } from "react-router-dom";
import GetIcon from "./common/GetIcon";
import SendMessageRequestEntity from "../entities/SendMessageRequestEntity.js";
import ModalComponent from "./common/ModalComponent";
import { sendDeleteData } from "../actions/AppActions";
let messageEntity = new SendMessageRequestEntity();

class ViewMessage extends React.Component {
	constructor(props) {
		super(props);
		this.getReplyButton = this.getReplyButton.bind(this);
		this.getDeleteButton = this.getDeleteButton.bind(this);
		this.state = {
			showDeleteConfirmModal: false,
			showDeleteSuccessModal: false,
			showSendServiceErrorModal: false,
		};
		this.closeModal = this.closeModal.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
		this.deleteClick = this.deleteClick.bind(this);
		this.returnDeleteSuccessModalComponent = this.returnDeleteSuccessModalComponent.bind(
			this
		);
		this.returnModalComponent = this.returnModalComponent.bind(this);
		this.closeSuccessModal = this.closeSuccessModal.bind(this);
		this.errorCloseClicked = this.errorCloseClicked.bind(this);
		this.retryServiceCall = this.retryServiceCall.bind(this);
	}

	componentDidMount() {
		const { messageDetail } = this.props.location;
		messageDetail &&
      this.props.dispatch(
      	setViewMessageDetail(this.props.location.messageDetail)
      ); // to set current viewing message
		// Below is to update New message to Read message status.
		if (messageDetail && this.props.location.messageDetail.status === 'NEW') {
			this.props.dispatch(
				updateMessageData(
					this.props.location.messageDetail,
					this.props.location.messageDetail.id,
					'READ'
				)
			);
		}
		this.props.dispatch(popupState());
		window.scrollTo(0, 0);
	}
	getThreads(messages, currentMessage) {
		const threads = getThreadsBL(messages, currentMessage);
		return <Threads Threads={threads} />;
	}
  getReplyButton = message => {
  	if (getMessageType(message.status) !== 'sent') {
  		return (
  			<Link
  				to={{ pathname: `${window.baseURl}/replysecuremessage`, backPath: `${window.baseURl}/viewmessage`, messageDetail: message }}
		className="c-btn c-btn--primary"
	>
          Reply
	</Link>
  		);
  	} return '';
  };

  getDeleteButton = message => (
  	<button className="c-btn c-btn--secondary" onClick={this.handleDelete}>
      Delete
	  	 </button>
  );
  handleDelete(data) {
  	this.setState({ showDeleteConfirmModal: true });
  }
  closeModal() {
  	this.setState({ showDeleteConfirmModal: false });
  }
  errorCloseClicked() {
  	this.setState({ showSendServiceErrorModal: false });
  }
  retryServiceCall() {
  	if (this.state.showSendServiceErrorModal) {
  		this.props.dispatch(
  			updateMessageData(
  				this.props.location.messageDetail,
  				this.props.location.messageDetail.id,
  				'DELETED'
  			)
  		);
  	}
  }
  deleteClick() {
  	this.setState({
  		showDeleteSuccessModal: true,
  		showDeleteConfirmModal: false,
  		showSendServiceErrorModal: true,
  	});
  	this.props.dispatch(
  		updateMessageData(
  			this.props.location.messageDetail,
  			this.props.location.messageDetail.id,
  			'DELETED'
  		)
  	);
  }
  getBackButton() {
  	return (
  		<Link
		to={{ pathname: `${window.baseURl}/securemessage` }}
  			className="c-btn c-btn--secondary"
	>
        Back
	</Link>
  	);
  }
  returnModalComponent() {
  	const bodyContent = (
  		<div className="callout callout__error">
        You won’t be able to recover this message if you delete it.
 </div>
  	);
  	const footerButtons = (
  		<div>
		<button
	type="button"
	onClick={this.closeModal}
  				className="c-btn c-btn--secondary c-modal__button"
  			>
          Close
     </button>
		<button
	type="button"
  				onClick={this.deleteClick}
  				className="c-btn c-btn--default c-modal__button"
  			>
          Delete message
  			</button>
	</div>
  	);
  	return (
  		<ModalComponent
		show
  			onHide={this.closeModal}
		customClass="c-modal"
		modalheading="Delete this message?"
  			modalbody={bodyContent}
		modalfooter={footerButtons}
  			modalInContainer={false}
		closeButton
	/>
  	);
  }
  returnDeleteSuccessModalComponent() {
  	const bodyContent = (
  		<div>
		<div>
  				<GetIcon id="icon-success" width="68px" height="68px" />
</div>{this.props.content.messageDeleted}
 </div>
  	);
  	const footerButtons = (
	<Link
  			to={`${window.baseURl}/securemessages`}
  			onClick={this.closeSuccessModal}
	className="c-btn c-btn--default c-btn--sm c-modal__button"
  		>
        OK
    </Link>
  	);

  	return (
  		<ModalComponent
  			show
  			customClass="c-modal c-modal-center"
		bsSize="small"
		modalheading=""
		modalbody={bodyContent}
		modalfooter={footerButtons}
		modalInContainer={false}
		closeButton={false}
	/>
  	);
  }
  closeSuccessModal() {
  	this.setState({ showDeleteSuccessModal: false });
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
  render() {
  	const { messageDetail } = this.props.location.messageDetail
  		? this.props.location
  		: this.props;
  	return (
  		<div className="container">
  			<div className="row">
		<div className="col-md1-18">
  					<StepHeader
  						showheaderCrumbs
				headerCrumbsPath={{
  							pathname: `${window.baseURl}/securemessages`,
  						}}
				headerCrumbsMessage="Back"
  						headerTitle={
  							getMessageType(messageDetail.status) == 'sent'
  								? this.props.content.sentPageTitle
  								: this.props.content.inboxPageTitle
  						}
			/>

	<SecureMessageSummary
	message={messageDetail}
	viewMessageFlag
  						readFlag={messageDetail.status === 'READ'}
  						sentFlag={getMessageType(messageDetail.status) === 'sent'}
  						content={this.props.content}
  					/>
  					<pre>{messageDetail.message}</pre>
	<div className="c-btn--group">
				{this.getBackButton()}
  						{this.getDeleteButton(messageDetail)}
  						{this.getReplyButton(messageDetail)}
			</div>
  					{this.state.showDeleteConfirmModal && this.returnModalComponent()}
  					{this.state.showDeleteSuccessModal &&
              this.props.messages.successDeleteModal &&
              this.returnDeleteSuccessModalComponent()}
  					{this.props.messages.draftError &&
              this.state.showSendServiceErrorModal &&
              this.returnErrorModal()}
  					{messageDetail.threadID !== null &&
              this.getThreads(this.props.messages.messages, messageDetail)}
  				</div>
	</div>
 </div>
  	);
  }
}

const mapState = state => ({
	messages: state.messages,
	messageDetail: state.viewMessage.messageDetail,
});

export default connect(mapState)(ViewMessage);
