'use client';

import { useTransition } from 'react';
import { useAuthStore } from '@/app/shared/store';
import { useRouter } from '@/pkg/locale';
import { Button } from '@/app/shared/ui';
import { useTranslations } from 'next-intl';

export const ViewProductsButton = () => {
  const { currentUser } = useAuthStore();
  const router = useRouter();
  const translations = useTranslations('HomePage');
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(() => {
      router.push(currentUser ? '/products' : '/auth');
    });
  };

  return (
    <Button
      onClick={handleClick}
      disabled={isPending}
      className={`w-30 sm:w-32 cursor-pointer ${isPending ? 'cursor-not-allowed' : ''}`}
    >
      {isPending
        ? translations('actions.pendingViewProducts')
        : translations('actions.viewProducts')}
    </Button>
  );
};
