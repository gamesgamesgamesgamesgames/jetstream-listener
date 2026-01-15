// Module imports
import { Jetstream } from '@skyware/jetstream'

// Local imports
import { handleGameCreate } from './helpers/handleGameCreate'
import { handleGameDelete } from './helpers/handleGameDelete'
import { handleGameUpdate } from './helpers/handleGameUpdate'
// import { handlePostCreate } from './helpers/handlePostCreate'

const jetstream = new Jetstream({
	wantedCollections: [
		/*'app.bsky.feed.post', */ 'games.gamesgamesgamesgames.*',
	],
})

// jetstream.onCreate('app.bsky.feed.post', handlePostCreate)
jetstream.onCreate('games.gamesgamesgamesgames.game', handleGameCreate)
jetstream.onDelete('games.gamesgamesgamesgames.game', handleGameDelete)
jetstream.onUpdate('games.gamesgamesgamesgames.game', handleGameUpdate)

jetstream.start()
