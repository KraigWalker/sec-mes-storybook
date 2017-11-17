import React from 'react';
import Inbox from './Inbox';
import { Link } from 'react-router-dom';
import { getSecureMessages } from '../actions/AppActions';
import { connect } from 'react-redux';
// import SecureMessageTabs from './SecureMessageTabs';

/**
 * @class Landing Page 
 * Landing Page of the application
*/

class LandingPage extends React.PureComponent {
    // constructor(props) {
    //     super(props);
    // }
    componentWillMount() {
        !this.props.messages.fetched && this.props.dispatch(getSecureMessages());
    }
    // linkClick (activeTab){
    //     console.log(activeTab);
    //     this.props.history.push({
    //         pathname: '/securemessages:'+activeTab,
    //         state: { messages: this.props.messages }
    //     })
    // }
    render() {
        // console.log(this.props)
        return(
            <div>
                <ul>
                    <li><Link to = {{ pathname : '/securemessages:inbox', state: this.props.messages }}>Show my messages</Link></li>
                </ul>
                {/* <SecureMessageTabs onClick={this.linkClick} messages={this.props.messages}/> */}
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