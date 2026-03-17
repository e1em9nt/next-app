'use client';

import { LogIn, User } from 'lucide-react';
import { useAuthStore } from '@/app/shared/store';
import { Link, usePathname, useRouter } from '@/pkg/libraries/locale';
import { buttonVariants, Button } from '@/app/shared/ui/button';
import { cn } from '@/pkg/utils/cn';

export const HeaderAuthButtons = () => {
  const pathname = usePathname();
  const { currentUser, logout } = useAuthStore();
  const router = useRouter();

  const isRootPage = pathname === '/' || pathname.match(/^\/[a-z]{2}\/?$/);
  const isProductPage = pathname.includes('/products');

  function handleLogout() {
    logout();
    router.push('/');
  }

  if (isProductPage && currentUser) {
    return (
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2 text-sm">
          <User className="size-4" />
          <span>{currentUser.name}</span>
        </div>
        <Button variant="outline" onClick={handleLogout} className="px-4">
          Log out
        </Button>
      </div>
    );
  }

  if (isRootPage) {
    return (
      <div className="flex items-center gap-3">
        <Link
          href="/auth?tab=signup"
          className={cn(buttonVariants({ variant: 'outline' }), 'border w-22 sm:w-28')}
        >
          <LogIn /> Sign Up
        </Link>
        <Link href="/auth" className={cn(buttonVariants({ variant: 'default' }), 'w-22 sm:w-28')}>
          <User /> Log In
        </Link>
      </div>
    );
  }

  return null;
};
