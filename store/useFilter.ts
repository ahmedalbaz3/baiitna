// src/store/useFilterStore.ts
import { create } from "zustand";

interface FilterState {
  place: {
    name: string;
    nameAr: string;
    id: number;
  };
  setPlace: (val: { name: string; nameAr: string; id: number }) => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  place: { name: "Abu Dhabi", nameAr: "أبو ظبي", id: 1 }, // default value
  setPlace: (val) => set({ place: val }),
}));
