// Module imports
import { type CommitCreateEvent } from '@skyware/jetstream'

// Local imports
import { logger } from './logger'
import { supabase } from './supabase'

export async function handleGameCreate(
	event: CommitCreateEvent<'games.gamesgamesgamesgames.game'>,
) {
	const { commit, did } = event
	const { collection, rkey } = commit
	const record = commit.record as {
		$type: 'games.gamesgamesgamesgames.game'
		name: string
		summary: string
		modes: Array<string>
		type: string
	}

	const uri = `at://${did}/${collection}/${rkey}`

	logger.log(
		'info',
		`Captured "${record.name}" (${uri}) from the Jetstream. Saving to database...`,
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
		logger.log(
			'error',
			`Failed to save "${record.name}" (${uri}) to the database.`,
		)
	} else {
		logger.log(
			'info',
			`Successfully saved "${record.name}" (${uri}) to the database.`,
		)
	}
}
