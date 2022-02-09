import { writable } from "svelte/store"

export const tagFilters = writable<string[]>([])