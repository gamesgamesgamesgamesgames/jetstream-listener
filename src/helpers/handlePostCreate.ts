import { type CommitCreateEvent } from '@skyware/jetstream'

export function handlePostCreate(
	event: CommitCreateEvent<'app.bsky.feed.post'>,
) {
	const { commit } = event

	if (commit.record.langs?.includes('en')) {
		console.log(`---\n${commit.record.text}`)
	}
}
