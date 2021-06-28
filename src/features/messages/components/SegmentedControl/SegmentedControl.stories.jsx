import { MemoryRouter } from 'react-router-dom';
import mdx from './SegmentedControl.mdx';
import { SegmentedControl } from './SegmentedControl';
import '../../../../index.css';

const Template = (args) => (
  <MemoryRouter {...args}>
    <div style={{ width: '100%', height: 'auto' }}>
      <SegmentedControl />
    </div>
  </MemoryRouter>
);

const WithCurrentItem = Template.bind({});
const WithoutCurrentItem = Template.bind({});

WithCurrentItem.args = {
  initialEntries: ['/sent'],
};

export { WithCurrentItem, WithoutCurrentItem };

export default {
  title: 'Components/SegmentedControl',
  parameters: {
    docs: {
      page: mdx,
    },
  },
  component: SegmentedControl,
};
