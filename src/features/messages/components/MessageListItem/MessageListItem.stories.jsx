import { MemoryRouter } from 'react-router-dom';
import mdx from './MessageListItem.mdx';
import { MessageListItem } from './';
import '../../../../index.css';

const Template = (args) => (
  <MemoryRouter>
    <div style={{ width: '100%', height: '100%' }}>
      <MessageListItem {...args} />
    </div>
  </MemoryRouter>
);

const Default = Template.bind({});
Default.args = {
  isUnread: true,
};

export { Default };

export default {
  title: 'Components/MessageListItem',
  parameters: {
    docs: {
      page: mdx,
    },
  },
  component: MessageListItem,
};
