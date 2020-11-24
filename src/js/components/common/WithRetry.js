import { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ErrorModal from './ErrorModal';
import { popupState, retryUpdateRequest } from '../../actions/AppActions';
import { MessageSelectors } from '../../reducers';

export const WithRetry = (WrappedComponent) =>
  (class WithRetry extends Component {
    constructor(props) {
      super(props);
      this.returnErrorModal = this.returnErrorModal.bind(this);
      this.retryServiceCall = this.retryServiceCall.bind(this);
      this.errorCloseClicked = this.errorCloseClicked.bind(this);
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

    errorCloseClicked() {
      this.props.popupState();
    }

    retryServiceCall() {
      const {
        failedReq,
        failedUpdatetype,
        retryUpdateRequest,
        popupState,
      } = this.props;

      popupState();
      retryUpdateRequest(failedUpdatetype, failedReq);
    }

    render() {
      return (
        <div>
          <WrappedComponent {...this.props} />
          {this.props.failedUpdatetype && this.returnErrorModal()}
        </div>
      );
    }
  });

WithRetry.propTypes = {
  failedReq: PropTypes.object,
  failedUpdatetype: PropTypes.string,
  popupState: PropTypes.func,
  retryUpdateRequest: PropTypes.func,
};

const mapState = (state) => ({
  failedReq: MessageSelectors.getFailedReq(state),
  failedUpdatetype: MessageSelectors.getFailedUpdateType(state),
});

const actionCreators = {
  popupState,
  retryUpdateRequest,
};

const composedWithRetry = compose(connect(mapState, actionCreators), WithRetry);

export default composedWithRetry;
