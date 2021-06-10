import { MemoryRouter } from 'react-router-dom';
import mdx from './SegmentedControl.mdx';
import { SegmentedControl } from './SegmentedControl';

const Template = (args) => (
  <html data-theme="vm">
    <MemoryRouter {...args}>
      <div style={{ width: '400px', height: 'auto' }}>
        <SegmentedControl />
      </div>
    </MemoryRouter>
  </html>
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
