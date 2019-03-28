import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { getMessageSubjects, popupState } from '../../actions/AppActions';
import { Select } from 'web-ui-components/lib/atoms/forms';
import { ConfirmationModal} from 'web-ui-components/lib/organisms/modals';
import { ValidationMessage } from 'web-ui-components/lib/molecules/forms';

//DEBT: refactor the business logic out of this component. It does not belong here.
//The values to render should be passed not determined based on a string
export class DropDownComponent extends React.Component {
	constructor(props) {
		super(props);
		this.showList = this.showList.bind(this);
		this.errorCloseClicked = this.errorCloseClicked.bind(this);
		this.retryServiceCall = this.retryServiceCall.bind(this);
		this.getOptions = this.getOptions.bind(this);
		this.onChange = this.onChange.bind(this);

		this.state = {
			showErrorModal: false,
		};
	}
	componentWillMount() {
		//TODO: doing this here breaks the web ui component as defaultValue is set only on first render...
		this.props.dispatch(getMessageSubjects());
	}
	componentDidMount() {
		this.props.dispatch(popupState());
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
		const bodyContent = (
			<div>
			<h3>{content.sorryHeader}</h3>
			<br />
			<p>{content.tryAgain}</p>
			<br />
			<p>{content.getInTouch}</p>
			</div>
		);
		return  <ConfirmationModal
			title={bodyContent} 
			onConfirm={this.retryServiceCall} 
			isOpen={true} 
			onClose={this.errorCloseClicked}
			dismissButtonText={content.back}
			confirmButtonText={content.retry}
		/>;
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

	getOptions() {
		const { isFromDraftOrReply, id, accounts, subjects, messageaccounts, messagesubjects } = this.props;
		const { noSpecificAccount } = this.props.content;
		const items = [];
		switch (true) {
			case (!isFromDraftOrReply && id === 'accounts'):
				items.push({value: noSpecificAccount, label: noSpecificAccount});
				_.map(accounts.accounts, account => {
					const name = (account.display_name !== null) ? account.display_name : account.name;
					items.push({value: account.number,  label: `${name} (ending ${account.number.slice(-4)})`})}
					)
				break;
			case (!isFromDraftOrReply && id === 'subjects'):
				_.map(subjects.subjects, subject => {
					items.push({value: subject.value,  label: subject.value});
				}, false);
				break;
			case (isFromDraftOrReply && id === 'accounts'):
				items.push({value: noSpecificAccount, label: noSpecificAccount});
				_.map(messageaccounts.accounts, account => {
					const name = (account.display_name !== null) ? account.display_name : account.name;
					items.push({value: account.number,  label: `${name} (ending ${account.number.slice(-4)})`})}
					)
				break;
			case (isFromDraftOrReply && id === 'subjects'):
				_.map(messagesubjects.subjects, subject => {
					items.push({value: subject.value,  label: subject.value});
				}, false);
				break;
			default:
		}
		return items;
	}

	onChange (id, value)
	{
		const { isFromDraftOrReply, accounts, messageaccounts} = this.props;
		let outValue;
		switch(id)
		{
			case "subjects": 
				outValue = value;
				break;
			case "accounts":
				if (!isFromDraftOrReply)
				{
					outValue = _.find(accounts.accounts, account => account.number === value);
				}
				else {
					outValue = _.find(messageaccounts.accounts, account => account.number === value);
				}
				break;
			default:
				break;
		}
		this.props.selectSubject(id, outValue);
	}

	render() {

		const { ddId, accessID, showAccountError, showSubjectError, messagesubjects, content } = this.props;
		const { showErrorModal} = this.state;
		const options = this.getOptions();
	
		return (
			<div>
				<div>
					<Select defaultValue={this.props.selectedValue}
					id={ddId} 
					options={options}
					onChange={(e) => this.onChange(this.props.id, e.target.value)}  /> 

				</div>
				{showAccountError ? <ValidationMessage value={content.accError} /> : ''}
				{showSubjectError ? <ValidationMessage value={content.subError} /> : ''}
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
