import Link from 'next/link';
import { buttonVariants, Button } from '@/pkg/theme/ui/button';
import { cn } from '@/pkg/theme/lib/utils';

interface ErrorFallbackProps {
  reset?: () => void;
}

export function ErrorFallback({ reset }: ErrorFallbackProps) {
  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center px-4 py-8 text-center">
      <h2 className="mb-6 text-5xl font-semibold">Something went wrong!</h2>
      <div className="flex gap-4">
        {reset && (
          <Button variant="default" className="w-28" onClick={reset}>
            Try again
          </Button>
        )}
        <Link href="/" className={cn(buttonVariants({ variant: 'outline' }), 'border-border w-28')}>
          Back to home
        </Link>
      </div>
    </div>
  );
}
