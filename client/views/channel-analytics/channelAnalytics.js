import React, { useState, useEffect, useCallback } from 'react';
import { Select, Divider, FieldGroup, Field, ButtonGroup, Button, Icon, Menu, Box, TextInput } from '@rocket.chat/fuselage';
import moment from 'moment';

import Page from '../../components/basic/Page';
import { useRouteParameter } from '../../contexts/RouterContext';
import { useEndpoint } from '../../contexts/ServerContext';
import { ConversationsPage } from './conversationsPage';
import { UsersPage } from './usersPage';
import AnalyticsError from './analyticsError';
import { useForm } from '../../hooks/useForm';
import { analyticsSelectOptions } from './data/channelAnalyticsSelectOptions';
import { returnOldAndLatestTimestamps, getDateRangeTimestamps } from './methods/datePickerMethods';
import { dateRanges } from './data/rangeEnum';

export const ChannelAnalytics = React.memo(function ChannelAnalytics({ onChange }) {
	let rid = useRouteParameter('rid');

	if (!rid) {
		rid = 'GENERAL';
	}

	const [analytics, setAnalytics] = useState({});
	const [enableCustomRange, setEnableCustomRange] = useState(false);
	const [fromCustomRange, setFromCustomRange] = useState('');
	const [toCustomRange, setToCustomRange] = useState('');
	const [invalidFromCustomRange, setInvalidFromCustomRange] = useState(false);
	const [invalidToCustomRange, setInvalidToCustomRange] = useState(false);
	const [setChannelAnalytics] = useState(() => () => ({}));
	const getChannelAnalytics = useEndpoint('GET', 'channels.analytics');

	const { values, handlers } = useForm({ tabs: 'conversations' }, onChange);
	const { tabs } = values;
	const { handleTabs } = handlers;

	const { oldestDateTimestamp, latestDateTimestamp } = getDateRangeTimestamps(dateRanges.THIS_WEEK);

	const fetchChannelAnalytics = useCallback((rid, latestDateTimestamp, oldestDateTimestamp) => {
		const fetchChannelAnalytics = async ({ roomId = rid, latest = latestDateTimestamp, oldest = oldestDateTimestamp } = {}) => {
			try {
				const [analytics] = await Promise.all([
					getChannelAnalytics({ roomId, latest, oldest }),
				]);

				setAnalytics(analytics);
			} catch (err) {
				console.log(err);
			}
		};

		setChannelAnalytics(() => fetchChannelAnalytics);

		fetchChannelAnalytics();
	}, [getChannelAnalytics, setChannelAnalytics]);

	useEffect(() => {
		fetchChannelAnalytics(rid, latestDateTimestamp, oldestDateTimestamp);
	}, [rid, getChannelAnalytics, setChannelAnalytics, latestDateTimestamp, oldestDateTimestamp, fetchChannelAnalytics]);

	const substractWeek = useCallback(() => {
		const { oldestDateTimestamp, latestDateTimestamp } = getDateRangeTimestamps(dateRanges.SUBSTRACT_WEEK, analytics.fromDate);
		fetchChannelAnalytics(rid, latestDateTimestamp, oldestDateTimestamp);
	}, [analytics.fromDate, fetchChannelAnalytics, rid]);

	const addWeek = useCallback(() => {
		const { oldestDateTimestamp, latestDateTimestamp } = getDateRangeTimestamps(dateRanges.ADD_WEEK, analytics.fromDate);

		const todayDate = moment().format('YYYY-MM-DD');
		const todayDateTimestamp = `${ todayDate }T00:00:01.000Z`;
		const latestEndWeekDay = moment(todayDateTimestamp).endOf('week').format('YYYY-MM-DD');
		const mostRecentWeekLastDay = new Date(`${ latestEndWeekDay }T23:59:59.000Z`);
		const analyticsCallLastDay = new Date(latestDateTimestamp);

		if (analyticsCallLastDay > mostRecentWeekLastDay) {
			return;
		}

		fetchChannelAnalytics(rid, latestDateTimestamp, oldestDateTimestamp);
	}, [analytics.fromDate, fetchChannelAnalytics, rid]);

	const setYesterday = useCallback(() => {
		const { oldestDateTimestamp, latestDateTimestamp } = getDateRangeTimestamps(dateRanges.YESTERDAY);
		fetchChannelAnalytics(rid, latestDateTimestamp, oldestDateTimestamp);
	}, [fetchChannelAnalytics, rid]);

	const setThisWeek = useCallback(() => {
		const { oldestDateTimestamp, latestDateTimestamp } = getDateRangeTimestamps(dateRanges.THIS_WEEK);
		fetchChannelAnalytics(rid, latestDateTimestamp, oldestDateTimestamp);
	}, [fetchChannelAnalytics, rid]);

	const setPreviousWeek = useCallback(() => {
		const { oldestDateTimestamp, latestDateTimestamp } = getDateRangeTimestamps(dateRanges.PERVIOUS_WEEK);
		fetchChannelAnalytics(rid, latestDateTimestamp, oldestDateTimestamp);
	}, [fetchChannelAnalytics, rid]);

	const setThisMonth = useCallback(() => {
		const { oldestDateTimestamp, latestDateTimestamp } = getDateRangeTimestamps(dateRanges.THIS_MONTH);
		fetchChannelAnalytics(rid, latestDateTimestamp, oldestDateTimestamp);
	}, [fetchChannelAnalytics, rid]);

	const setPreviousMonth = useCallback(() => {
		const { oldestDateTimestamp, latestDateTimestamp } = getDateRangeTimestamps(dateRanges.PREVIOUS_MONTH);
		fetchChannelAnalytics(rid, latestDateTimestamp, oldestDateTimestamp);
	}, [fetchChannelAnalytics, rid]);

	const enableCustomRangeView = useCallback(() => {
		enableCustomRange === true ? setEnableCustomRange(false) : setEnableCustomRange(true);
	}, [enableCustomRange]);

	const preDefinedRangeOptions = {
		yesterday: {
			label: 'Yesterday',
			action: setYesterday,
		},
		thisweek: {
			label: 'This Week',
			action: setThisWeek,
		},
		previousweek: {
			label: 'Previous Week',
			action: setPreviousWeek,
		},
		thismonth: {
			label: 'This Month',
			action: setThisMonth,
		},
		previousmonth: {
			label: 'Previous Month',
			action: setPreviousMonth,
		},
		customrange: {
			label: 'Custom Range',
			action: enableCustomRangeView,
		},
	};

	const handlefromCustomRangeChange = useCallback((event) => {
		setFromCustomRange(event.currentTarget.value);
	}, []);

	const handletoCustomRangeChange = useCallback((event) => {
		setToCustomRange(event.currentTarget.value);
	}, []);

	const handleCloseCustomRangeChange = useCallback(() => {
		setFromCustomRange('');
		setToCustomRange('');
		setEnableCustomRange(false);
		setInvalidFromCustomRange(false);
		setInvalidToCustomRange(false);
	}, []);

	const setCustomRange = useCallback(() => {
		if (moment(fromCustomRange, 'YYYY-MM-DD', true).isValid() === false || moment(toCustomRange, 'YYYY-MM-DD', true).isValid() === false) {
			setInvalidFromCustomRange(true);
			setInvalidToCustomRange(true);
			return;
		}

		const { oldestDateTimestamp, latestDateTimestamp } = returnOldAndLatestTimestamps(fromCustomRange, toCustomRange);

		if (new Date(oldestDateTimestamp).getTime() > new Date(latestDateTimestamp).getTime()) {
			setInvalidFromCustomRange(true);
			setInvalidToCustomRange(true);
			return;
		}

		handleCloseCustomRangeChange();

		fetchChannelAnalytics(rid, latestDateTimestamp, oldestDateTimestamp);
	}, [fromCustomRange, toCustomRange, handleCloseCustomRangeChange, fetchChannelAnalytics, rid]);

	if (analytics.success === true) {
		return <Page id='channel-analytics'>
			<Page.Header title={`${ analytics.fname ? analytics.fname : analytics.channelName } - Analytics`}></Page.Header>
			<Divider />
			<Page.ScrollableContentWithShadow>
				<FieldGroup>
					<Field>
						<Field.Row>
							<Select value={tabs} maxWidth={'180px'} onChange={handleTabs} options={analyticsSelectOptions} />
							{enableCustomRange === false ? <Box flex={1} justifyContent={'center'} flexDirection={'row'}>
								<ButtonGroup>
									<Button ghost small={true} onClick={substractWeek}><Icon name='calendar' size='x16' /> {moment.utc(analytics.fromDate).format('YYYY-MM-DD')}</Button>
                                    To
									<Button ghost small={true} onClick={addWeek}>{moment.utc(analytics.toDate).format('YYYY-MM-DD')} <Icon name='calendar' size='x16' /></Button>
									<Menu options={preDefinedRangeOptions} square small={true} cursor={1} />
								</ButtonGroup>
							</Box> : <Box flex={1} justifyContent={'center'} flexDirection={'row'}>
								<ButtonGroup>
									<TextInput id={'fromCustomRangeInput'} placeholder='YYYY-MM-DD' error={invalidFromCustomRange} value={fromCustomRange} onChange={handlefromCustomRangeChange}/>
                                    To
									<TextInput id={'toCustomRangeInput'} placeholder='YYYY-MM-DD' error={invalidToCustomRange} value={toCustomRange} onChange={handletoCustomRangeChange}/>
									{fromCustomRange && toCustomRange
										? <Button primary onClick={setCustomRange}>Set</Button>
										: <Button danger onClick={enableCustomRangeView}>Cancel</Button>}
								</ButtonGroup>
							</Box>
							}
						</Field.Row>
					</Field>
				</FieldGroup>
				<Divider />
				{
					(tabs === 'users' && <UsersPage analytics={analytics}></UsersPage>)
                        || (tabs === 'conversations' && <ConversationsPage analytics={analytics}></ConversationsPage>)
				}
			</Page.ScrollableContentWithShadow>
		</Page>;
	}

	return <AnalyticsError />;
});

export default ChannelAnalytics;
