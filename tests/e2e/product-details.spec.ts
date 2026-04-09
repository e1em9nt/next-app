import { expect, test } from '@playwright/test'

test.describe('Product Navigation', () => {
  test.beforeEach(async ({ context }) => {
    // Seed localStorage with an authenticated user
    await context.addInitScript(() => {
      localStorage.setItem(
        'auth-store',
        JSON.stringify({
          state: {
            currentUser: { id: '1', name: 'Test User', email: 'test@test.com' },
            token: 'test-token',
            users: [],
          },
          version: 0,
        }),
      )
    })

    // Seed cookies with an authenticated user
    await context.addCookies([
      {
        name: 'auth-token',
        value: 'test-token',
        domain: 'localhost',
        path: '/',
        sameSite: 'Lax',
      },
    ])
  })

  test('should navigate from list to detailed product page', async ({ page }) => {
    await page.goto('/en/products')

    const firstCard = page.locator('[data-slot="card"]').first()
    await expect(firstCard).toBeVisible()

    const listTitle = await firstCard.locator('h4').textContent()
    const cleanTitle = listTitle?.trim()

    await firstCard.locator('img').click()
    await expect(page).toHaveURL(/\/products\/\d+/)

    const detailHeader = page.locator('h4')
    await expect(detailHeader).toBeVisible()
    await expect(detailHeader).toHaveText(cleanTitle!)
  })
})
