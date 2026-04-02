import { Languages } from 'lucide-react'
import { type FC } from 'react'

import { Button } from '@/pkg/theme/ui/button'

import { HeaderAuthButtonsComponent, LanguageDropdownComponent } from './elements'

// interface
interface IProps {}

// component
const HeaderComponent: FC<Readonly<IProps>> = () => {
  // return
  return (
    <header className='flex items-center justify-end-safe gap-7 px-5 py-4 shadow-sm sm:px-8 xl:px-10'>
      <LanguageDropdownComponent
        trigger={
          <Button variant='ghost' size='icon'>
            <Languages />
          </Button>
        }
      />
      <HeaderAuthButtonsComponent />
    </header>
  )
}

export default HeaderComponent
