import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import MessageSubjectEntity from '../../entities/MessageSubjectEntity';
import { connect } from 'react-redux';
import { getMessageSubjects, getAccounts, sendMessageData } from '../../actions/AppActions';
import CalloutComponent from './CalloutComponent';
class DropDownComponent extends React.Component {
    constructor(props) {
        super(props);
        this.returnMenuItem = this.returnMenuItem.bind(this);
        this.overlayclick = this.overlayclick.bind(this);
        this.showList = this.showList.bind(this);
        this.setDropDrownValue = this.setDropDrownValue.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.state = {
            list: false,
            Text: this.props.selectedValue,
            isDropDownDisabled: false,
        }
    };
    componentWillMount() {
        //Will remove after service call testing of accounts
        // if (!this.props.messagesubjects.fetched && !this.props.messageaccounts.fetched) {
        // this.props.dispatch(getMessageSubjects());
        // this.props.dispatch(getAccounts());
        // }
        // if (this.props.isFromDraftOrReply) {
        //     this.props.selectSubject(this.props.selectedValue, this.props.id);
        // }
    }
    returnMenuItem() {
        let setDropDrownValue;
        let items = [];
        switch (true) {
            case (!this.props.isFromDraftOrReply && this.props.id === 'accounts'):
                items.push(<li className="c-dropdown__value" id="No specific account" key='No specific account' value='No specific account' onClick={e => this.setDropDrownValue(e, 'accounts')}>No specific account</li>);
                _.map(this.props.accounts.accounts, (account) => {
                    items.push(<li className="c-dropdown__value" id={account.name} key={account.name} value={account.name} onClick={e => this.setDropDrownValue(e, account)}>{account.name}</li>
                    );
                                   /* To display account name along with account number use the below pattern
                    <li className="c-dropdown__value" key={account} value={account} onClick={this.setDropDrownValue}><span className="c-dropdown__value__account">{account}</span><span className="c-dropdown__value__number">1234</span></li>
                */
                });
                break;
            case (!this.props.isFromDraftOrReply && this.props.id === 'subjects'):
                _.map(this.props.subjects.subjects, (subject) => {
                    items.push(<li className="c-dropdown__value" key={subject.key} id={subject.value} onClick={e => this.setDropDrownValue(e, subject)}>{subject.value}</li>);
                }, false);
                break;
            case (this.props.isFromDraftOrReply && this.props.id === 'accounts'):
                items.push(<li className="c-dropdown__value" id="No specific account" key='No specific account' value='No specific account' onClick={e => this.setDropDrownValue(e, 'accounts')}>No specific account</li>);
                _.map(this.props.messageaccounts.accounts, (account) => {
                    items.push(<li className="c-dropdown__value" id={account.name} key={account.name} value={account.name} onClick={e => this.setDropDrownValue(e, account)}>{account.name}</li>
                    );
                               /* To display account name along with account number use the below pattern
                    <li className="c-dropdown__value" key={account} value={account} onClick={this.setDropDrownValue}><span className="c-dropdown__value__account">{account}</span><span className="c-dropdown__value__number">1234</span></li>
                */
                })
                break;
            case (this.props.isFromDraftOrReply && this.props.id === 'subjects'):
                _.map(this.props.messagesubjects.subjects, (subject) => {
                    items.push(<li className="c-dropdown__value" key={subject.key} id={subject.value} onClick={e => this.setDropDrownValue(e, subject)}>{subject.value}</li>
                    );
                })
                break;
        }
        return items;
    }
    overlayclick() {
        this.setState({
            list: false,
        });

    }
    showList() {
        if (this.state.list === false) {
            this.setState({ list: true });
        }
        else {
            this.setState({ list: false });
        }
    }
    setDropDrownValue(e, typeOfData) {
        this.setState({
            Text: e.target.textContent,
            list: false,
        });
        this.props.selectSubject(e.target.textContent, this.props.id, typeOfData);

    }
    onBlur() {
        this.setState({
            list: false,
        });
    }
    render() {
        const overlayClassName = cx({
            'c-overlay overlay__custom--zindex': true,
            'overlay__show': this.state.list,

        });
        return (
            <div>
                <div>
                    <button id="ddlText" aria-label={`${this.props.accessID} ${this.state.Text}`} className="c-field__input c-field__input--select c-dropdown u-cursor-pointer" onClick={this.showList}>{this.state.Text}</button>
                    {this.state.list && <div ref="overlay" className={overlayClassName} onClick={this.overlayclick} ></div>}
                    {this.state.list && <ul className="c-dropdown__list u-cursor-pointer" onBlur={this.onBlur}>{this.returnMenuItem()}</ul>}
                </div>
                {this.props.showAccountError ? <CalloutComponent dClass='callout callout__error callout__inline-error' paraText='Please select a subject for your message' /> : ''}
                {this.props.showSubjectError ? <CalloutComponent dClass='callout callout__error callout__inline-error' paraText='Pleae select an option for which account your enquiry relates to. If it’s a general enquiry, choose `General enquiry`' /> : ''}
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
        messagesubjects: state.subjects,
        messageaccounts: state.accounts,
    }
};

export default connect(mapState)(DropDownComponent);