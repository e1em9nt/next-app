'use client'

import { useParams } from 'next/navigation'
import { type FC, type ReactNode, useState } from 'react'

import { usePathname, useRouter } from '@/pkg/locale'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/pkg/theme/ui/dropdown-menu'

// interface
interface IProps {
  trigger: ReactNode
  defaultOpen?: boolean
  align?: 'start' | 'center' | 'end'
}

// component
const LanguageDropdownComponent: FC<Readonly<IProps>> = (props: IProps) => {
  const { defaultOpen, align, trigger } = props

  const params = useParams()

  const pathname = usePathname()
  const router = useRouter()

  const [language, setLanguage] = useState(params.locale as string)

  const handleLanguageChange = (nextLocale: string) => {
    setLanguage(nextLocale)
    // @ts-expect-error -- useParams returns a generic object, but router.replace handles it correctly
    router.replace({ pathname, params }, { locale: nextLocale })
  }

  // return
  return (
    <DropdownMenu defaultOpen={defaultOpen}>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>

      <DropdownMenuContent className='w-25' align={align || 'end'}>
        <DropdownMenuRadioGroup value={language} onValueChange={handleLanguageChange}>
          <DropdownMenuRadioItem
            value='en'
            className='data-[state=checked]:bg-accent data-[state=checked]:text-accent-foreground pl-2 text-base [&>span]:hidden'
          >
            English
          </DropdownMenuRadioItem>

          <DropdownMenuRadioItem
            value='de'
            className='data-[state=checked]:bg-accent data-[state=checked]:text-accent-foreground pl-2 text-base [&>span]:hidden'
          >
            Deutsch
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default LanguageDropdownComponent
