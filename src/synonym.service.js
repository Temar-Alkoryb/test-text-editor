export default function fetchSynonyms(word) {
	if (word) {
		return fetch(`https://api.datamuse.com/words?rel_syn=${word}`)
			.then(res => res.json())
	}
}