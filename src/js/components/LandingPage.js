import React from 'react';
import Inbox from './Inbox';
import { Link } from 'react-router-dom';
import { getSecureMessages } from '../actions/AppActions';
import { connect } from 'react-redux';

/**
 * @class Landing Page 
 * Landing Page of the application
*/

class LandingPage extends React.PureComponent {
    componentWillMount() {
        !this.props.messages.fetched && this.props.dispatch(getSecureMessages());
    }
    render() {
        return(
            <div>
                <ul>
                    <li><Link to = {{ pathname : '/securemessages:inbox', state: this.props.messages }}>Show my messages</Link></li>
                </ul>
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