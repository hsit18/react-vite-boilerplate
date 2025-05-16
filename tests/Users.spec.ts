import { test, expect } from '@playwright/test';

test.describe('Users Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/users');
    // Wait for the table to be visible
    await page.waitForSelector('.table-wrp');
  });

  test('should load initial users data', async ({ page }) => {
    // Wait for the table to be visible and data to load
    await expect(page.locator('.table-wrp')).toBeVisible();
    
    // Check if data is loaded
    const tableRows = page.locator('tbody tr');
    await expect(tableRows).toHaveCount(50); // PAGE_SIZE is 50
  });

  test('should load more data on scroll', async ({ page }) => {
    // Wait for initial data to load
    await expect(page.locator('.table-wrp')).toBeVisible();
    
    // Get initial row count
    const initialRows = page.locator('tbody tr');
    await expect(initialRows).toHaveCount(50);

    // Scroll to bottom
    await page.evaluate(() => {
      const container = document.querySelector('.table-wrp');
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    });

    // Wait for more data to load
    await page.waitForTimeout(2000); // Increased timeout for fetch to complete

    // Check if more rows were loaded
    const newRows = page.locator('tbody tr');
    const count = await newRows.count();
    expect(count).toBeGreaterThan(50);
  });

  test('should show loading state', async ({ page }) => {
    // Wait for initial loading state
    await expect(page.locator('.table-wrp')).toBeVisible();
    
    // Check if loading indicator is present and has correct number of rows
    const loadingRows = page.locator('[data-testid="table-loading-row"]');
    await expect(loadingRows).toHaveCount(5); // Matches totalRows prop in DataTableLoading
  });
}); 