import { writable, Writable } from 'svelte/store';

interface WordSet {
  name: string;
  data: {
    set: number;
    words: { id: number; word: string; leadershipType: string; rank: number }[];
  }[];
}

// initialize the data structure
const initialData: WordSet[] = [];

// create the writable store and set the initial value to the empty data
export const wordSetStore: Writable<WordSet[]> = writable(initialData);

// load the word sets from a JSON file and set the value of the wordSetStore
