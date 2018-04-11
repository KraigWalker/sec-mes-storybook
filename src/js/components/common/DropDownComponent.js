import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { getMessageSubjects, popupState } from '../../actions/AppActions';
import CalloutComponent from './CalloutComponent';
import ModalComponent from './ModalComponent';

class DropDownComponent extends React.Component {
	constructor(props) {
		super(props);
		this.returnMenuItem = this.returnMenuItem.bind(this);
		this.overlayclick = this.overlayclick.bind(this);
		this.showList = this.showList.bind(this);
		this.setDropDrownValue = this.setDropDrownValue.bind(this);
		this.onBlur = this.onBlur.bind(this);
		this.errorCloseClicked = this.errorCloseClicked.bind(this);
		this.retryServiceCall = this.retryServiceCall.bind(this);
		this.state = {
			list: false,
			showErrorModal: false,
			btnText: this.props.selectedValue,
		};
	}
	componentWillMount() {
		this.props.dispatch(getMessageSubjects());
	}
	componentDidMount() {
		this.props.dispatch(popupState());
	}
	onBlur() {
		this.setState({
			list: false,
		});
	}
	setDropDrownValue(e, typeOfData, name) {
		this.setState({
			btnText: name,
			list: false,
		});
		this.props.selectSubject(e.target.textContent, this.props.id, typeOfData);
	}
	errorCloseClicked() {
		this.setState({ showErrorModal: false });
	}
	retryServiceCall() {
		this.props.dispatch(popupState());
		this.showList();
	}
	returnErrorModal() {
		const { content } = this.props;
		const bodyContent = (<div><h3>{content.sorryHeader}</h3><br />
			<p>{content.tryAgain}</p><br />
			<p>{content.getInTouch}</p>
		</div>);
		const footerButtons = (<div><button type="button" className="c-btn c-btn--secondary c-modal__button" onClick={this.errorCloseClicked}>{content.back}</button>
			<button type="button" onClick={this.retryServiceCall} className="c-btn c-btn--default c-modal__button">{content.retry}</button>
		</div>);
		return (
			<ModalComponent
				show
				onHide={this.errorCloseClicked}
				customClass="c-modal c-modal--center"
				bsSize="medium"
				modalheading=""
				modalbody={bodyContent}
				modalfooter={footerButtons}
				modalInContainer={false}
				closeButton
			/>
		);
	}
	showList() {
		const { messagesubjects, dispatch } = this.props;
		if (messagesubjects.error) {
			dispatch(getMessageSubjects());
			this.setState({ showErrorModal: true });
		}
		if (this.state.list === false) {
			this.setState({ list: true });
		} else {
			this.setState({ list: false });
		}
	}
	overlayclick() {
		this.setState({
			list: false,
		});
	}
	returnMenuItem() {
		const { content, isFromDraftOrReply, id, accounts, subjects, messageaccounts, messagesubjects } = this.props;
		const items = [];
		const noSpecificAccount = 'No specific account';
		switch (true) {
			case (!isFromDraftOrReply && id === 'accounts'):
				items.push(<li className="c-dropdown__value" id={noSpecificAccount} key={noSpecificAccount} value={noSpecificAccount} onClick={e => this.setDropDrownValue(e, {}, noSpecificAccount)}>{content.noSpecificAccount}</li>);
				_.map(accounts.accounts, account => {
					const name = (account.display_name !== null) ? account.display_name : account.name;
					items.push(<li className="c-dropdown__value" id={account.name} key={account.id} value={account.name} onClick={e => this.setDropDrownValue(e, account, name)}><span className="c-dropdown__value__account">{name}</span><span className="c-dropdown__value__number">{`ending ${account.number.slice(-4)}`}</span></li>
					);
				});
				break;
			case (!isFromDraftOrReply && id === 'subjects'):
				_.map(subjects.subjects, subject => {
					items.push(<li className="c-dropdown__value" key={subject.key} id={subject.value} onClick={e => this.setDropDrownValue(e, subject, subject.value)}>{subject.value}</li>);
				}, false);
				break;
			case (isFromDraftOrReply && id === 'accounts'):
				items.push(<li className="c-dropdown__value" id={noSpecificAccount} key={noSpecificAccount} value={noSpecificAccount} onClick={e => this.setDropDrownValue(e, {}, noSpecificAccount)}>{content.noSpecificAccount}</li>);
				_.map(messageaccounts.accounts, account => {
					const name = (account.display_name !== null) ? account.display_name : account.name;
					items.push(<li className="c-dropdown__value" id={account.name} key={account.id} value={account.name} onClick={e => this.setDropDrownValue(e, account, name)}><span span className="c-dropdown__value__account">{name}</span><span className="c-dropdown__value__number">{`ending ${account.number.slice(-4)}`}</span></li>
					);
				});
				break;
			case (isFromDraftOrReply && id === 'subjects'):
				_.map(messagesubjects.subjects, subject => {
					items.push(<li className="c-dropdown__value" key={subject.key} id={subject.value} onClick={e => this.setDropDrownValue(e, subject, subject.value)}>{subject.value}</li>
					);
				});
				break;
			default:
		}
		return items;
	}
	render() {
		const { ddId, accessID, showAccountError, showSubjectError, messagesubjects, content } = this.props;
		const { btnText, list } = this.state;
		const overlayClassName = cx({
			'c-overlay overlay__custom--zindex': true,
			overlay__show: list,
		});
		return (
			<div>
				<div>
					<button id={ddId} aria-label={`${accessID} ${btnText}`} className="c-field__input c-field__input--select c-dropdown u-cursor-pointer" onClick={this.showList}>{btnText}</button>
					{list && <div ref="overlay" className={overlayClassName} onClick={this.overlayclick} />}
					{list && <ul className="c-dropdown__list u-cursor-pointer" onBlur={this.onBlur}>{this.returnMenuItem()}</ul>}
				</div>
				{showAccountError ? <CalloutComponent dClass="callout callout__error callout__inline-error" paraText={content.accError} /> : ''}
				{showSubjectError ? <CalloutComponent dClass="callout callout__error callout__inline-error" paraText={content.subError} /> : ''}
				{messagesubjects.error && showErrorModal && accessID === 'Subject' ? this.returnErrorModal() : ''}
			</div>
		);
	}
}

/**
 * Maps the state of the component to the state of the redux store
 * @param {object} state. State of the application
 */
const mapState = state => ({
	messagesubjects: state.subjects,
	messageaccounts: state.accounts,
});

export default connect(mapState)(DropDownComponent);
