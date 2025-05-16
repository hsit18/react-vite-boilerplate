import { test, expect } from '@playwright/test';

test.describe('Payments Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/payments');
    await page.waitForSelector('table');
  });

  test('should load initial payments data', async ({ page }) => {
    await expect(page.locator('table')).toBeVisible();
    const tableRows = page.locator('tbody tr');
    await expect(tableRows).toHaveCount(10);
  });

  test('should handle pagination', async ({ page }) => {
    await expect(page.locator('table')).toBeVisible();
    const firstRowInitial = page.locator('tbody tr').first();
    const initialText = await firstRowInitial.textContent();
    const nextButton = page.getByRole('button', { name: /next/i });
    await nextButton.click();
    await page.waitForTimeout(2000);
    const firstRowNew = page.locator('tbody tr').first();
    const newText = await firstRowNew.textContent();
    expect(newText).not.toBe(initialText);
  });

  test('should show loading state', async ({ page }) => {
    await expect(page.locator('table')).toBeVisible();
    const loadingRows = page.locator('[data-testid="table-loading-row"]');
    await expect(loadingRows).toHaveCount(5);
  });

  test('should handle pagination controls', async ({ page }) => {
    await expect(page.locator('table')).toBeVisible();
    const tableRows = page.locator('tbody tr');
    await expect(tableRows).toHaveCount(10);

    const firstRowInitial = page.locator('tbody tr').first();
    const initialText = await firstRowInitial.textContent();
    console.log('After prev:3', initialText);
    const nextButton = page.getByRole('button', { name: /next/i });
    await nextButton.click();
    console.log('After prev2:', initialText);
    await expect(page.locator('tbody tr').first()).not.toHaveText(initialText as string, { timeout: 5000 });
    const firstRowNew = page.locator('tbody tr').first();
    const newText = await firstRowNew.textContent();
    console.log('After prev1:', initialText);
    expect(newText).not.toBe(initialText);
    const prevButton = page.getByRole('button', { name: /prev/i });
    await prevButton.click();
    console.log('After prev:', initialText);
    await expect(page.locator('tbody tr').first()).toHaveText(initialText as string, { timeout: 5000 });
    const finalRow = page.locator('tbody tr').first();
    const finalText = await finalRow.textContent();
    expect(finalText).toBe(initialText);
  });
}); 