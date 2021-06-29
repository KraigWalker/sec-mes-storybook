import mdx from './FloatingActionButton.mdx';
import { FloatingActionButton } from './FloatingActionButton';
import '../../../../index.css';

const Template = (args) => (
  <div style={{ width: '100%', height: '100%' }}>
    <FloatingActionButton {...args} />
  </div>
);

const Default = Template.bind({});
Default.args = {
  label: 'Compose',
  labelId: 'actionButtonCompose',
};

export { Default };

export default {
  title: 'Components/FloatingActionButton',
  parameters: {
    docs: {
      page: mdx,
    },
  },
  component: FloatingActionButton,
};
