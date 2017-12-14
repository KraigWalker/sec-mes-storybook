import React from 'react';
import StepHeader from './common/StepHeader';
import SecureMessageSummary from './common/SecureMessageSummary';
import TextArea from './common/TextAreaComponent';
import Threads from './common/ThreadList'
import _ from 'lodash';
import { connect } from 'react-redux';
import { getSecureMessages, setViewMessageDetail, updateMessage } from '../actions/AppActions';
import { getThreadsBL } from '../bl/SecureMessageBL'
import { getMessageType, updateMessageStatus } from '../utils/SecureMessageUtils';
import { Link } from 'react-router-dom';
import GetIcon from './common/GetIcon';
import ModalComponent from './common/ModalComponent';
import { sendDeleteData } from '../actions/AppActions';

class ViewMessage extends React.Component {
    constructor(props) {
        super(props);
        this.getReplyButton = this.getReplyButton.bind(this);
        this.getDeleteButton = this.getDeleteButton.bind(this);
        this.state = {
            showDeleteConfirmModal: false,
            showDeleteSuccessModal: false,
        };
        this.closeModal = this.closeModal.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.deleteClick = this.deleteClick.bind(this);
        this.returnDeleteSuccessModalComponent = this.returnDeleteSuccessModalComponent.bind(this);
        this.returnModalComponent = this.returnModalComponent.bind(this);
        this.closeSuccessModal = this.closeSuccessModal.bind(this);
    }
    componentWillMount() {
        this.props.dispatch(getSecureMessages());
    }
    componentDidMount() {
        const { messageDetail } = this.props.location;
        messageDetail && this.props.dispatch(setViewMessageDetail(this.props.location.messageDetail)); //to set current viewing message
        // Below is to update New message to Read message status.
        if (messageDetail && this.props.location.messageDetail.status === "NEW") {
            let UpdatedMessageList = this.props.messages;
            let updatedMessage = updateMessageStatus(this.props.location.messageDetail, 'READ');
            _.forEach(UpdatedMessageList, message => { message.id === updatedMessage.id && message.status === updatedMessage.status });
            this.props.dispatch(updateMessage(updatedMessage, UpdatedMessageList));
        }
    }
    getThreads(messages, currentMessage) {
        const threads = getThreadsBL(messages, currentMessage);
        return <Threads Threads={threads} />
    }
    getReplyButton = (message) => {
        if (getMessageType(message.status) !== "sent") {
            return (<Link to={{ pathname: '/replysecuremessage', backPath: '/viewmessage', messageDetail: message }}>
                <input type='button' name='reply' value='Reply' className="c-btn c-btn--default" />
            </Link>
            )
        } else return '';
    }

    getDeleteButton = (message) => {
        return (
            <button className="c-btn c-btn--secondary" onClick={this.handleDelete}>Delete</button>
        )
    }
    handleDelete(data) {
        this.setState({ showDeleteConfirmModal: true });
    }
    closeModal() {
        this.setState({ showDeleteConfirmModal: false });
    }
    deleteClick() {
        this.setState({ showDeleteSuccessModal: true, showDeleteConfirmModal: false });
        this.props.dispatch(sendDeleteData(this.props.location.messageDetail));
    }
    getBackButton() {
        return (
            <Link to={{ pathname: '/securemessage' }}>
                <input type='button' name='back' value='Back' className="c-btn c-btn--secondary" />
            </Link>
        )
    }
    returnModalComponent() {
        let bodyContent = <div className="callout callout__error">You won’t be able to recover this message if you delete it.</div>;
        let footerButtons = <div><button type="button" onClick={this.closeModal} className="c-btn c-btn--secondary c-modal__button">Close</button>
            <button type="button" onClick={this.deleteClick} className="c-btn c-btn--default c-modal__button">Delete message</button></div>;
        return (<ModalComponent show
            onHide={this.closeModal}
            customClass={"c-modal"}
            bsSize={'medium'}
            modalheading={'Delete this message?'}
            modalbody={bodyContent}
            modalfooter={footerButtons}
            modalInContainer={false}
            closeButton/>);
    }
    returnDeleteSuccessModalComponent() {
        let bodyContent = <div className="">Message Deleted</div>;
        let footerButtons = <button type="button" onClick={this.closeSuccessModal} className="c-btn c-btn--secondary c-modal__button">OK</button>;
        return (<ModalComponent show
            onHide={this.closeSuccessModal}
            customClass={"c-modal"}
            bsSize={'medium'}
            modalheading={''}
            modalbody={bodyContent}
            modalfooter={footerButtons}
            modalInContainer={false}
            closeButton />);
    }
    closeSuccessModal() {
        this.setState({ showDeleteSuccessModal: false });
    }
    render() {
        const { messageDetail } = this.props.location.messageDetail ? this.props.location : this.props;
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md1-18">
                        <StepHeader showheaderCrumbs={true} headerCrumbsPath={{ pathname: '/securemessages' }} headerCrumbsMessage="Back"
                            headerTitle={(getMessageType(messageDetail.status) == 'sent') ? this.props.content.sentPageTitle : this.props.content.inboxPageTitle} />

                        <SecureMessageSummary message={messageDetail} viewMessageFlag={true} readFlag={messageDetail.status === "READ"} sentFlag={getMessageType(messageDetail.status) === "sent"} />
                        <pre>
                            {messageDetail.messageBody}
                        </pre>
                        <div className="c-btn--group">
                            {this.getBackButton()}
                            {this.getDeleteButton(messageDetail)}
                            {this.getReplyButton(messageDetail)}
                        </div>
                        {this.state.showDeleteConfirmModal && this.returnModalComponent()}
                        {this.state.showDeleteSuccessModal && this.returnDeleteSuccessModalComponent()}
                        {this.getThreads(this.props.messages, messageDetail)}
                    </div>
                </div>
            </div>
        );
    }
}


const mapState = (state) => {
    return {
        messages: state.messages.messages,
        messageDetail: state.viewMessage.messageDetail
    }
};


export default connect(mapState)(ViewMessage);
