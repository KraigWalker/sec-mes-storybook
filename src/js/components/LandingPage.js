import React from 'react';
import {connect} from 'react-redux';
import {utils} from "document-management-web-ui";
import StringConstants from "../constants/StringsConstants";
import SecureMessageTabs from './SecureMessageTabs';
import {SecureMessageBL} from '../bl/SecureMessageBL'
import {Button} from 'web-ui-components/lib/atoms/buttons';
import {BackButton} from 'web-ui-components/lib/molecules/navigation';
import {Container, Row} from "web-ui-components/lib/global/layout";
import {Card} from "web-ui-components/lib/organisms/cards";
import {Title, TextBody} from "web-ui-components/lib/atoms/text";
import {getMessageSubjects, getActiveTab, popupState} from '../actions/AppActions';
import {withBreakpoints} from "../components/common/hoc/WithBreakpoint";
import {compose} from 'redux';
import SuccessModal from "../components/common/SuccessModal";
import { getSuccessModalMessage } from "../constants/ModalConstants";

export class LandingPage extends React.PureComponent {
    componentDidMount() {
        window.top.postMessage('clearNewMessagePage', '*');
        window.scrollTo(0, 0);
        //Read message subjects once page has loaded to avoid issues with UX when using Select web-ui-component
        this.props.getMessageSubjects();
    }

    componentDidUpdate() {
        if (this.props.messages.error && this.props.messages.fetched) {
            this.props.history.push({pathname: '/securemessages/error', content: this.props.content});
        }
    }

    linkClick = activeTab => {
        this.props.getActiveTab(activeTab);
    }

    handleBackClick = () => {
        window.top.postMessage('goBackToAccount', '*');
    }

    mapMessages(messages) {
        return SecureMessageBL(messages);
    }

    render() {
        const {isWebView, readOnly, noPadding, containerSize} = this.props;
        const showBackLink = (!(readOnly || isWebView));
        let paddingProps = null;
        if (noPadding) {
            paddingProps = {
                className: "u-padding-0",
            }
        }
        return (
            <Container {...paddingProps} size={containerSize}>
                <Row>
                    <Card>
                        {showBackLink && <TextBody className="c-step-header__crumbs">
                            <BackButton onClick={this.handleBackClick} label={this.props.content.backToAccounts}/>
                        </TextBody>
                        }
                        <Title size="h4">{this.props.content.messages}</Title>
                        <TextBody>{this.props.content.landingPageMessage}</TextBody>
                        {
                            !readOnly && <Button display="primary"
                                                 onClick={() => this.props.history.push('/securemessages/new')}>
                                {this.props.content.newSecureMessage}
                            </Button>
                        }
                        {this.props.modalType > 0 && <SuccessModal
                            onClick={this.props.popupState}
                            bodyText={getSuccessModalMessage(this.props.modalType, this.props.content)}
                            okText={this.props.content.ok}
                        />}
                        <SecureMessageTabs
                            location={this.props.location}
                            onClick={this.linkClick}
                            messages={this.mapMessages(this.props.messages)}
                            activeTab={this.props.activeTab}
                            content={this.props.content}
                        />
                    </Card>
                </Row>
            </Container>
        );
    }
}

/**
 * Maps the state of the component to the state of the redux store
 * @param {object} state. State of the application
 */

const mapState = state => ({
    readOnly: state.messages.mode === StringConstants.READ_ONLY,
    messages: state.messages,
    accounts: state.accounts,
    activeTab: state.messages.activeTab,
    modalType: state.viewMessage.modalType,
});

const mapDispatchToProps = {
    getMessageSubjects,
    getActiveTab,
    popupState,
};

export default compose(
    connect(mapState, mapDispatchToProps),
    utils.withNativeBridge(window),
    withBreakpoints
)(LandingPage);
