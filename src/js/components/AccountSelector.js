import React from 'react';
import { AccountSelectorContainer } from 'document-management-lib';
import { Container, Row } from 'web-ui-components/lib/global/layout';
import { withBreakpoints } from '../components/common/hoc/WithBreakpoint';
import { getPaddingProps, getRowMarginProps } from '../utils/GeneralUtils';

const accounts = props => {
  const { containerSize, noPadding } = props;

  return (
    <Container {...getPaddingProps(noPadding)} size={containerSize}>
      <Row {...getRowMarginProps(noPadding)}>
        <AccountSelectorContainer {...props} />
      </Row>
    </Container>
  );
};

export const AccountSelector = withBreakpoints(accounts);
