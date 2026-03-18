'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/pkg/libraries/locale';
import { useAuthStore } from '@/app/shared/store';

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/app/shared/ui/tabs';
import { AuthCard } from '@/app/features/auth';
import authBackground from '@/app/shared/assets/icon/main-bg.png';

export function AuthPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab') ?? 'login';
  const translations = useTranslations('AuthPage.heading');
  const { currentUser, _hasHydrated } = useAuthStore();

  useEffect(() => {
    if (_hasHydrated && currentUser) {
      router.replace('/products');
    }
  }, [currentUser, _hasHydrated, router]);

  const handleTabChange = (value: string) => {
    router.replace(value === 'login' ? '/auth' : '/auth?tab=signup');
  };

  if (!_hasHydrated || currentUser) return null;

  return (
    <main className="px-2.5 sm:px-5 py-8 relative min-h-[calc(100vh-64px)]">
      <Image
        src={authBackground}
        alt="Auth Background"
        fill
        priority
        placeholder="blur"
        className="object-cover -z-10"
      />
      <Tabs
        defaultValue={tab}
        onValueChange={handleTabChange}
        className="flex flex-col gap-8 w-full max-w-md mx-auto"
      >
        <TabsList className="self-center space-x-4">
          <TabsTrigger value="login" className="w-22 sm:w-30 cursor-pointer">
            {translations('login')}
          </TabsTrigger>
          <TabsTrigger value="signup" className="w-22 sm:w-30 cursor-pointer">
            {translations('signup')}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <AuthCard variant="login" />
        </TabsContent>
        <TabsContent value="signup">
          <AuthCard variant="signup" />
        </TabsContent>
      </Tabs>
    </main>
  );
}
