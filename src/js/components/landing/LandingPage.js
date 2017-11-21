import React from 'react';
import { Link } from 'react-router-dom';
import { getSecureMessages, getActiveTab } from '../../actions/AppActions';
import { connect } from 'react-redux';
import SecureMessageTabs from './SecureMessageTabs';
import StepHeader from '../common/StepHeader';
/**
 * @class Landing Page 
 * Landing Page of the application
*/

class LandingPage extends React.PureComponent {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        !this.props.messages.fetched && this.props.dispatch(getSecureMessages());
    }
    linkClick = (activeTab) => {
        this.props.dispatch(getActiveTab(activeTab));
    }
    render() {
        return(
            <div>
                <StepHeader showheaderCrumbs={false} onClick={() => {}} headerCrumbsMessage="" headerTitle={this.props.headerDetails.title} headerSubtext={this.props.headerDetails.subtext}/>
                <Link to = {{ pathname : '/newsecuremessage' }}><input type = 'button' name = 'New secure message' value = 'New secure message'/></Link>
                <SecureMessageTabs location={this.props.location} onClick={this.linkClick}  messages={this.props.messages} activeTab={this.props.activeTab}/>
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
    }
};


export default connect(mapState)(LandingPage);