// Module imports
import { algoliasearch } from 'algoliasearch'
import { createFetchRequester } from '@algolia/requester-fetch'

export const algolia = algoliasearch(
	process.env.ALGOLIA_APP_ID!,
	process.env.ALGOLIA_API_KEY!,
	{ requester: createFetchRequester() },
)
