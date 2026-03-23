import { Languages } from 'lucide-react';

import { LanguageDropdown, HeaderAuthButtons } from './elements';
import { Button } from '@/pkg/theme/ui/button';

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
      <HeaderAuthButtons />
    </header>
  );
}
