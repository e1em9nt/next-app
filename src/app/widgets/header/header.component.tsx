import { Languages } from 'lucide-react'

import { Button } from '@/pkg/theme/ui/button'

import { HeaderAuthButtons, LanguageDropdown } from './elements'

export default function Header() {
  return (
    <header className='flex items-center justify-end-safe gap-7 px-5 py-4 shadow-sm sm:px-8 xl:px-10'>
      <LanguageDropdown
        trigger={
          <Button variant='ghost' size='icon'>
            <Languages />
          </Button>
        }
      />
      <HeaderAuthButtons />
    </header>
  )
}
