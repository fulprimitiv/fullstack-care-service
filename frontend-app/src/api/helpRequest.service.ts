import api from './axios';
import type {
	HelpRequest,
	CreateHelpRequestCommand,
} from '../shared/types/helpRequest';
import type { HelpRequestStatus } from '../shared/types/enums';

export const helpRequestApi = {
	getAll: () =>
		api.get<HelpRequest[]>('/api/v1/help-request'),

	getById: (id: number) =>
		api.get<HelpRequest>(`/api/v1/help-request/${id}`),

	create: (data: CreateHelpRequestCommand) =>
		api.post<HelpRequest>('/api/v1/help-request', data),

	takeByVolunteer: (id: number, volunteerId: number) =>
		api.post<HelpRequest>(
			`/api/v1/help-request/${id}`,
			volunteerId
		),

	updateStatus: (id: number, status: HelpRequestStatus) =>
		api.put<HelpRequest>(
			`/api/v1/help-request/${id}/status/${status}`
		),

	updateRating: (id: number, rating: number) =>
		api.put<HelpRequest>(
			`/api/v1/help-request/${id}/rating/${rating}`
		),

	updateComment: (id: number, comment: string) =>
		api.put<HelpRequest>(
			`/api/v1/help-request/${id}/comment`,
			comment
		),

	getByUser: (userId: number) =>
		api.get<HelpRequest[]>(
			`/api/v1/help-request/user/${userId}`
		),

	getByUserAndStatus: (userId: number, status: HelpRequestStatus) =>
		api.get<HelpRequest[]>(
			`/api/v1/help-request/user/${userId}/status/${status}`
		),
};
