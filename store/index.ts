import { create } from "zustand";

interface UserType {
  _id: string;
  name: string;
  clerkId: string;
  username: string;
  email: string;
  likedVids: string[];
  history: string[];
  subscriptions: string[];
  profile: string;
  privateChannel: string[];
  tier: string;
  publicChannel: string;
}

interface UserStore {
  user: UserType | null;
  setUser: (user: UserType) => void;
  resetUser: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user: UserType) => {
    set(() => ({ user: user }));
  },
  resetUser: () => {
    set(() => ({ user: null }));
  },
}));
