/** @type {import('./$types').EntryGenerator} */
import langSets from '../../../static/languages.json' 
export async function entries() {
  const langs = Object.keys(langSets)
  return langs.map(lang => ({slug: lang}))
}

export const prerender = true