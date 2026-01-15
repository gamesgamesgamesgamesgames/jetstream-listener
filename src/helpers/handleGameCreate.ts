// Module imports
import { type CommitCreateEvent } from '@skyware/jetstream'

// Local imports
import { generateLogMeta } from './generateLogMeta'
import { logger } from './logger'
import { supabase } from './supabase'

export async function handleGameCreate(
	event: CommitCreateEvent<'games.gamesgamesgamesgames.game'>,
) {
	const { commit, did } = event
	const { collection, rev, rkey } = commit

	const uri = `at://${did}/${collection}/${rkey}`

	const logMeta = generateLogMeta({
		labels: {
			collection,
			did,
			rev,
			rkey,
			uri,
		},
	})

	logger.info(
		`Captured "${record.name}" (${uri}) from the Jetstream. Saving to database...`,
		logMeta,
	)

	const { error } = await supabase
		.from('Games')
		.upsert([
			{
				ownerDID: did,
				name: record.name,
				modes: record.modes,
				// genres,
				// playerPerspective,
				summary: record.summary,
				// theme,
				// parent,
				// relatedOrganizations,
				// releaseDates,
				type: record.type,
				uri,
				indexedAt: new Date(),
			},
		])
		.select()

	if (error) {
		logger.error(
			`Failed to save "${record.name}" (${uri}) to the database.`,
			logMeta,
		)
	} else {
		logger.info(
			`Successfully saved "${record.name}" (${uri}) to the database.`,
			logMeta,
		)
	}
}
