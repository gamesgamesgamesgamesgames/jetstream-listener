// Module imports
import { type CommitCreateEvent } from '@skyware/jetstream'

// Local imports
import { generateLogMeta } from './generateLogMeta'
import { logger } from './logger'
import { supabase } from './supabase'
import { Main as gameLexicon } from '../lexicons/games/gamesgamesgamesgames/game'

export async function handleGameCreate(
	event: CommitCreateEvent<'games.gamesgamesgamesgames.game'>,
) {
	const { commit, did } = event
	const { collection, rev, rkey } = commit
	const record = commit.record as gameLexicon

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
				...record,
				indexedAt: new Date(),
				ownerDID: did,
				uri,
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
