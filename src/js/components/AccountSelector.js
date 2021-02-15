import { AccountSelectorContainer } from 'document-management-lib';
import { Container } from 'web-ui-components/lib/global/layout';
import { withBreakpoints } from '../components/common/hoc/WithBreakpoint';
import { getPaddingProps } from '../utils/GeneralUtils';

/**
 *
 * @todo Get specific about the props passed to AccountSelectorContainer instead of using `{...props}`
 * @param {*} props
 */
function AccountSelector(props) {
  const { containerSize, noPadding } = props;

  return (
    <Container {...getPaddingProps(noPadding)} size={containerSize}>
      {/** @todo get more specific about what props are passed into AccountSelectorContainer */}
      <AccountSelectorContainer {...props} />
    </Container>
  );
}

const AccountSelectorWithBreakpoints = withBreakpoints(AccountSelector);

export { AccountSelectorWithBreakpoints as AccountSelector };
