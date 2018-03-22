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
         this.props.dispatch(getMessageSubjects());
       //  this.props.dispatch(getAccounts());
        // }
        // if (this.props.isFromDraftOrReply) {
        //     this.props.selectSubject(this.props.selectedValue, this.props.id);
        // }
    }
    returnMenuItem() {
        let setDropDrownValue;
        let items = []; 
        let noSpecificAccount = "No specific account";
        switch (true) {
            case (!this.props.isFromDraftOrReply && this.props.id === 'accounts'):
                items.push(<li className="c-dropdown__value" id={noSpecificAccount} key={noSpecificAccount} value={noSpecificAccount} onClick={e => this.setDropDrownValue(e, {}, noSpecificAccount)}>No specific account</li>);
                _.map(this.props.accounts.accounts, (account) => {
                    let name = (account.display_name !== null)?account.display_name : account.name;
                    items.push(<li className="c-dropdown__value" id={account.name} key={account.id} value={account.name} onClick={e => this.setDropDrownValue(e, account, name)}><span className="c-dropdown__value__account">{name}</span><span className="c-dropdown__value__number">{'ending '+account.number.slice(-4)}</span></li>
                    );
                    // To display account name along with account number use the below pattern
                   // <li className="c-dropdown__value" key={account} value={account} onClick={this.setDropDrownValue}><span className="c-dropdown__value__account">{account.name}</span><span className="c-dropdown__value__number">1234</span></li>
                
                });
                break;
            case (!this.props.isFromDraftOrReply && this.props.id === 'subjects'):
                _.map(this.props.subjects.subjects, (subject) => {
                    items.push(<li className="c-dropdown__value" key={subject.key} id={subject.value} onClick={e => this.setDropDrownValue(e, subject, subject.value)}>{subject.value}</li>);
                }, false);
                break;
            case (this.props.isFromDraftOrReply && this.props.id === 'accounts'):
                items.push(<li className="c-dropdown__value" id={noSpecificAccount} key={noSpecificAccount} value={noSpecificAccount} onClick={e => this.setDropDrownValue(e, {}, noSpecificAccount)}>No specific account</li>);
                _.map(this.props.messageaccounts.accounts, (account) => {
                    let name = (account.display_name !== null)?account.display_name : account.name;
                    items.push(<li className="c-dropdown__value" id={account.name} key={account.id} value={account.name} onClick={e => this.setDropDrownValue(e, account, name)}><span span className="c-dropdown__value__account">{name}</span><span className="c-dropdown__value__number">{'ending '+account.number.slice(-4)}</span></li>
                    );
                 // To display account name along with account number use the below pattern
                   // <li className="c-dropdown__value" key={account} value={account} onClick={this.setDropDrownValue}><span className="c-dropdown__value__account">{account}</span><span className="c-dropdown__value__number">1234</span></li>
            
                })
                break;
            case (this.props.isFromDraftOrReply && this.props.id === 'subjects'):
                _.map(this.props.messagesubjects.subjects, (subject) => {
                    items.push(<li className="c-dropdown__value" key={subject.key} id={subject.value} onClick={e => this.setDropDrownValue(e, subject, subject.value)}>{subject.value}</li>
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
    setDropDrownValue(e, typeOfData, name) {
        this.setState({
            Text: name,
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
                {this.props.showAccountError ? <CalloutComponent dClass='callout callout__error callout__inline-error' paraText={this.props.content.accError} /> : ''}
                {this.props.showSubjectError ? <CalloutComponent dClass='callout callout__error callout__inline-error' paraText={this.props.content.subError} /> : ''}
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