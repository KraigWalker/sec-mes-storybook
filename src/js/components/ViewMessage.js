import React from "react";
import {compose} from "redux";
import { utils, actions as documentActions } from "document-management-web-ui";
import _ from "lodash";
import {connect} from "react-redux";
import {
    setViewMessageDetail,
    updateMessageData
} from "../actions/AppActions";
import {getThreadsBL} from "../bl/SecureMessageBL";
import {READ, NEW, READ_ONLY, ARCHIVED, SENT} from '../constants/StringsConstants';
import MailMessage from "./MailMessage";
import {withRouter} from "react-router-dom";
import {SubordinatePanel} from 'web-ui-components/lib/molecules/panels';
import {SectionHeading} from 'web-ui-components/lib/molecules/text';
import {Card} from "web-ui-components/lib/organisms/cards";
import {Container, Row} from "web-ui-components/lib/global/layout";
import { withBreakpoints } from "../components/common/hoc/WithBreakpoint";
import { getParentPath } from "../utils/GeneralUtils";
import { popupState } from '../actions/AppActions';
import SuccessModal from "../components/common/SuccessModal";
import { getSuccessModalMessage } from "../constants/ModalConstants";

const getTitle = (status, content) =>
{
    switch(status)
    {
        case ARCHIVED:
            return content.archivePageTitle;
        case SENT:
            return content.sentPageTitle;
        default:
            return content.inboxPageTitle;
    }
}

export class ViewMessage extends React.Component {
    constructor(props) {
        super(props);
        this.getThreads = this.getThreads.bind(this);
    }

    componentDidMount() {
        const {messageDetail} = this.props.location;
        const {isWebView, setMessagesMetaData, messages } = this.props;

        messageDetail && this.props.setViewMessageDetail(messageDetail);

        // Below is to update New message to Read message status.
        if (messageDetail && messageDetail.status === 'NEW') {
            if (messages.mode !== READ_ONLY) {
                this.props.updateMessageData(
                        messageDetail,
                        messageDetail.id,
                        'READ'
                    );
            }
            if (isWebView) {
                const unreadMessageCount = messages.messages.filter(message => message.status === "NEW").length
                setMessagesMetaData({unread: unreadMessageCount - 1});
            }
        }
        window.scrollTo(0, 0);
    }

    getThreads(messages, currentMessage) {
        const threads = getThreadsBL(messages, currentMessage);
        return _.map(threads, (thread, index) => {
            return (
                <SubordinatePanel key={index}>
                    <MailMessage {...this.props} message={{...thread}}/>
                </SubordinatePanel>
            );
        });
    }

    render() {

        const {messageDetail} = this.props.location.messageDetail
            ? this.props.location
            : this.props;

        const hasAttachment = getHasAttachment(messageDetail);

        const {readOnly, 
            content, 
            containerSize, 
            noPadding,
            modalType,
            popupState} = this.props;
        const messageStatus = (messageDetail.status === NEW && readOnly !== true)
            ? READ
            : messageDetail.status;

        let paddingProps = null;
        if (noPadding)
        {
            paddingProps = {
                className: "u-padding-0",
            }
        }

        const basePath = `${window.location.origin}${getParentPath(window.location.pathname,2)}`;

        return (
            <div>
                <Container {...paddingProps} size={containerSize}>
                    <Row>
                        <Card>
                            <SectionHeading
                                heading1={getTitle(messageDetail.status, content)}></SectionHeading>

                            <MailMessage {...this.props}
                                newMessageStatus={messageStatus}
                                hasAttachment={hasAttachment}
                                basePath={basePath}/>
                            {messageDetail.threadID !== null &&
                            this.getThreads(this.props.messages.messages, messageDetail)}
                        </Card>
                    </Row>
                </Container>
                {modalType > 0 && <SuccessModal
                    onClick={popupState}
                    bodyText={getSuccessModalMessage(modalType, content)}
                    okText={content.ok}
                />}

            </div>
            
        );


    }
}

const getHasAttachment = (messageDetail) => {
    return messageDetail.document && messageDetail.document.id !== undefined;
}


const mapState = (state) => ({
    readOnly: state.messages.mode === READ_ONLY,
    noReply: state.viewMessage.messageDetail.noReply,
    messages: state.messages,
    messageDetail: state.viewMessage.messageDetail,
    modalType: state.viewMessage.modalType,
});

const mapDispatchToProps = {
    getDocumentByIdNative: documentActions.getDocumentByIdNative,
    updateMessageData,
    setViewMessageDetail,
    popupState
}

export default compose(
    connect(mapState, mapDispatchToProps),
    withRouter,
    utils.withNativeBridge(window),
    withBreakpoints
)(ViewMessage);
