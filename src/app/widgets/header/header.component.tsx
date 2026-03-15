import { Languages, LogIn, User } from 'lucide-react';

import { LanguageDropdown } from './elements';
import { buttonVariants, Button } from '@/app/shared/ui';

import { Link } from '@/pkg/libraries/locale';
import { cn } from '@/pkg/utils/cn';

export default function Header() {
  return (
    <header className="flex items-center justify-end-safe gap-7 px-5 sm:px-8 xl:px-10 py-4 shadow-sm">
      <LanguageDropdown
        trigger={
          <Button variant="ghost" size="icon">
            <Languages />
          </Button>
        }
      />
      <div className="flex items-center gap-3">
        <Link href="#" className={cn(buttonVariants({ variant: 'outline' }), 'border')}>
          <LogIn /> Sign Up
        </Link>
        <Link href="#" className={buttonVariants({ variant: 'default' })}>
          <User /> Log In
        </Link>
      </div>
    </header>
  );
}
