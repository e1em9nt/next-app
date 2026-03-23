import { useEffect } from 'react'

import { useAuthStore } from '@/app/shared/store'
import { useRouter } from '@/pkg/locale'

export const useRequireAuth = () => {
  const { currentUser, _hasHydrated } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    if (_hasHydrated && !currentUser) {
      router.replace('/auth')
    }
  }, [currentUser, _hasHydrated, router])

  return { isAuthenticated: !!currentUser, isLoading: !_hasHydrated }
}
