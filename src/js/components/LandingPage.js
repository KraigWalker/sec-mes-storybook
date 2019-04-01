import React from 'react';
import {getActiveTab} from '../actions/AppActions';
import {connect} from 'react-redux';
import {utils} from "document-management-web-ui";

import StringConstants from "../constants/StringsConstants";
import SecureMessageTabs from './SecureMessageTabs';
import {SecureMessageBL} from '../bl/SecureMessageBL'
import {Button} from 'web-ui-components/lib/atoms/buttons';
import {BackButton} from 'web-ui-components/lib/molecules/navigation';
import {Container, Row} from "web-ui-components/lib/global/layout";
import {Card} from "web-ui-components/lib/organisms/cards";
import { Title, TextBody } from "web-ui-components/lib/atoms/text";

/**
 * @class Landing Page
 * Landing Page of the application
 */

export class LandingPage extends React.PureComponent {
    componentDidMount() {
        window.top.postMessage('clearNewMessagePage', '*');
        window.scrollTo(0, 0);
    }

    linkClick = activeTab => {
        this.props.dispatch(getActiveTab(activeTab));
    }

    handleBackClick = () => {
        window.top.postMessage('goBackToAccount', '*');
    }

    mapMessages(messages) {
        return SecureMessageBL(messages);
    }

    checkError() {
        const {isWebView, readOnly} = this.props;
        if (this.props.messages.error && this.props.messages.fetched) {
            this.props.history.push('/errormessage');
        } else {
            return (
                <Container className="u-margin-top-6">
                    <Row>
                        <Card>
                            {!isWebView && !readOnly &&
                            <TextBody className="c-step-header__crumbs">
                                <BackButton onClick={this.handleBackClick} label={this.props.content.backToAccounts}/>
                            </TextBody>
                            }
                            <Title  size="h1">{this.props.content.messages}</Title>
                            <TextBody>{this.props.content.landingPageMessage}</TextBody>
                            <TextBody>{this.props.content.faqLink}</TextBody>
                            {
                                !readOnly && <Button display="secondary"
                                                     onClick={() => this.props.history.push('/securemessages/new')}>
                                    {this.props.content.newSecureMessage}
                                </Button>
                            }
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

    render() {
        return this.checkError();
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
});

export default connect(mapState)(utils.withNativeBridge(window)(LandingPage));
