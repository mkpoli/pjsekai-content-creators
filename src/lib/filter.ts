import { writable } from "svelte/store"
import type { Tag } from "./data"

export const tagFilters = writable<string[]>([])