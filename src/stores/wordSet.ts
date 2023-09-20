import { writable, type Writable } from 'svelte/store';

interface WordGroups {
  set: number;
  words: { id: number; word: string; leadershipType: string; rank: number | null }[];
}


// create the writable store and set the initial value to the empty data
export const wordGroupsStore: Writable<WordGroups[]> = writable();

// load the word sets from a JSON file and set the value of the wordSetGroups