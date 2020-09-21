import React from 'react';
import { Divider, Icon, Grid, Box } from '@rocket.chat/fuselage';

import Page from '../../components/basic/Page';

export const UsersPage = React.memo(function UsersPage({ analytics }) {
	return (
		<Page id='userss-page'>
			<Page.ScrollableContentWithShadow>
				<Box flex={1} justifyContent={'center'}>
					<Grid flex={1} justifyContent={'center'}>
						<Grid.Item>
							<Box fontScale='h1'><Icon name='team' size={'x30'} color='primary-500'/> Students:</Box>
							<br />
							<Box display='flex' flexDirection='column' mie='x12' flexGrow={1}>
								<Box display='flex' flexDirection='row' flexGrow={1} justifyContent='space-around' flexWrap='wrap'>
									<Box fontScale='s3' color='strong'>Total</Box>
									<Box display='flex' flexDirection='column' mie='x12' flexGrow={1}>
										<Box fontScale='h1' textAlign='right'>{analytics.totalUserCount}</Box>
										<Box fontScale='micro' color='hint' textAlign='right'>
									Total number of students in this channel.
										</Box>
									</Box>
								</Box>
							</Box>
							<Divider />
							<Box display='flex' flexDirection='column' mie='x12' flexGrow={1}>
								<Box display='flex' flexDirection='row' flexGrow={1} justifyContent='space-around' flexWrap='wrap'>
									<Box fontScale='s3' color='strong'>New Users</Box>
									<Box display='flex' flexDirection='column' mie='x12' flexGrow={1}>
										<Box fontScale='h1' textAlign='right'>{analytics.totalNewUsersJoined}</Box>
										<Box fontScale='micro' color='hint' textAlign='right'>
									Total number of student joined in given duration of time.
										</Box>
									</Box>
								</Box>
							</Box>
							<Divider />
							<Box display='flex' flexDirection='column' mie='x12' flexGrow={1}>
								<Box display='flex' flexDirection='row' flexGrow={1} justifyContent='space-around' flexWrap='wrap'>
									<Box fontScale='s3' color='strong'>Join Rate</Box>
									<Box display='flex' flexDirection='column' mie='x12' flexGrow={1}>
										<Box fontScale='h1' textAlign='right'>{analytics.totalAverageUsersJoinedPerDay}</Box>
										<Box fontScale='micro' color='hint' textAlign='right'>
									Average number of students joined in given duration of time.
										</Box>
									</Box>
								</Box>
							</Box>
							<Divider />
							<Box display='flex' flexDirection='column' mie='x12' flexGrow={1}>
								<Box display='flex' flexDirection='row' flexGrow={1} justifyContent='space-around' flexWrap='wrap'>
									<Box fontScale='s3' color='strong'>Returning Users</Box>
									<Box display='flex' flexDirection='column' mie='x12' flexGrow={1}>
										<Box fontScale='h1' textAlign='right'>{analytics.totalAverageUsersJoinedPerDay}</Box>
										<Box fontScale='micro' color='hint' textAlign='right'>
									Total students returned.
										</Box>
									</Box>
								</Box>
							</Box>
							<Divider />
							<Box display='flex' flexDirection='column' mie='x12' flexGrow={1}>
								<Box display='flex' flexDirection='row' flexGrow={1} justifyContent='space-around' flexWrap='wrap'>
									<Box fontScale='s3' color='strong'>Active Users</Box>
									<Box display='flex' flexDirection='column' mie='x12' flexGrow={1}>
										<Box fontScale='h1' textAlign='right'>{analytics.totalActiveUsersInGivenTimeline}</Box>
										<Box fontScale='micro' color='hint' textAlign='right'>
									Total number of students who messaged or commented.
										</Box>
									</Box>
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
				</Box>
				<Divider />
			</Page.ScrollableContentWithShadow>
		</Page>
	);
});

export default UsersPage;
