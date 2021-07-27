import { MemoryRouter } from 'react-router-dom';
import mdx from './MessageList.mdx';
import { MessageList } from './MessageList';
import '../../../../index.css';

const Template = (args) => (
  <MemoryRouter>
    <div style={{ width: '100%', height: '100%' }}>
      <MessageList {...args} />
    </div>
  </MemoryRouter>
);

const Default = Template.bind({});
Default.args = {};

export { Default };

export default {
  title: 'Components/MessageList',
  parameters: {
    docs: {
      page: mdx,
    },
  },
  component: MessageList,
};
