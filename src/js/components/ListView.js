import React from 'react';
import { ListViewContainer, PreferenceCardContainer } from 'document-management-lib';
import { Container, Row } from 'web-ui-components/lib/global/layout';
import { withBreakpoints } from '../components/common/hoc/WithBreakpoint';
import { getPaddingProps, getRowMarginProps } from '../utils/GeneralUtils';

const listview = props => {
  const { containerSize, noPadding } = props;

  return (
    <Container {...getPaddingProps(noPadding)} size={containerSize}>
      <Row {...getRowMarginProps(noPadding)}>
        <ListViewContainer {...props} />
      </Row>
      <Row {...getRowMarginProps(noPadding)}>
        <PreferenceCardContainer {...props} />
      </Row>
    </Container>
  );
};

export const ListView = withBreakpoints(listview);
