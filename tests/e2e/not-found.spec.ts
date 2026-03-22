import { test, expect } from '@playwright/test';

test.describe('Error Handling', () => {
  test('should display 404 page for invalid routes', async ({ page }) => {
    await page.goto('/en/this-page-does-not-exist');

    const heading = page.locator('h2');
    await expect(heading).toContainText('Whoops!');

    await expect(page.getByText(/something went wrong/i)).toBeVisible();

    const homeButton = page.getByRole('link', { name: /back to home/i });
    await expect(homeButton).toBeVisible();
    await homeButton.click();
    await page.waitForURL(/\/en$/, { timeout: 10000 });
    await expect(page).toHaveURL(/\/en$/);
  });
});
