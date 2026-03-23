import bcrypt from 'bcryptjs'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { AuthState, RegisteredUser } from '../interfaces'

function generateToken(email: string): string {
  return btoa(`${email}:${Date.now()}:${Math.random()}`)
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      users: [],
      currentUser: null,
      token: null,
      _hasHydrated: false,

      setHasHydrated: (hasHydrated: boolean) => {
        set({ _hasHydrated: hasHydrated })
      },

      register: async (name, email, password) => {
        const existing = get().users.find((u) => u.email.toLowerCase() === email.toLowerCase())
        if (existing) {
          return { success: false, error: 'errors.emailExists' }
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser: RegisteredUser = { name, email, hashedPassword }

        set((state) => ({
          users: [...state.users, newUser],
          currentUser: { name, email },
          token: generateToken(email),
        }))

        return { success: true }
      },

      login: async (email, password) => {
        const user = get().users.find((u) => u.email.toLowerCase() === email.toLowerCase())
        if (!user) {
          return { success: false, error: 'errors.credentialsInvalid' }
        }

        const isMatch = await bcrypt.compare(password, user.hashedPassword)
        if (!isMatch) {
          return { success: false, error: 'errors.credentialsInvalid' }
        }

        set({
          currentUser: { name: user.name, email: user.email },
          token: generateToken(email),
        })

        return { success: true }
      },
      logout: () => {
        set({ currentUser: null, token: null })
      },
    }),
    {
      name: 'auth-store',
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setHasHydrated(true)
        }
      },
      partialize: (state) => ({
        users: state.users,
        currentUser: state.currentUser,
        token: state.token,
      }),
    },
  ),
)
