import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the Home page heading', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /home page/i })).toBeVisible();
  });

  test('should display Users and Payments buttons', async ({ page }) => {
    await expect(page.getByRole('button', { name: /users/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /payments/i })).toBeVisible();
  });

  test('should navigate to Users page when Users button is clicked', async ({ page }) => {
    await page.getByRole('button', { name: /users/i }).click();
    await expect(page).toHaveURL(/\/users/);
    // Optionally, check for Users page content
    await expect(page.locator('.table-wrp')).toBeVisible();
  });

  test('should navigate to Payments page when Payments button is clicked', async ({ page }) => {
    await page.getByRole('button', { name: /payments/i }).click();
    await expect(page).toHaveURL(/\/payments/);
    // Optionally, check for Payments page content
    await expect(page.locator('table')).toBeVisible();
  });
}); 