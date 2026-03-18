import { test, expect } from '@playwright/test';

test.describe('Product Navigation', () => {
  test.beforeEach(async ({ context }) => {
    await context.addInitScript(() => {
      localStorage.setItem(
        'auth-store', JSON.stringify({
          state: { currentUser: { name: 'Test User' }, token: 'test-token' },
          version: 0,
        }),
      );
    });
  });

  test('should navigate from list to detailed product page', async ({ page }) => {
    await page.goto('/en/products');

    const firstCard = page.locator('[data-slot="card"]').first();
    await expect(firstCard).toBeVisible();

    const listTitle = await firstCard.locator('h3').textContent();
    const cleanTitle = listTitle?.trim();

    await firstCard.locator('img').click();
    await expect(page).toHaveURL(/\/en\/products\/\d+/);

    const detailHeader = page.locator('h3');
    await expect(detailHeader).toBeVisible();
    await expect(detailHeader).toHaveText(cleanTitle!);
  });
});
