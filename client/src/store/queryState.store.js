import { create } from "zustand";
import { persist } from 'zustand/middleware';

const stateStore = create(
  persist(
    (set) => ({
      enabled: false,
      setEnabled: (data) => set({ enabled: data })
    }),
    {
      name: 'query-toggle-storage'
    }
  )
)

export const useQueryState = () => {
  return {
    queryState: stateStore(state => state.enabled),
    setQueryState: stateStore(state => state.setEnabled),
    clearQueryState: stateStore(state => state.clearStorage)
  }
}
