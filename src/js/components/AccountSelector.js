import { AccountSelectorContainer } from 'document-management-lib';
import { Container, Row } from 'web-ui-components/lib/global/layout';
import { withBreakpoints } from '../components/common/hoc/WithBreakpoint';
import { getPaddingProps, getRowMarginProps } from '../utils/GeneralUtils';

/**
 *
 * @todo Get specific about the props passed to AccountSelectorContainer instead of using `{...props}`
 * @param {*} props
 */
function AccountSelector(props) {
  const { containerSize, noPadding } = props;

  return (
    <Container {...getPaddingProps(noPadding)} size={containerSize}>
      <Row {...getRowMarginProps(noPadding)}>
        {/** @todo get more specific about what props are passed into AccountSelectorContainer */}
        <AccountSelectorContainer {...props} />
      </Row>
    </Container>
  );
}

const AccountSelectorWithBreakpoints = withBreakpoints(AccountSelector);

export { AccountSelectorWithBreakpoints as AccountSelector };
