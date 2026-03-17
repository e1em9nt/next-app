import { useEffect } from 'react';
import { useRouter } from '@/pkg/libraries/locale';
import { useAuthStore } from '@/app/shared/store';

export const useRequireAuth = () => {
  const { currentUser, _hasHydrated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (_hasHydrated && !currentUser) {
      router.replace('/auth');
    }
  }, [currentUser, _hasHydrated, router]);

  return { isAuthenticated: !!currentUser, isLoading: !_hasHydrated };
};
