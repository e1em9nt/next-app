import { expect, test } from '@playwright/test'

test.describe('Product list page', () => {
  test.beforeEach(async ({ context }) => {
    // Seed localStorage with an authenticated user so useRequireAuth passes
    await context.addInitScript(() => {
      localStorage.setItem(
        'auth-store',
        JSON.stringify({
          state: {
            currentUser: { name: 'Test User', email: 'test@test.com' },
            token: 'test-token',
            users: [],
          },
          version: 0,
        }),
      )
    })
  })

  test('displays product cards with required elements', async ({ page }) => {
    await page.goto('/en/products')

    // Wait for at least one card to appear
    const cards = page.locator('[data-slot="card"]')

    await expect(cards).not.toHaveCount(0)
    await expect(cards.first()).toBeVisible()

    const firstCard = cards.first()

    await expect(firstCard.locator('img')).toBeVisible()
    await expect(firstCard.locator('h3')).toBeVisible()
    await expect(firstCard.getByText('$', { exact: false })).toBeVisible()
    await expect(firstCard.locator('[data-slot="badge"]')).toBeVisible()
    await expect(firstCard.locator('text=/Rating/')).toBeVisible()
    await expect(firstCard.locator('a, button').last()).toBeVisible()
  })
})
