
import React from 'react';
import SecureMessageSummary from '../common/SecureMessageSummary';
import StepHeader from '../common/StepHeader';
import TextAreaComponent from '../common/TextAreaComponent';
import DropDownComponent from '../common/DropDownComponent'


class ReplySecureMessage extends React.Component {
    
    render() {
        const { backPath } = this.props.location;
        return (
            <div className="container">
            <div className="row">
                <div className="col-md1-18">
                    <StepHeader showheaderCrumbs={true} onClick={() => {}} headerCrumbsMessage="Back" headerTitle="Reply" headerCrumbsPath={{ pathname : backPath}}/>
                </div>
            </div>
            <div className="c-field">
                <label className="c-field__label c-field__label--block" htmlFor="subjects">
                    Subject
                </label>
                <div className="c-field__controls">
                    {/* TO DO */}
                    {/* <DropDownComponent subjects={this.props.subjects} selectSubject={this.selectSubject} name='subjects' id='subjects' /> */}
                </div>
            </div>

            <div className="c-field">
                <label className="c-field__label c-field__label--block" htmlFor="subjects">
                    Accounts
                </label>
                <div className="c-field__controls">
                    {/* TO DO */}
                    {/* <DropDownComponent accounts={this.props.accounts} selectSubject={this.selectSubject} name='accounts' id='accounts' /> */}
                </div>
            </div>

            <div className="c-field">
                <label className="c-field__label c-field__label--block" htmlFor="subjects">
                    Message
                </label>
                <div className="c-field__controls">
                    {/* TO DO */}
                    {/* <TextAreaComponent textData={this.textChange} /> */}
                </div>
            </div>
            </div>
        );
    }
};
export default ReplySecureMessage;