import Image from 'next/image';
import { useTranslations } from 'next-intl';
import bgImage from '@/app/shared/assets/icon/main-bg.png';
import { buttonVariants } from '@/app/shared/ui';
import { Link } from '@/pkg/libraries/locale';

export default function HomePage() {
  const translations = useTranslations('HomePage');

  return (
    <main className="relative h-[calc(100vh-64px)] overflow-hidden px-5">
      <Image
        src={bgImage}
        alt="Minimalistic Background"
        fill
        placeholder="blur"
        className="-z-10 object-cover"
      />
      <div className="font-sans flex flex-col items-center justify-center gap-10 h-full">
        <div className="flex flex-col items-center justify-center gap-5">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-700">
            {translations('heading')}
          </h1>
          <p className="text-sm sm:text-base text-gray-700 sm:w-1/2 text-center">
            {translations('subheading')}
          </p>
        </div>
        <Link href="#" className={buttonVariants({ variant: 'default' })}>
          {translations('actions.viewProducts')}
        </Link>
      </div>
    </main>
  );
}
