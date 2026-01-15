// Module imports
import LokiTransport from 'winston-loki'
import winston from 'winston'

// Constants
const formatters = [winston.format.timestamp(), winston.format.json()]

// eslint-disable-next-line no-extra-boolean-cast
if (Boolean(process.env.PRETTY_LOGS)) {
	formatters.push(winston.format.prettyPrint({ colorize: true }))
}

export function createLogger(origin: string) {
	const transports = [
		new winston.transports.Console({
			format: winston.format.combine(...formatters),
		}),
	]

	if (process.env.GRAFANA_HOST) {
		// @ts-ignore
		transports.push(
			// @ts-expect-error This works fine, but the types are angry. 🤷
			new LokiTransport({
				basicAuth: `${process.env.GRAFANA_USERNAME}:${process.env.GRAFANA_PASSWORD}`,
				format: winston.format.combine(...formatters),
				host: process.env.GRAFANA_HOST,
			}),
		)
	}

	return winston.createLogger({
		defaultMeta: {
			labels: {
				job: origin,
			},
		},
		level: process.env.LOG_LEVEL ?? 'info',
		transports,
	})
}
