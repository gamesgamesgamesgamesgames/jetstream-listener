export function handlePostCreate({ commit }) {
	if (commit.record.langs.includes('en')) {
		console.log(`---\n${commit.record.text}`)
	}
}
