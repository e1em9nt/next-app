import bcrypt from 'bcryptjs'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// interface
interface IUser {
  id: string
  name: string
  email: string
}

interface IRegisteredUser extends IUser {
  hashedPassword: string
}

interface IAuthResult {
  success: boolean
  error?: string
}

interface IAuthState {
  users: IRegisteredUser[]
  currentUser: IUser | null
  token: string | null
  _hasHydrated: boolean
  setHasHydrated: (hasHydrated: boolean) => void
  register: (name: string, email: string, password: string) => Promise<IAuthResult>
  login: (email: string, password: string) => Promise<IAuthResult>
  logout: () => void
}

// constants
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7 // 7 days in seconds

// helper
function setCookie(value: string) {
  document.cookie = `auth-token=${value}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`
}

function removeCookie() {
  document.cookie = `auth-token=; path=/; max-age=0`
}

// store
export const useAuthStore = create<IAuthState>()(
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
        const existingUser = get().users.find((u) => u.email.toLowerCase() === email.toLowerCase())

        if (existingUser) {
          return { success: false, error: 'errors.emailExists' }
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser: IRegisteredUser = { id: crypto.randomUUID(), name, email, hashedPassword }

        const token = crypto.randomUUID()

        set((state) => ({
          users: [...state.users, newUser],
          currentUser: { id: newUser.id, name, email },
          token,
        }))

        setCookie(token)

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

        const token = crypto.randomUUID()

        set({
          currentUser: { id: user.id, name: user.name, email: user.email },
          token,
        })

        setCookie(token)

        return { success: true }
      },

      logout: () => {
        set({ currentUser: null, token: null })
        removeCookie()
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
