import React from 'react';
import cx from 'classnames';
import MessageSubjectEntity from '../../entities/MessageSubjectEntity';
import { connect } from 'react-redux';
import { getMessageSubjects, getAccounts, sendMessageData } from '../../actions/AppActions';
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
        if (!this.props.messagesubjects.fetched && !this.props.messageaccounts.fetched) {
            this.props.dispatch(getMessageSubjects());
            this.props.dispatch(getAccounts());
        }
        if(this.props.isFromDraftOrReply) {
            this.props.selectSubject(this.props.selectedValue, this.props.id);
        }
    }
    returnMenuItem() {
        if (!this.props.isFromDraftOrReply && this.props.id === 'accounts') {
            let items = [];
            items.push(<li className="c-dropdown__value" key='No specific account' value='No specific account' onClick={this.setDropDrownValue}>No specific account</li>);
            _.map(this.props.accounts.accounts, (account) => {
                items.push(<li className="c-dropdown__value" key={account} value={account} onClick={this.setDropDrownValue}>{account}</li>
                );
            })
            return items;

        } if (!this.props.isFromDraftOrReply && this.props.id === 'subjects') {
            let items = [];
            _.map(this.props.subjects.subjects, (subject) => {
                items.push(<li className="c-dropdown__value" key={subject.key} value={subject.value} onClick={this.setDropDrownValue}>{subject.value}</li>);
            }, false);
            return items;
        }
        if (this.props.isFromDraftOrReply && this.props.id === 'accounts') {
            let items = [];
            items.push(<li className="c-dropdown__value" key='No specific account' value='No specific account' onClick={this.setDropDrownValue}>No specific account</li>);
            _.map(this.props.messageaccounts.accounts, (account) => {
                items.push(<li className="c-dropdown__value" key={account} value={account} onClick={this.setDropDrownValue}>{account}</li>
                );
            })
            return items;
        }
        if (this.props.isFromDraftOrReply && this.props.id === 'subjects') {
            let items = [];
            _.map(this.props.messagesubjects.subjects, (subject) => {
                items.push(<li className="c-dropdown__value" key={subject.key} value={subject.value} onClick={this.setDropDrownValue}>{subject.value}</li>
                );
            })
            return items;
        }
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
    setDropDrownValue(e) {
        this.setState({
            Text: e.target.textContent,
            list: false,
        });
        this.props.selectSubject(e.target.textContent, this.props.id);
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
            <div className="pattern-body">
                <div className="c-field">
                    <div className="c-field__controls pos-r">
                        <button className="c-field__input c-field__input--select text-left c-dropdown" onClick={this.showList}>{this.state.Text}</button>
                        {this.state.list ? <div ref="overlay" className={overlayClassName} onClick={this.overlayclick} ></div> : ''}
                        {this.state.list && <ul className="c-dropdown__list u-cursor-pointer" onBlur={this.onBlur}>{this.returnMenuItem()}</ul>}
                    </div>
                </div>

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