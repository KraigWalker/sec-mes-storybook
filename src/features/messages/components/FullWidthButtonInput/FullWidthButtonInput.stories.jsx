import mdx from './FullWidthButtonInput.mdx';
import { FullWidthButtonInput } from './';
import '../../../../index.css';

const Template = (args) => (
  <div style={{ width: '100%', height: '100%' }}>
    <FullWidthButtonInput {...args} />
  </div>
);

const Default = Template.bind({});
Default.args = {
  value: 'Save as draft',
  type: 'button',
  //labelId: 'actionButtonCompose',
};

export { Default };

export default {
  title: 'Components/FullWidthButtonInput',
  parameters: {
    docs: {
      page: mdx,
    },
  },
  argTypes: {
    type: {
      label: 'type',
      options: ['button', 'submit'],
      description: 'type documentation goes here',
      control: 'select',
    },
  },
  component: FullWidthButtonInput,
};
