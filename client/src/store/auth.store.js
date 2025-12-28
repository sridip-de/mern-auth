import { create } from "zustand";

export const useAuthStore = create((set)=> ({
  isAuthenticated: false,

  setAuthenticated: (data) => set({isAuthenticated:data})
}))