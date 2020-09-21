import React from 'react';
import { Divider, Icon, Grid, Box } from '@rocket.chat/fuselage';

import Page from '../../components/basic/Page';

export const ConversationsPage = React.memo(function ConversationsPage({ analytics }) {
	return (
		<Page id='conversations-page'>
			<Page.ScrollableContentWithShadow>
				<Grid flex={1} justifyContent={'center'}>
					<Grid.Item>
						<Box fontScale='h1'><Icon name='baloon-text' size={'x30'} color='primary-500'/> Messages:</Box>
						<br />
						<Box display='flex' flexDirection='column' mie='x12' flexGrow={1}>
							<Box display='flex' flexDirection='row' flexGrow={1} justifyContent='space-around' flexWrap='wrap'>
								<Box fontScale='s3' color='strong'>Total</Box>
								<Box display='flex' flexDirection='column' mie='x12' flexGrow={1}>
									<Box fontScale='h1' textAlign='right'>{analytics.totalChannelMessagesInGivenTime}</Box>
									<Box fontScale='micro' color='hint' textAlign='right'>
									Total number of messages sent in given time duration.
									</Box>
								</Box>
							</Box>
						</Box>
						<Divider />
						<Box display='flex' flexDirection='column' mie='x12' flexGrow={1}>
							<Box display='flex' flexDirection='row' flexGrow={1} justifyContent='space-around' flexWrap='wrap'>
								<Box fontScale='s3' color='strong'>Per Day</Box>
								<Box display='flex' flexDirection='column' mie='x12' flexGrow={1}>
									<Box fontScale='h1' textAlign='right'>{analytics.totalAverageMessagePerDay}</Box>
									<Box fontScale='micro' color='hint' textAlign='right'>
									Average number of messages sent per day in given time duration.
									</Box>
								</Box>
							</Box>
						</Box>
						<Divider />
					</Grid.Item>
					<Grid.Item>
						<Box fontScale='h1'><Icon name='baloons' size={'x30'} color='primary-500'/> Discussions:</Box>
						<br />
						<Box display='flex' flexDirection='column' mie='x12' flexGrow={1}>
							<Box display='flex' flexDirection='row' flexGrow={1} justifyContent='space-around' flexWrap='wrap'>
								<Box fontScale='s3' color='strong'>Total</Box>
								<Box display='flex' flexDirection='column' mie='x12' flexGrow={1}>
									<Box fontScale='h1' textAlign='right'>{analytics.totalDiscussionsCreated}</Box>
									<Box fontScale='micro' color='hint' textAlign='right'>
									Total number of discussions in given time duration.
									</Box>
								</Box>
							</Box>
						</Box>
						<Divider />
						<Box display='flex' flexDirection='column' mie='x12' flexGrow={1}>
							<Box display='flex' flexDirection='row' flexGrow={1} justifyContent='space-around' flexWrap='wrap'>
								<Box fontScale='s3' color='strong'>Per Day</Box>
								<Box display='flex' flexDirection='column' mie='x12' flexGrow={1}>
									<Box fontScale='h1' textAlign='right'>{analytics.totalAverageDiscussionsCreatedPerDay}</Box>
									<Box fontScale='micro' color='hint' textAlign='right'>
									Average number of discussions per day in given time duration.
									</Box>
								</Box>
							</Box>
						</Box>
						<Divider />
					</Grid.Item>
				</Grid>
				<br />
				<Grid flex={1} justifyContent={'center'}>
					<Grid.Item>
						<Box fontScale='h1'><Icon name='baloon-exclamation' size={'x30'} color='primary-500'/> Doubts:</Box>
						<br />
						<Box display='flex' flexDirection='column' mie='x12' flexGrow={1}>
							<Box display='flex' flexDirection='row' flexGrow={1} justifyContent='space-around' flexWrap='wrap'>
								<Box fontScale='h1'>{analytics.totalDoubts}</Box>
								<Box fontScale='h1'>{analytics.totalDoubts}</Box>
							</Box>
						</Box>
						<Box display='flex' flexDirection='column' mie='x12' flexGrow={1} justifyContent='space-around'>
							<Box display='flex' flexDirection='row' flexGrow={1} justifyContent='space-around' flexWrap='wrap'>
								<Box fontScale='s3' color='strong'>Asked</Box>
								<Box fontScale='s3' color='strong'>Resolved</Box>
							</Box>
						</Box>
						<br />
						<Box display='flex' flexDirection='column' mie='x12' flexGrow={1}>
							<Box display='flex' flexDirection='row' flexGrow={1} justifyContent='space-around' flexWrap='wrap'>
								<Box fontScale='h1'>{analytics.totalDoubts}</Box>
								<Box fontScale='h1'>{analytics.totalDoubts}</Box>
							</Box>
						</Box>
						<Box display='flex' flexDirection='column' mie='x12' flexGrow={1}>
							<Box display='flex' flexDirection='row' flexGrow={1} justifyContent='space-around' flexWrap='wrap'>
								<Box fontScale='s3' color='strong'>Open</Box>
								<Box fontScale='s3' color='strong'>RR(%)</Box>
							</Box>
						</Box>
						<Divider />
					</Grid.Item>
					<Grid.Item>
						<Box fontScale='h1'><Icon name='circle-check' size={'x30'} color='primary-500'/> Interactivity:</Box>
						<br />
						<Box display='flex' flexDirection='column' mie='x12' flexGrow={1}>
							<Box display='flex' flexDirection='row' flexGrow={1} justifyContent='space-around' flexWrap='wrap'>
								<Box fontScale='h1'>{analytics.totalFiles}</Box>
								<Box fontScale='h1'>{analytics.totalLinks}</Box>
							</Box>
						</Box>
						<Box display='flex' flexDirection='column' mie='x12' flexGrow={1} justifyContent='space-around'>
							<Box display='flex' flexDirection='row' flexGrow={1} justifyContent='space-around' flexWrap='wrap'>
								<Box fontScale='s3' color='strong'>Bookmark</Box>
								<Box fontScale='s3' color='strong'>Thumbs</Box>
							</Box>
						</Box>
						<br />
						<Box display='flex' flexDirection='column' mie='x12' flexGrow={1}>
							<Box display='flex' flexDirection='row' flexGrow={1} justifyContent='space-around' flexWrap='wrap'>
								<Box fontScale='h1'>{analytics.totalFiles}</Box>
								<Box fontScale='h1'>{analytics.totalLinks}</Box>
							</Box>
						</Box>
						<Box display='flex' flexDirection='column' mie='x12' flexGrow={1}>
							<Box display='flex' flexDirection='row' flexGrow={1} justifyContent='space-around' flexWrap='wrap'>
								<Box fontScale='s3' color='strong'>Files</Box>
								<Box fontScale='s3' color='strong'>Links</Box>
							</Box>
						</Box>
						<Divider />
					</Grid.Item>
				</Grid>
			</Page.ScrollableContentWithShadow>
		</Page>
	);
});

export default ConversationsPage;
