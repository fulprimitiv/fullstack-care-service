export const STATUS_CONFIG = {
	CREATED: {
		statusLabel: 'Поиск волонтёра',
		actions: {
			VOLUNTEER: [
				{ label: 'Подробнее', type: 'DETAILS', primary: true },
				{ label: 'Откликнуться', type: 'RESPOND' },
			],
			RECIPIENT: [{ label: 'Отменить', type: 'CANCEL' }],
		},
	},

	IN_PROGRESS: {
		statusLabel: 'В процессе',
		actions: {
			VOLUNTEER: [
				{ label: 'Подробнее', type: 'DETAILS', primary: true },
				{ label: 'Завершить', type: 'COMPLETE' },
				{ label: 'Отказаться', type: 'CANCEL', cancel: true },
			],
			RECIPIENT: [
				{ label: 'Подробнее', type: 'DETAILS', primary: true },
				{ label: 'Завершить', type: 'COMPLETE' },
				{ label: 'Отменить', type: 'CANCEL', cancel: true },
			],
		},
	},

	COMPLETED: {
		statusLabel: 'Выполнено',
		actions: {
			RECIPIENT: [],
			VOLUNTEER: [],
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
