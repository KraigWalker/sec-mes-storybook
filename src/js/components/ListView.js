import React from 'react';
import {
  ListViewContainer,
  PreferenceCardContainer,
} from 'document-management-lib';
import { Container, Row } from 'web-ui-components/lib/global/layout';
import { withBreakpoints } from '../components/common/hoc/WithBreakpoint';
import { getPaddingProps, getRowMarginProps } from '../utils/GeneralUtils';

function ListView(props) {
  const { containerSize, noPadding } = props;

  const rowMarginProps = getRowMarginProps(noPadding);

  return (
    <Container {...getPaddingProps(noPadding)} size={containerSize}>
      <Row {...rowMarginProps}>
        <ListViewContainer {...props} />
      </Row>
      <Row {...rowMarginProps}>
        <PreferenceCardContainer {...props} />
      </Row>
    </Container>
  );
}

const ListViewWithBreakpoints = withBreakpoints(ListView);

export { ListViewWithBreakpoints as ListView };
