import { create } from "zustand";

const stateStore = create((set) => ({
  enabled: false,

  setEnabled: (data) => set({ enabled: data })
}))

export const useQueryState = () => {
  return {
    queryState: stateStore(state => state.enabled),
    setQueryState: stateStore(state => state.setEnabled)
  }
}
