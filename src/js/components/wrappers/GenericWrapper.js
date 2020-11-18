import React from 'react';
import { connect } from 'react-redux';
import content from '../../content';

import { fetchSecureMessages, getAccounts } from '../../actions/AppActions';
import { MessageSelectors } from '../../reducers';

const getContent = (brand) => {
  switch (brand) {
    case 'VM':
      return content.VM;
    case 'DYB':
      return content.DYB;
    case 'CB':
    case 'YB':
    default:
      return content.CB;
  }
};

export function withSubscription(WrappedComponent) {
  const mapState = (state) => ({
    fetched: MessageSelectors.getFetched(state),
  });
  return connect(mapState)(
    class extends React.PureComponent {
      constructor(props) {
        super(props);
        const { brand } = props.session;

        this.state = {
          content: getContent(brand),
        };
      }

      componentWillMount() {
        const { dispatch, fetched } = this.props;
        dispatch(getAccounts());
        !fetched && dispatch(fetchSecureMessages());
      }

      componentWillReceiveProps(nextProps) {
        !nextProps.fetched && this.props.dispatch(fetchSecureMessages());
      }
      render() {
        return (
          <WrappedComponent
            content={this.state.content}
            token={this.state.token}
            {...this.props}
          />
        );
      }
    }
  );
}

export function accessibilityWrapper(WrappedComponent) {
  let currentMessage = '';
  const mapState = (state) => ({
    message: state.accessibilityReducer.accessibilityMessage,
    fetched: MessageSelectors.getFetched(state),
  });
  return connect(mapState)(
    class extends React.Component {
      componentDidUpdate(prevProps, prevState) {
        if (currentMessage) {
          setTimeout(() => {
            currentMessage = '';
          }, 500);
        }
      }
      render() {
        currentMessage = this.props.message;
        return (
          <div>
            <div
              className="u-visually-hidden off-screen"
              role="status"
              aria-live="polite"
              aria-atomic="true"
            >
              {currentMessage && this.props.fetched ? (
                <span>{currentMessage}</span>
              ) : (
                ''
              )}
            </div>
            <WrappedComponent />
          </div>
        );
      }
    }
  );
}
