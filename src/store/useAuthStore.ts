import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
    id: string;
    email: string;
    name: string;
    // Add other user fields as needed
}

interface AuthStore {
    token: string | null;
    user: User | null;
    isAuthenticated: boolean;
    setAuth: (token: string, user: User) => void;
    setToken: (token: string) => void;
    setUser: (user: User) => void;
    clearAuth: () => void;
    updateUser: (userData: Partial<User>) => void;
}

export const useAuthStore = create<AuthStore>()(
    persist(
        (set, get) => ({
            // Initial state
            token: null,
            user: null,
            isAuthenticated: false,

            // Set both token and user (typically after login)
            setAuth: (token: string, user: User) =>
                set({
                    token,
                    user,
                    isAuthenticated: true
                }),

            // Set token only
            setToken: (token: string) =>
                set({
                    token,
                    isAuthenticated: !!token
                }),

            // Set user only
            setUser: (user: User) =>
                set({ user }),

            // Clear all auth data (logout)
            clearAuth: () =>
                set({
                    token: null,
                    user: null,
                    isAuthenticated: false
                }),

            // Update user data partially
            updateUser: (userData: Partial<User>) =>
                set((state) => ({
                    user: state.user ? { ...state.user, ...userData } : null
                })),
        }),
        {
            name: "auth-storage",
            // Optional: version for migration if schema changes
            version: 1,
        }
    )
);

