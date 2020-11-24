import { Component } from 'react';
import { compose } from 'redux';
import { utils, actions as documentActions } from 'document-management-lib';
import { map } from 'lodash-es';
import { connect } from 'react-redux';
import { setViewMessageDetail, setMessageRead } from '../actions/AppActions';
import { getThreadsBL } from '../bl/SecureMessageBL';
import {
  READ,
  NEW,
  READ_ONLY,
  ARCHIVED,
  SENT,
} from '../constants/StringsConstants';
import MailMessage from './MailMessage';
import { withRouter } from 'react-router-dom';
import { SubordinatePanel } from 'web-ui-components/lib/molecules/panels';
import { SectionHeading } from 'web-ui-components/lib/molecules/text';
import { Card } from 'web-ui-components/lib/organisms/cards';
import { Container, Row } from 'web-ui-components/lib/global/layout';
import { withBreakpoints } from '../components/common/hoc/WithBreakpoint';
import { getParentPath } from '../utils/GeneralUtils';
import { popupState } from '../actions/AppActions';
import SuccessModal from '../components/common/SuccessModal';
import { getSuccessModalMessage } from '../constants/ModalConstants';
import { MessageSelectors } from '../reducers';
import withRetry from '../components/common/WithRetry';
import { getPaddingProps, getRowMarginProps } from '../utils/GeneralUtils';

function getTitle(status, content) {
  switch (status) {
    case ARCHIVED:
      return content.archivePageTitle;
    case SENT:
      return content.sentPageTitle;
    default:
      return content.inboxPageTitle;
  }
}

class ViewMessage extends Component {
  constructor(props) {
    super(props);

    this.getThreads = this.getThreads.bind(this);
    this.handleCloseSuccessModal = this.handleCloseSuccessModal.bind(this);

    this.state = {
      justBeenRead: false,
    };
  }

  componentDidMount() {
    const { messageDetail } = this.props.location;
    const { isWebView, setMessagesMetaData, messages, mode } = this.props;

    messageDetail && this.props.setViewMessageDetail(messageDetail);

    // Below is to update New message to Read message status.
    if (messageDetail && messageDetail.status === 'NEW') {
      if (mode !== READ_ONLY) {
        this.props.setMessageRead(messageDetail);
        this.setState({
          justBeenRead: true,
        });
      }
      if (isWebView) {
        const unreadMessageCount = messages.filter(
          (message) => message.status === 'NEW'
        ).length;
        setMessagesMetaData({ unread: unreadMessageCount - 1 });
      }
    }
    window.scrollTo(0, 0);
  }

  getThreads({ messages, deletingMessages, currentMessage }) {
    const threads = getThreadsBL({
      messages,
      deletingMessages,
      currentMessage,
    });
    return map(threads, (thread, index) => {
      return (
        <SubordinatePanel key={index}>
          <MailMessage {...this.props} message={{ ...thread }} />
        </SubordinatePanel>
      );
    });
  }

  handleCloseSuccessModal() {
    this.props.popupState();
    this.props.history.push('/securemessages');
  }

  render() {
    const { messageDetail } = this.props.location.messageDetail
      ? this.props.location
      : this.props;

    const hasAttachment = getHasAttachment(messageDetail);

    const {
      readOnly,
      content,
      containerSize,
      noPadding,
      modalType,
    } = this.props;
    const messageStatus =
      messageDetail.status === NEW && readOnly !== true
        ? READ
        : messageDetail.status;

    const basePath = `${window.location.origin}${getParentPath(
      window.location.pathname,
      2
    )}`;
    const { messages, deletingMessages } = this.props;

    return (
      <div>
        <Container {...getPaddingProps(noPadding)} size={containerSize}>
          <Row {...getRowMarginProps(noPadding)}>
            <Card>
              <SectionHeading
                heading1={getTitle(messageDetail.status, content)}
              >
                {getTitle(messageDetail.status, content)}
              </SectionHeading>

              <MailMessage
                {...this.props}
                newMessageStatus={messageStatus}
                hasAttachment={hasAttachment}
                justBeenRead={this.state.justBeenRead}
                basePath={basePath}
              />
              {messageDetail.threadID !== null &&
                this.getThreads({
                  messages,
                  deletingMessages,
                  currentMessage: messageDetail,
                })}
            </Card>
          </Row>
        </Container>
        {modalType > 0 && (
          <SuccessModal
            onClick={this.handleCloseSuccessModal}
            bodyText={getSuccessModalMessage(modalType, content)}
            okText={content.ok}
          />
        )}
      </div>
    );
  }
}

function getHasAttachment(messageDetail) {
  return messageDetail.document && messageDetail.document.id !== undefined;
}

const ConnectedViewMessage = compose(
  connect(
    function mapStatToProps(state) {
      return {
        messageDetail: state.viewMessage.messageDetail,
        modalType: state.viewMessage.modalType,
        noReply: state.viewMessage.messageDetail.noReply,
        readOnly: MessageSelectors.getMode(state) === READ_ONLY,
        messages: MessageSelectors.getMessages(state),
        readingMessages: MessageSelectors.getReadingMessages(state),
        mode: MessageSelectors.getMode(state),
        deletingMessages: MessageSelectors.getDeletingMessages(state),
      };
    },
    {
      getDocumentByIdNative: documentActions.getDocumentByIdNative,
      setMessageRead,
      setViewMessageDetail,
      popupState,
    }
  ),
  withRouter,
  utils.withNativeBridge(window),
  withBreakpoints,
  withRetry
)(ViewMessage);

export { ConnectedViewMessage as ViewMessage };
