import Link from 'next/link';
import { buttonVariants } from '@/app/shared/ui';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Not Found | Products',
  description: 'The page you are looking for is not found, we suggest you back to home.',
};

export default function NotFound() {
  return (
    <html lang="en">
      <body>
        <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center px-4 py-8 text-center">
          <h2 className="mb-6 text-5xl font-semibold">Whoops!</h2>
          <h3 className="mb-1.5 text-3xl font-semibold">Something went wrong</h3>
          <p className="text-muted-foreground mb-6 max-w-sm">
            The page you&apos;re looking for isn&apos;t found, we suggest you back to home.
          </p>
          <Link href="/" className={buttonVariants({ variant: 'default' })}>
            Back to home
          </Link>
        </div>
      </body>
    </html>
  );
}
