export interface User {
  name: string
  email: string
}

export interface RegisteredUser extends User {
  hashedPassword: string
}

export interface AuthState {
  users: RegisteredUser[]
  currentUser: User | null
  token: string | null
  _hasHydrated: boolean
  setHasHydrated: (hasHydrated: boolean) => void
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
}
