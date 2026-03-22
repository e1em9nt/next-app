'use client';

import { ErrorFallback } from './shared/ui/error-fallback';

export default function GlobalError() {
  return (
    <html lang="en">
      <body>
        <main>
          <ErrorFallback />
        </main>
      </body>
    </html>
  );
}
