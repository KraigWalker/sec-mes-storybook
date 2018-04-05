import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchSecureMessages, getAccounts } from '../../actions/AppActions';
import SvgIcon from './GetIcon.js';
class ErrorPage extends React.Component {

    constructor(props) {
        super(props);
        this.handleBackButton = this.handleBackButton.bind(this);
    }
    handleBackButton = () => {
        window.top.postMessage('goBackToAccount', "*");
    }
    retry = () => {
        const { fetch, dispatch } = this.props;
        dispatch(getAccounts());
        !fetched && dispatch(fetchSecureMessages());
    }
    render() {
        const { messages, content } = this.props;
        return (messages.fetching ? <div className="page-loader"><SvgIcon id="icon-refresh" width="56px" height="56px" className="spinner-loader" /></div> : <div className="container">
            <div className="row">
                <div className="col-md1-18">
                    <p className="c-step-header__crumbs">
                        <a onClick={this.handleBackButton} className="c-step-header__link u-cursor-pointer">
                            <span className="c-step-header__linkicon"><SvgIcon id="icon-left" width="16px" height="16px" /></span>
                            <span className="c-step-header__linktext">{content.backToAccounts}</span>
                        </a>
                    </p>
                    <h1 className="c-step-header__title" id="headingTag" tabIndex="-1">{content.messages}</h1>
                    <h2>{content.sorryHeader}</h2><br />
                    <p>{content.tryAgain}</p><br />
                    <p>{content.getInTouch}</p>
                    <div className="c-btn--group">
                        <a className="c-btn c-btn--secondary" onClick={this.handleBackButton}>{content.back}</a>
                        <button name='Retry' className="c-btn c-btn--default" onClick={this.retry}>{content.retry}</button>
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