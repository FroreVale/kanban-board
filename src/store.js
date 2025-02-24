import { create } from "zustand";

export const useStore = create((set) => ({
    tasks: [{ title: "TestTask", state: "DONE" }],
}));