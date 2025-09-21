import { create } from "zustand";

export type Portfolio = {
  id: string;
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
  school: string;
  gpa: number;
  major: string;
  university: string;
  photos: string[];
  skills?: string; // Change to optional
  reason?: string; // Change to optional
};

interface User {
  email: string;
  role: "student" | "teacher";
  name: string;
}

interface StoreState {
  user: User | null;
  portfolios: Portfolio[];
  login: (user: User) => void;
  logout: () => void;
  addPortfolio: (p: Portfolio) => void;
}

const useStore = create<StoreState>((set) => ({
  user: null,
  portfolios: [],
  login: (user) => set({ user }),
  logout: () => set({ user: null }),
  addPortfolio: (p) =>
    set((state) => ({ portfolios: [...state.portfolios, p] })),
}));

export default useStore;
