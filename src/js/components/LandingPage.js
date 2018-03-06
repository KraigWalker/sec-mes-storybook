import React from 'react';
import { Link } from 'react-router-dom';
import { getActiveTab } from '../actions/AppActions';
import { connect } from 'react-redux';
import SecureMessageTabs from './SecureMessageTabs';
import StepHeader from './common/StepHeader';
import { SecureMessageBL } from '../bl/SecureMessageBL'
import GetIcon from './common/GetIcon';
import ErrorPage from './common/ErrorPage';

/**
 * @class Landing Page 
 * Landing Page of the application
*/

class LandingPage extends React.PureComponent {
    linkClick = (activeTab) => {
        this.props.dispatch(getActiveTab(activeTab));
    }
    mapMessages(messages) {
        return SecureMessageBL(messages);
    }
    checkError() {
        if (this.props.messages.error && this.props.messages.fetched) {
            this.props.history.push("/errormessage");
        } else {
            return (<div>
                <div className="row">
                    <div className="col-md1-18">
                        <StepHeader showheaderCrumbs={false} headerTitle={this.props.content.landingPageTitle} headerSubtext={this.props.content.landingPageMessage} />
                    </div>
                </div> <Link className="c-btn c-btn--default u-margin-bottom-c new-message-btn" to={{ pathname: `${window.baseURl}/newsecuremessage` }}>
                    <GetIcon id="icon-pencil" width="16px" height="16px" />New secure message
         </Link>
                <SecureMessageTabs location={this.props.location} onClick={this.linkClick} messages={this.mapMessages(this.props.messages)} activeTab={this.props.activeTab} />
            </div>)
        }
    }
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md1-18">
                        <StepHeader showheaderCrumbs={true} onClick={() => { }} headerCrumbsMessage="Back" headerTitle="New message" headerCrumbsPath={{ pathname: `${window.baseURl}/securemessage` }} />
                    </div>
                </div>
                {this.checkError()}
            </div>
        );
    }
}
/**
 * Maps the state of the component to the state of the redux store
 * @param {object} state. State of the application
 */

const mapState = (state) => {
    return {
        messages: state.messages,
        accounts: state.accounts,
        activeTab: state.messages.activeTab,
    }
};


export default connect(mapState)(LandingPage);