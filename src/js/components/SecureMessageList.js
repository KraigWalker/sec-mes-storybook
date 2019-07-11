import React from "react";
import SecureMessageSummary from "./common/SecureMessageSummary";
import {sendMessageForAccessibiltiy as sendMessageForAccessibility} from "../actions/AppActions";
import {connect} from "react-redux";
import {SENT, DRAFT, ARCHIVED} from '../constants/StringsConstants';
import {Button} from 'web-ui-components/lib/atoms/buttons';
import {Column} from "web-ui-components/lib/global/layout";
import {TextBody} from "web-ui-components/lib/atoms/text";
import {LoadingLocalTakeover} from 'web-ui-components/lib/organisms/takeovers';
import {TextStyled} from 'web-ui-components/lib/atoms/text';
import {Mail} from "web-ui-components/lib/communication/messaging";
import {withBreakpoints} from "../components/common/hoc/WithBreakpoint";
import {compose} from "redux";

const MESSAGE_LIMIT = 20;

export class SecureMessageList extends React.Component {
    constructor(props) {
        super(props);
        this.showMoreClicked = this.showMoreClicked.bind(this);
        this.sendAccessibilityMessage = this.sendAccessibilityMessage.bind(this);
        this.state = {
            showMoreLimit: MESSAGE_LIMIT,
            showThatsAllMessage: false,
        };
    }

    componentWillReceiveProps(props) {
        const {messages} = props;
        if (messages.length === 0 || messages.length > MESSAGE_LIMIT) {
            this.setState({showThatsAllMessage: false});
        } else {
            this.setState({showThatsAllMessage: true});
        }
    }

    componentDidMount() {
        const {messages} = this.props;
        if (messages.length === 0) {
            this.sendAccessibilityMessage()
        }
    }

    showMessages() {
        const {messages, content} = this.props;
        const listFlag = true;
        return messages
            .slice(0, this.state.showMoreLimit)
            .map((message, index) => <SecureMessageSummary key={index}
                                                           message={message} listFlag={listFlag} content={content}/>);
    }

    showMoreClicked() {
        const {messages, dispatch, activeTab} = this.props;
        dispatch(sendMessageForAccessibility(`Next 20 messages loaded ${activeTab}`));
        let limit = messages.length;
        this.setState({
            showMoreLimit: limit,
            showThatsAllMessage: true,
        });
    }

    renderThatsAllText() {
        const {content, activeTab} = this.props;
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
        const {content} = this.props;
        return (

            <Mail.Empty className="u-padding-left-1">
                {isLoading ? "loading" : content.noMessages}
            </Mail.Empty>

        );
    }

    sendAccessibilityMessage() {

        const {activeTab, dispatch, content} = this.props;
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
        const {messagesFetched, messages, content, noPadding} = this.props;

        let paddingProps = null;
        if (noPadding) {
            paddingProps = {
                className: "u-padding-left-1",
            }
        }

        return (
            <Column xs={24} {...paddingProps}>

                <LoadingLocalTakeover xs={24}
                                      show={messagesFetched.fetching}
                                      title="loading..">
                    <TextBody>
                        {messages.length === 0
                            ? this.renderNoMessagesText(messagesFetched.fetching)
                            : this.showMessages()}
                        {this.state.showMoreLimit < messages.length
                        && <Button display="primary" onClick={this.showMoreClicked}>{content.showMore}</Button>}
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
    messagesFetched: state.messages,
});

export default compose(
    connect(
        mapState
    ),
    withBreakpoints
)(SecureMessageList);


