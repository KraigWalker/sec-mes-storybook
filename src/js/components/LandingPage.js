import React from 'react';
import { getActiveTab } from '../actions/AppActions';
import { connect } from 'react-redux';
import { utils } from "document-management-web-ui";

import StringConstants from "../constants/StringsConstants";
import SecureMessageTabs from './SecureMessageTabs';
import { SecureMessageBL } from '../bl/SecureMessageBL'
import { Button } from 'web-ui-components/lib/atoms/buttons';
import { BackButton } from 'web-ui-components/lib/molecules/navigation';

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
        const { isWebView, readOnly } = this.props;
        if (this.props.messages.error && this.props.messages.fetched) {
            this.props.history.push('/errormessage');
        } else {
            return (
                <div>
                    <div>
                    { !isWebView && !readOnly &&
                        <p className="c-step-header__crumbs">
                            <BackButton onClick={this.handleBackClick} label={this.props.content.backToAccounts} />
                        </p>
                        }
                        <h1 className="c-step-header__title" id="headingTag" tabIndex="-1">{this.props.content.messages}</h1>
                        <p className="c-step-header__subtext">{this.props.content.landingPageMessage}</p>
                        <p className="c-step-header__subtext">{this.props.content.faqLink}</p>
                        {
                            !readOnly && <Button display="primary" onClick={() => this.props.history.push('/securemessages/new')}>
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
                    </div>
                </div>
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

export default connect(mapState)(utils.withNativeBridge(window.navigator.userAgent)(LandingPage));
