import { Component } from 'react';
import { connect } from 'react-redux';
import { map } from 'lodash-es';
import { Select } from 'web-ui-components/lib/atoms/forms';
import { ValidationMessage } from 'web-ui-components/lib/molecules/forms';
import { StandardBody } from 'web-ui-components/lib/typography/body';
import { Column } from 'web-ui-components/lib/global/layout';
import { getMessageSubjects, popupState } from '../../actions/AppActions';
import ErrorModal from './ErrorModal';

//DEBT: refactor the business logic out of this component. It does not belong here.
//The values to render should be passed not determined based on a string...
export class DropDownComponent extends Component {
  constructor(props) {
    super(props);
    this.showList = this.showList.bind(this);
    this.errorCloseClicked = this.errorCloseClicked.bind(this);
    this.retryServiceCall = this.retryServiceCall.bind(this);
    this.getOptions = this.getOptions.bind(this);

    this.state = {
      showErrorModal: false,
    };
  }
  componentDidMount() {
    if (this.props.subjectErrors) {
      this.setState({ showErrorModal: true });
    }
  }

  errorCloseClicked() {
    this.setState({ showErrorModal: false });
  }
  retryServiceCall() {
    this.props.popupState();
    this.showList();
  }

  returnErrorModal() {
    const { content } = this.props;
    return (
      <ErrorModal
        content={content}
        onCloseClicked={this.errorCloseClicked}
        onRetry={this.retryServiceCall}
      />
    );
  }

  showList() {
    const { subjectErrors } = this.props;
    if (subjectErrors) {
      this.props.getMessageSubjects();
      this.setState({ showErrorModal: true });
    }
    if (this.state.list === false) {
      this.setState({ list: true });
    } else {
      this.setState({ list: false });
    }
  }

  getOptions() {
    const { id, accounts, subjects } = this.props;
    const { noSpecificAccount, pleaseSelect } = this.props.content;
    const items = [];

    items.push({ value: pleaseSelect, label: pleaseSelect });
    switch (true) {
      case id === 'accounts':
        items.push({ value: noSpecificAccount, label: noSpecificAccount });
        map(accounts, (account) => {
          const name =
            account.display_name || account.name || account.product.name;
          items.push({
            value: account.number,
            label: `${name} (ending ${account.number.slice(-4)})`,
          });
        });
        break;
      case id === 'subjects':
        map(
          subjects,
          (subject) => {
            items.push({ value: subject.value, label: subject.value });
          },
          false
        );
        break;
      default:
    }
    return items;
  }

  render() {
    const {
      ddId,
      accessID,
      showAccountError,
      showSubjectError,
      subjectErrors,
      content,
    } = this.props;
    const { showErrorModal } = this.state;
    const options = this.getOptions();

    return (
      <div>
        <Column xs={24} sm={24} md={9} ld={9} className="u-padding-0">
          <StandardBody>
            <Select
              defaultValue={this.props.selectedValue}
              id={ddId}
              options={options}
              onChange={(e) =>
                this.props.selectSubject(this.props.id, e.target.value)
              }
            />
          </StandardBody>
        </Column>

        {showAccountError ? (
          <StandardBody>
            <ValidationMessage value={content.accError} />
          </StandardBody>
        ) : (
          ''
        )}
        {showSubjectError ? (
          <StandardBody>
            <ValidationMessage value={content.subError} />
          </StandardBody>
        ) : (
          ''
        )}
        {subjectErrors && showErrorModal && accessID === 'Subject'
          ? this.returnErrorModal()
          : ''}
      </div>
    );
  }
}

const mapDispatchToProps = {
  popupState,
  getMessageSubjects,
};

export default connect(null, mapDispatchToProps)(DropDownComponent);
