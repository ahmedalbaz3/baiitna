import { create } from "zustand";
import { User } from "@/types/loginResponse";
import Cookies from "js-cookie";

interface userAuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | undefined;
}

type Action = {
  login: (userData: User) => void;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
};

const useUserAuth = create<userAuthState & Action>((set) => ({
  // 1. These must be key-value pairs inside the object
  user: null,
  isAuthenticated: false,
  token: Cookies.get("auth-token"),

  // 2. These are the functions (actions) inside the same object
  login: (userData: User) => {
    Cookies.set("auth-token", userData.token, {
      expires: 7,
      secure: true,
      sameSite: "strict",
    });

    set({ isAuthenticated: true, user: userData, token: userData.token });
  },

  logout: () => {
    Cookies.remove("auth-token");

    set({
      isAuthenticated: false,
      user: null,
      token: undefined,
    });
  },

  updateUser: (userData: Partial<User>) =>
    set((state) => ({
      user: state.user
        ? { ...state.user, ...userData }
        : ({ ...userData } as User),
    })),
}));

export default useUserAuth;
