'use client';

import { useAuthStore } from '@/app/shared/store';
import { useRouter } from '@/pkg/libraries/locale';
import { Button } from '@/app/shared/ui';
import { useTranslations } from 'next-intl';

export const ViewProductsButton = () => {
  const { currentUser } = useAuthStore();
  const router = useRouter();
  const translations = useTranslations('HomePage');

  const handleClick = () => {
    router.push(currentUser ? '/products' : '/auth');
  };

  return (
    <Button onClick={handleClick} className="w-30 sm:w-32 cursor-pointer">
      {translations('actions.viewProducts')}
    </Button>
  );
};
