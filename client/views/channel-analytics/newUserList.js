import React, { useMemo, useState, useCallback } from 'react';
import { Box, Table, Flex } from '@rocket.chat/fuselage';
import { useMediaQuery } from '@rocket.chat/fuselage-hooks';

import { GenericTable, Th } from '../../components/GenericTable';
import { usePermission } from '../../contexts/AuthorizationContext';
import { useQuery } from './methods/hooks';
import { useEndpointData } from '../../hooks/useEndpointData';
import { useFormatDate } from '../../hooks/useFormatDate';
import UserAvatar from '../../components/basic/avatar/UserAvatar';
import NotAuthorizedPage from '../../components/NotAuthorizedPage';
import MarkdownText from '../../components/basic/MarkdownText';

function UserTable({
	roomId,
	oldest,
	latest,
}) {
	const [params, setParams] = useState({ current: 0, itemsPerPage: 25 });
	const canViewFullOtherUserInfo = usePermission('view-full-other-user-info');

	const query = useQuery(params, roomId, oldest, latest);
	const data = useEndpointData('channels.members', query) || {};

	const mediaQuery = useMediaQuery('(min-width: 1024px)');

	const header = useMemo(() => [
		<Th key={'name'}>{'Name'}</Th>,
		mediaQuery && canViewFullOtherUserInfo && <Th key={'email'} style={{ width: '200px' }} >{'Email'}</Th>,
		mediaQuery && <Th key={'createdAt'} style={{ width: '200px' }}>{'Joined at'}</Th>,
	].filter(Boolean), [mediaQuery, canViewFullOtherUserInfo]);


	const formatDate = useFormatDate();

	const renderRow = useCallback(({ createdAt, emails, _id, username, name, bio, avatarETag, nickname }) => <Table.Row key={_id} tabIndex={0} role='link' action>
		<Table.Cell>
			<Flex.Container>
				<Box>
					<Flex.Item>
						<UserAvatar size='x40' title={username} username={username} etag={avatarETag} />
					</Flex.Item>
					<Box withTruncatedText grow={1} mi='x8'>
						<Box display='flex'>
							<Box fontScale='p2' withTruncatedText>{name || username}{nickname && ` (${ nickname })`}</Box> <Box mi='x4'/> <Box fontScale='p1' color='hint' withTruncatedText>{username}</Box>
						</Box>
						<MarkdownText fontScale='p1' color='hint' content={bio}/>
					</Box>
				</Box>
			</Flex.Container>
		</Table.Cell>
		{mediaQuery && canViewFullOtherUserInfo
			&& <Table.Cell withTruncatedText >
				{emails && emails[0].address}
			</Table.Cell>}
		{mediaQuery && <Table.Cell fontScale='p1' color='hint' withTruncatedText>
			{formatDate(createdAt)}
		</Table.Cell>}
	</Table.Row>, [mediaQuery, canViewFullOtherUserInfo, formatDate]);

	return <GenericTable header={header} renderRow={renderRow} results={data.members} total={data.total} setParams={setParams} />;
}

export default function NewUserList(props) {
	const canViewOutsideRoom = usePermission('view-outside-room');
	const canViewDM = usePermission('view-d-room');

	if (canViewOutsideRoom && canViewDM) {
		return <UserTable {...props} />;
	}

	return <NotAuthorizedPage />;
}
