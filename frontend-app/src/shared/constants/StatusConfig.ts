export const STATUS_CONFIG = {
	CREATED: {
		status: 'CREATED',
		statusLabel: 'Поиск волонтёра',
		actions: {
			VOLUNTEER: [{ label: 'Откликнуться', primary: true }],
		},
	},

	IN_PROGRESS: {
		status: 'IN_PROGRESS',
		statusLabel: 'В процессе',
		actions: {
			RECIPIENT: [{ label: 'Связаться', primary: true }],
			VOLUNTEER: [
				{ label: 'Связаться', primary: true },
				{ label: 'Отменить' },
			],
		},
	},

	COMPLETED: {
		status: 'COMPLETED',
		statusLabel: 'Выполнено',
		actions: {
			RECIPIENT: [
				{ label: 'Повторить заказ', primary: true },
				{ label: 'Оставить отзыв' },
			],
			VOLUNTEER: [],
		},
	},

	CANCELLED: {
		status: 'COMPLETED',
		statusLabel: 'Отменено',
		actions: {
			RECIPIENT: [],
			VOLUNTEER: [],
		},
	},

	EXPIRED: {
		status: 'COMPLETED',
		statusLabel: 'Истекло',
		actions: {
			RECIPIENT: [],
			VOLUNTEER: [],
		},
	},
} as const;
