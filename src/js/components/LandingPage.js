import React from 'react';
import { Link } from 'react-router-dom';
import { getActiveTab } from '../actions/AppActions';
import { connect } from 'react-redux';
import { utils } from "document-management-web-ui";

import SecureMessageTabs from './SecureMessageTabs';
import StepHeader from './common/StepHeader';
import { SecureMessageBL } from '../bl/SecureMessageBL'
import GetIcon from './common/GetIcon';
import ErrorPage from './common/ErrorPage';
import SvgIcon from './common/GetIcon.js';
const Fingerprint = require('fingerprintjs2');

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
        const { isWebView } = this.props;
        if (this.props.messages.error && this.props.messages.fetched) {
            this.props.history.push('/errormessage');
        } else {
            return (
                <div className="row centralised-container">
                    <div className="col-md1-24 col-sm1-24 col-lg1-24">
                    { !isWebView &&
                        <p className="c-step-header__crumbs">
                            <a onClick={this.handleBackClick} className="c-step-header__link u-cursor-pointer">
                                <span className="c-step-header__linkicon"><SvgIcon id="icon-left" width="16px" height="16px" /></span>
                                <span className="c-step-header__linktext">{this.props.content.backToAccounts}</span>
                            </a>
                        </p>
                        }
                        <h1 className="c-step-header__title" id="headingTag" tabIndex="-1">{this.props.content.messages}</h1>
                        <p className="c-step-header__subtext">{this.props.content.landingPageMessage}</p>
                        <p className="c-step-header__subtext">{this.props.content.faqLink}</p>
                        <Link className="c-btn c-btn--default u-margin-bottom-c new-message-btn" to={{ pathname: `${window.baseURl}/securemessages/new` }}>
                            <GetIcon id="icon-pencil" width="16px" height="16px" />{this.props.content.newSecureMessage}
                        </Link>
                        <SecureMessageTabs location={this.props.location} onClick={this.linkClick} messages={this.mapMessages(this.props.messages)} activeTab={this.props.activeTab} content={this.props.content} />
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
    messages: state.messages,
    accounts: state.accounts,
    activeTab: state.messages.activeTab,
});

console.log(utils, utils.withNativeBridge(window.navigator.userAgent)(LandingPage))

export default connect(mapState)(utils.withNativeBridge(window.navigator.userAgent)(LandingPage));
