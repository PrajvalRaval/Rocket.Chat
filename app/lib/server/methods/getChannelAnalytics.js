import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import _ from 'underscore';

import { hasPermission } from '../../../authorization';
import { Subscriptions, Messages } from '../../../models';
import { normalizeMessagesForUser } from '../../../utils/server/lib/normalizeMessagesForUser';

Meteor.methods({
	getChannelAnalytics({ rid, latest, oldest }) {
		check(rid, String);

		if (!Meteor.userId()) {
			throw new Meteor.Error('error-invalid-user', 'Invalid user', { method: 'getChannelAnalytics' });
		}

		const fromUserId = Meteor.userId();
		const room = Meteor.call('canAccessRoom', rid, fromUserId);
		if (!room) {
			return false;
		}

		// Make sure they can access the room
		if (room.t === 'c' && !hasPermission(fromUserId, 'preview-c-room') && !Subscriptions.findOneByRoomIdAndUserId(rid, fromUserId, { fields: { _id: 1 } })) {
			return false;
		}

		// Ensure latest is always defined and is a valid date.
		if (_.isUndefined(latest) || !_.isDate(latest)) {
			throw new Meteor.Error('error-invalid-date', 'Invalid date param or param not provided. Issue with \'latest\' query param.', { method: 'getChannelAnalytics' });
		}

		// Ensure latest is always defined and is a valid date.
		if (_.isUndefined(oldest) || !_.isDate(oldest)) {
			throw new Meteor.Error('error-invalid-date', 'Invalid date param or param not provided. Issue with \'oldest\' query param.', { method: 'getChannelAnalytics' });
		}

		// Ensure the Given two dates have a valid timeline.
		if (latest.getTime() < oldest.getTime()) {
			throw new Meteor.Error('error-invalid-date', 'Invalid date param timeline.', { method: 'getChannelAnalytics' });
		}


		const options = {
			sort: {
				ts: -1,
			},
		};

		function getAverageDayCountOfData(oldestDate, latestDate, dataCount) {
			const diffInTime = latestDate.getTime() - oldestDate.getTime();
			const noOfDays = diffInTime / (1000 * 3600 * 24);
			if (Math.sign(noOfDays) === -1 || Math.sign(noOfDays) === 0) {
				return 0;
			}

			const avg = dataCount / noOfDays;
			const dayCount = Math.round((avg + Number.EPSILON) * 100) / 100;
			return dayCount;
		}

		let allMessagesInGivenTimeline = [];
		let allDiscussionsCreatedInGivenTimeline = [];
		let allDoubtsInGivenTimeline = [];
		let allLinksInGivenTimeline = [];
		let allFilesInGivenTimeline = [];
		let allUserJoinedInGivenTimeline = [];
		const allActiveUsersInGivenTimeline = [];

		allMessagesInGivenTimeline = Messages.findVisibleByRoomIdBetweenTimestampsInclusiveNotContainingTypes(rid, oldest, latest, options).fetch();
		allDiscussionsCreatedInGivenTimeline = Messages.findVisibleByRoomIdBetweenTimestampsInclusiveDiscussionCreated(rid, oldest, latest, options).fetch();
		allDoubtsInGivenTimeline = Messages.findVisibleByRoomIdBetweenTimestampsInclusiveDoubts(rid, oldest, latest, options).fetch();
		allFilesInGivenTimeline = Messages.findVisibleByRoomIdBetweenTimestampsInclusiveFiles(rid, oldest, latest, options).fetch();
		allUserJoinedInGivenTimeline = Messages.findVisibleByRoomIdBetweenTimestampsUserJoined(rid, oldest, latest, options).fetch();

		const allMessageBlocksWithLinksInGivenTimeline = Messages.findVisibleByRoomIdBetweenTimestampsInclusiveURLs(rid, oldest, latest, options).fetch();
		const totalLinksPostedInGivenChannel = allMessageBlocksWithLinksInGivenTimeline.map((x) => {
			const { urls } = x;
			const urlObjs = urls.map((y) => y.url);
			return urlObjs;
		});
		allLinksInGivenTimeline = [].concat.apply([], totalLinksPostedInGivenChannel);

		const normalisedAllMessagesInGivenTimeline = normalizeMessagesForUser(allMessagesInGivenTimeline, fromUserId);
		const everyActiveUserWithDuplicates = normalisedAllMessagesInGivenTimeline.map((x) => {
			const everyActiveUserWithDuplicates = x.u.username;
			return everyActiveUserWithDuplicates;
		});

		if (everyActiveUserWithDuplicates.length > 0) {
			everyActiveUserWithDuplicates.forEach((c) => {
				if (!allActiveUsersInGivenTimeline.includes(c)) {
					allActiveUsersInGivenTimeline.push(c);
				}
			});
		}

		const averageMessagePerDay = getAverageDayCountOfData(oldest, latest, allMessagesInGivenTimeline.length);
		const averageDiscussionsCreatedPerDay = getAverageDayCountOfData(oldest, latest, allDiscussionsCreatedInGivenTimeline.length);
		const averageUsersJoinedPerDay = getAverageDayCountOfData(oldest, latest, allUserJoinedInGivenTimeline.length);

		return {
			_id: room._id,
			channelName: room.name,
			fname: room.fname,
			totalChannelMessages: room.msgs,
			totalChannelMessagesInGivenTime: allMessagesInGivenTimeline.length,
			totalAverageMessagePerDay: averageMessagePerDay,
			totalDiscussionsCreated: allDiscussionsCreatedInGivenTimeline.length,
			totalAverageDiscussionsCreatedPerDay: averageDiscussionsCreatedPerDay,
			totalDoubts: allDoubtsInGivenTimeline.length,
			totalLinks: allLinksInGivenTimeline.length,
			totalFiles: allFilesInGivenTimeline.length,
			totalUserCount: room.usersCount,
			totalNewUsersJoined: allUserJoinedInGivenTimeline.length,
			totalAverageUsersJoinedPerDay: averageUsersJoinedPerDay,
			totalActiveUsersInGivenTimeline: allActiveUsersInGivenTimeline.length,
			fromDate: oldest,
			toDate: latest,
		};
	},
});
