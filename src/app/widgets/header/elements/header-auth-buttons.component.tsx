'use client';

import { LogIn, User } from 'lucide-react';
import { Link, usePathname } from '@/pkg/libraries/locale';
import { buttonVariants } from '@/app/shared/ui/button';
import { cn } from '@/pkg/utils/cn';

export const HeaderAuthButtons = () => {
  const pathname = usePathname();
  if (pathname.includes('/auth')) return null;

  return (
    <div className="flex items-center gap-3">
      <Link
        href="/auth?tab=signup"
        className={cn(buttonVariants({ variant: 'outline' }), 'border')}
      >
        <LogIn /> Sign Up
      </Link>
      <Link href="/auth" className={buttonVariants({ variant: 'default' })}>
        <User /> Log In
      </Link>
    </div>
  );
};
