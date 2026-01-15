export function generateLogMeta(meta: Record<string, unknown> = {}) {
	return {
		...meta,
		labels: {
			job: 'listener',
			...(meta.labels ?? {}),
		},
	}
}
