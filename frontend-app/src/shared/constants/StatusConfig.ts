export const STATUS_CONFIG = {
	CREATED: {
		statusLabel: 'Поиск волонтёра',
		actions: {
			VOLUNTEER: [
				{ label: 'Откликнуться', type: 'RESPOND', primary: true },
				{ label: 'Ознакомиться подробнее', type: 'DETAILS' },
			],
			RECIPIENT: [{ label: 'Отменить', type: 'CANCEL' }],
		},
	},

	IN_PROGRESS: {
		statusLabel: 'В процессе',
		actions: {
			VOLUNTEER: [
				{ label: 'Связаться', type: 'CONTACT', primary: true },
				{ label: 'Отменить', type: 'CANCEL' },
			],
			RECIPIENT: [
				{ label: 'Связаться', type: 'CONTACT', primary: true },
				{ label: 'Отменить', type: 'CANCEL' },
			],
		},
	},

	COMPLETED: {
		statusLabel: 'Выполнено',
		actions: {
			VOLUNTEER: [{ label: 'Оставить отзыв', type: 'RATE' }],
			RECIPIENT: [{ label: 'Оставить отзыв', type: 'RATE' }],
		},
	},

	CANCELLED: {
		status: 'CANCELLED',
		statusLabel: 'Отменено',
		actions: {
			RECIPIENT: [],
			VOLUNTEER: [],
		},
	},

	EXPIRED: {
		status: 'EXPIRED',
		statusLabel: 'Истекло',
		actions: {
			RECIPIENT: [],
			VOLUNTEER: [],
		},
	},
} as const;
