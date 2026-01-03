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
			RECIPIENT: [{ label: 'Связаться', type: 'CONTACT', primary: true }],
		},
	},

	COMPLETED: {
		statusLabel: 'Выполнено',
		actions: {
			VOLUNTEER: [],
			RECIPIENT: [
				{ label: 'Повторить заказ', type: 'REPEAT', primary: true },
				{ label: 'Оставить отзыв', type: 'RATE' },
			],
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
