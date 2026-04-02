export interface IUser {
  name: string
  email: string
}

export interface IRegisteredUser extends IUser {
  hashedPassword: string
}

export interface IAuthState {
  users: IRegisteredUser[]
  currentUser: IUser | null
  token: string | null
  _hasHydrated: boolean
  setHasHydrated: (hasHydrated: boolean) => void
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
}
