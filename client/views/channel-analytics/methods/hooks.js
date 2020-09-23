import { useMemo } from 'react';

export function useQuery(
	{ itemsPerPage, current },
	roomId,
	oldest,
	latest,
) {
	return useMemo(
		() => ({
			roomId,
			oldest,
			latest,
			...itemsPerPage && { count: itemsPerPage },
			...current && { offset: current },
		}),
		[roomId, oldest, latest, itemsPerPage, current],
	);
}
