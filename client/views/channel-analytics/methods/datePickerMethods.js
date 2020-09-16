import moment from 'moment';

import { dateRanges } from '../data/rangeEnum';

export const todayDate = moment().format('YYYY-MM-DD');

export function returnOldAndLatestTimestamps(fromDate, toDate) {
	const oldestDateTimestamp = `${ fromDate }T00:00:01.000Z`;
	const latestDateTimestamp = `${ toDate }T23:59:59.000Z`;

	return {
		oldestDateTimestamp,
		latestDateTimestamp,
	};
}

export function getEndAndStartMonthDates(timestamp) {
	const startMonthDate = moment(timestamp)
		.startOf('month')
		.format('YYYY-MM-DD');
	const endMonthDate = moment(timestamp).endOf('month').format('YYYY-MM-DD');

	return {
		startMonthDate,
		endMonthDate,
	};
}

export function getEndAndStartWeekDates(timestamp) {
	const startWeekDate = moment(timestamp).startOf('week').format('YYYY-MM-DD');
	const endWeekDate = moment(timestamp).endOf('week').format('YYYY-MM-DD');

	return {
		startWeekDate,
		endWeekDate,
	};
}

export function getDateRangeTimestamps(range, analyticsFromDate) {
	switch (range) {
		case dateRanges.YESTERDAY:
			const yesterdayDate = moment().subtract(1, 'd').format('YYYY-MM-DD');
			const latestDate = moment().format('YYYY-MM-DD');
			return returnOldAndLatestTimestamps(yesterdayDate, latestDate);

		case dateRanges.THIS_WEEK:
			const timeStampThisWeek = `${ todayDate }T00:00:01.000Z`;
			const {
				startWeekDate: startThisWeek,
				endWeekDate: endThisWeek,
			} = getEndAndStartWeekDates(timeStampThisWeek);
			return returnOldAndLatestTimestamps(startThisWeek, endThisWeek);

		case dateRanges.PERVIOUS_WEEK:
			const lastWeekDate = moment().subtract(7, 'd').format('YYYY-MM-DD');
			const timestampPreviousWeek = `${ lastWeekDate }T00:00:01.000Z`;
			const {
				startWeekDate: startPreviousWeek,
				endWeekDate: endPreviousWeek,
			} = getEndAndStartWeekDates(timestampPreviousWeek);
			return returnOldAndLatestTimestamps(startPreviousWeek, endPreviousWeek);

		case dateRanges.THIS_MONTH:
			const timestampThisMonth = `${ todayDate }T00:00:01.000Z`;
			const {
				startMonthDate: startThisMonth,
				endMonthDate: endThisMonth,
			} = getEndAndStartMonthDates(timestampThisMonth);
			return returnOldAndLatestTimestamps(startThisMonth, endThisMonth);

		case dateRanges.PREVIOUS_MONTH:
			const previousMonthDate = moment().subtract(1, 'months').format('YYYY-MM-DD');
			const timestampPreviousMonth = `${ previousMonthDate }T00:00:01.000Z`;
			const {
				startMonthDate: startPreviousMonth,
				endMonthDate: endPreviousMonth,
			} = getEndAndStartMonthDates(timestampPreviousMonth);
			return returnOldAndLatestTimestamps(startPreviousMonth, endPreviousMonth);

		case dateRanges.SUBSTRACT_WEEK:
			const subFromDate = moment(analyticsFromDate);
			const substactWeekDate = subFromDate
				.subtract(7, 'd')
				.format('YYYY-MM-DD');
			const timestampSubstractWeek = `${ substactWeekDate }T00:00:01.000Z`;
			const {
				startWeekDate: startSubstractWeek,
				endWeekDate: endSubstractWeek,
			} = getEndAndStartWeekDates(timestampSubstractWeek);
			return returnOldAndLatestTimestamps(startSubstractWeek, endSubstractWeek);

		case dateRanges.ADD_WEEK:
			const addFromDate = moment(analyticsFromDate);
			const addWeekDate = addFromDate.add(7, 'd').format('YYYY-MM-DD');
			const timestampaddWeek = `${ addWeekDate }T00:00:01.000Z`;
			const {
				startWeekDate: startAddWeek,
				endWeekDate: endAddWeek,
			} = getEndAndStartWeekDates(timestampaddWeek);
			return returnOldAndLatestTimestamps(startAddWeek, endAddWeek);

		default:
			const timestampDefault = `${ todayDate }T00:00:01.000Z`;
			const {
				startWeekDate: startDefault,
				endWeekDate: endDefault,
			} = getEndAndStartWeekDates(timestampDefault);
			return returnOldAndLatestTimestamps(startDefault, endDefault);
	}
}
