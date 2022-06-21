import { writable } from "svelte/store"

const createCount = () => {
  const { subscribe, set, update } = writable(0)

  return {
    subscribe,
    add: () => update((n) => n + 1),
    remove: () => update((n) => n - 1),
    reset: () => set(0),
  }
}

export const count = createCount()
