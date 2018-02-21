import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchSecureMessagesAgain, backButton } from '../../actions/AppActions';
class ErrorPage extends React.Component {

    constructor(props) {
        super(props);
        this.handleBackButton = this.handleBackButton.bind(this);
    }
    handleBackButton = () => {
        this.props.dispatch(backButton());
        this.props.history.push(this.props.messages.navRef);
    }
    retry = () => {
        this.props.dispatch(fetchSecureMessagesAgain());
    }
    render() {
        return (<div className="container">
            <div className="row">
                <div className="col-md1-18">
                    <h2>Messages</h2><br />
                    <h3>Sorry, there’s been a technical problem</h3><br />
                    <p>It looks like something has gone wrong in the background. Please try again.</p><br />
                    <p>If you’re still having problems, please get in touch.</p>
                    <div className="c-btn--group">
                    <a className="c-btn c-btn--secondary" onClick={this.handleBackButton}>Back</a>
                        <button name='Retry' className="c-btn c-btn--default" onClick={this.retry}>Retry</button>
                    </div>
                </div>
            </div>
        </div>);
    }
}
const mapState = (state) => {
    return {
        messages: state.messages,
    }
};
export default connect(mapState)(ErrorPage);