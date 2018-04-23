
import React from 'react';
import _ from 'lodash';
import Thread from './ThreadsComponent';

class ThreadList extends React.Component {
	getThreadList() {
		console.log('called',this.props);
		const { Threads, currentMessage, content, isFromReplyMessage } = this.props;
		const allThreads = [];
		if (isFromReplyMessage) {
			allThreads.push(<Thread ThreadDetail={currentMessage} key={0} content={content} />);
		}
		_.map(Threads, (thread, index) => {
			allThreads.push(<Thread ThreadDetail={thread} key={index + 1} content={content} />);
		});
		return allThreads;
	}
	render() {
		return (
			<ol>
				{this.getThreadList()}
			</ol>
		);
	}
}
export default ThreadList;
