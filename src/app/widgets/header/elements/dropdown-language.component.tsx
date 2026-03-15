'use client';

import { useState, type ReactNode } from 'react';
import { usePathname, useRouter } from '@/pkg/libraries/locale';
import { useParams } from 'next/navigation';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/app/shared/ui';

type Props = {
  trigger: ReactNode;
  defaultOpen?: boolean;
  align?: 'start' | 'center' | 'end';
};

const LanguageDropdown = ({ defaultOpen, align, trigger }: Props) => {
  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();

  const [language, setLanguage] = useState(params.locale as string);

  const handleLanguageChange = (nextLocale: string) => {
    setLanguage(nextLocale);
    // @ts-expect-error -- useParams returns a generic object, but router.replace handles it correctly
    router.replace({ pathname, params }, { locale: nextLocale });
  };

  return (
    <DropdownMenu defaultOpen={defaultOpen}>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-25" align={align || 'end'}>
        <DropdownMenuRadioGroup value={language} onValueChange={handleLanguageChange}>
          <DropdownMenuRadioItem
            value="en"
            className="data-[state=checked]:bg-accent data-[state=checked]:text-accent-foreground pl-2 text-base [&>span]:hidden"
          >
            English
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            value="de"
            className="data-[state=checked]:bg-accent data-[state=checked]:text-accent-foreground pl-2 text-base [&>span]:hidden"
          >
            Deutsch
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { LanguageDropdown };
