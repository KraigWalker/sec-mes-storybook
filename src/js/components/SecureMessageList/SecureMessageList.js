import React from 'react';
import SecureMessageSummary from '../common/SecureMessageSummary';
import { sendMessageForAccessibiltiy as sendMessageForAccessibility } from '../../actions/AppActions';
import { connect } from 'react-redux';
import { SENT, DRAFT, ARCHIVED } from '../../constants/StringsConstants';
import { Button } from 'web-ui-components/lib/atoms/buttons';
import { Column } from 'web-ui-components/lib/global/layout';
import { TextBody } from 'web-ui-components/lib/atoms/text';
import { LoadingLocalTakeover } from 'web-ui-components/lib/organisms/takeovers';
import { TextStyled } from 'web-ui-components/lib/atoms/text';
import { Mail } from 'web-ui-components/lib/communication/messaging';
import { withBreakpoints } from '../common/hoc/WithBreakpoint';
import { compose } from 'redux';
import { MessageSelectors } from '../../reducers';
import { LIMITS, shouldShowThatsAllMessage, getNextLimit } from './limits';

export class SecureMessageList extends React.Component {
  constructor(props) {
    super(props);
    this.showMoreClicked = this.showMoreClicked.bind(this);
    this.sendAccessibilityMessage = this.sendAccessibilityMessage.bind(this);
    this.state = {
      currentMessageLimit: LIMITS[0],
      showThatsAllMessage: false,
    };
  }

  componentWillReceiveProps(props) {
    const { messages } = props;
    this.setState({
      showThatsAllMessage: shouldShowThatsAllMessage({
        currentLimit: this.state.currentMessageLimit,
        messageCount: messages.length,
      }),
    });
  }

  componentDidMount() {
    const { messages } = this.props;
    if (messages.length === 0) {
      this.sendAccessibilityMessage();
    }
  }

  showMessages() {
    const { messages, content } = this.props;
    const listFlag = true;
    return messages.slice(0, this.state.currentMessageLimit).map((message, index) => <SecureMessageSummary key={index} message={message} listFlag={listFlag} content={content} />);
  }

  showMoreClicked() {
    const { messages, dispatch, activeTab } = this.props;
    dispatch(sendMessageForAccessibility(`Next 20 messages loaded ${activeTab}`));
    this.setState(prevState => {
      const newLimit = getNextLimit({
        currentLimit: prevState.currentMessageLimit,
        messageCount: messages.length,
      });
      return {
        currentMessageLimit: newLimit,
        showThatsAllMessage: shouldShowThatsAllMessage({
          currentLimit: newLimit,
          messageCount: messages.length,
        }),
      };
    });
  }

  renderThatsAllText() {
    const { content, activeTab } = this.props;
    let thatsallText = content.thatsallTextInbox;
    if (activeTab === SENT) {
      thatsallText = content.thatsallTextSend;
    } else if (activeTab === ARCHIVED) {
      thatsallText = content.thatsallTextArchived;
    } else if (activeTab === DRAFT) {
      thatsallText = content.thatsallTextDraft;
    }
    return (
      <TextStyled size="uist" className="u-padding-top-2">
        {thatsallText}
      </TextStyled>
    );
  }

  renderNoMessagesText(isLoading) {
    const { content } = this.props;
    return <Mail.Empty className="u-padding-left-1">{isLoading ? 'loading' : content.noMessages}</Mail.Empty>;
  }

  sendAccessibilityMessage() {
    const { activeTab, dispatch, content } = this.props;
    switch (activeTab) {
      case SENT:
        dispatch(sendMessageForAccessibility(content.noSentMessages));
        break;
      case DRAFT:
        dispatch(sendMessageForAccessibility(content.noDraftMessages));
        break;
      case ARCHIVED:
        dispatch(sendMessageForAccessibility(content.noArchivedMessages));
        break;
      default:
        dispatch(sendMessageForAccessibility(content.noInboxMessages));
        break;
    }
  }

  render() {
    const { messagesFetching, messages, content, noPadding } = this.props;

    let paddingProps = null;
    if (noPadding) {
      paddingProps = {
        className: 'u-padding-left-1',
      };
    }

    return (
      <Column xs={24} {...paddingProps}>
        <LoadingLocalTakeover xs={24} show={messagesFetching} title="loading..">
          <TextBody>
            {messages.length === 0 ? this.renderNoMessagesText(messagesFetching) : this.showMessages()}
            {this.state.currentMessageLimit < messages.length && (
              <Button className="u-margin-top-2" display="primary" onClick={this.showMoreClicked}>
                {content.showMore}
              </Button>
            )}
            {this.state.showThatsAllMessage && this.renderThatsAllText()}
          </TextBody>
        </LoadingLocalTakeover>
      </Column>
    );
  }
}

// export default SecureMessageList;
/**
 * Maps the state of the component to the state of the redux store
 * @param {object} state. State of the application
 */
const mapState = state => ({
  messagesubjects: state.subjects,
  messageaccounts: state.accounts,
  messagesFetching: MessageSelectors.getFetching(state),
});

export default compose(
  connect(mapState),
  withBreakpoints
)(SecureMessageList);
