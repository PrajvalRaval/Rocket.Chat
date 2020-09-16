import { Box } from '@rocket.chat/fuselage';
import React from 'react';

import Page from '../../components/basic/Page';

function AnalyticsError() {
	return <Page>
		<Page.Content pb='x24'>
			<Box is='p' fontScale='p1'>{'Analytics not available or you are not authorised to access this page.'}</Box>
		</Page.Content>
	</Page>;
}

export default AnalyticsError;
