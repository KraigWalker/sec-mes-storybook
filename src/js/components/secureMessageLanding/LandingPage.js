import React from 'react';
import { Link } from 'react-router-dom';
import { fetchSecureMessages, getActiveTab } from '../../actions/AppActions';
import { connect } from 'react-redux';
import SecureMessageTabs from './SecureMessageTabs';
import StepHeader from '../common/StepHeader';
import {SecureMessageBL} from '../../bl/SecureMessageBL'
/**
 * @class Landing Page 
 * Landing Page of the application
*/

class LandingPage extends React.PureComponent {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        !this.props.messages.fetched && this.props.dispatch(fetchSecureMessages());
    }
    linkClick = (activeTab) => {
        this.props.dispatch(getActiveTab(activeTab));
    }
    mapMessages(messages){
        console.log(SecureMessageBL(messages));
        return SecureMessageBL(messages);
    }
    render() {
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md1-18">
                        <StepHeader showheaderCrumbs={false} headerTitle={this.props.headerDetails.title} headerSubtext={this.props.headerDetails.subtext}/>
                    </div>
                </div>
                <Link className="c-btn c-btn--default" to = {{ pathname : '/newsecuremessage' }}>New secure message</Link>
                <SecureMessageTabs location={this.props.location} onClick={this.linkClick}  messages={this.mapMessages(this.props.messages)} activeTab={this.props.activeTab}/>
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
        activeTab: state.messages.activeTab,
    }
};


export default connect(mapState)(LandingPage);