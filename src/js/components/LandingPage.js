import React from 'react';
import Inbox from './Inbox';
import { Link } from 'react-router-dom';
import { getSecureMessages } from '../actions/AppActions';
import { connect } from 'react-redux';

//for Textarea input
import autosize from 'autosize';

/**
 * @class Landing Page 
 * Landing Page of the application
*/

class LandingPage extends React.PureComponent {
    componentWillMount() {
        !this.props.messages.fetched && this.props.dispatch(getSecureMessages());
    }
    onChange() {
        autosize(document.getElementById('ta1'));
    }
    render() {
        return(
            <div>
                <div className="c-field">
                    <label className="c-field__label c-field__label--block" htmlFor="ta1">
                        Input Textarea
                    </label>
                    <div className="c-field__controls">
                        <textarea className="c-field__input c-field__input--txtarea" name="ta1" id="ta1" rows="10" cols="20" onChange={this.onChange}></textarea>
                    </div>
                </div>
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