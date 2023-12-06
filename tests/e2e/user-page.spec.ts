import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
    await page.goto('/users');
    await expect(page.getByRole('row')).toHaveCount(51);

    // await page.getByRole('cell', { name: 'Name' }).click();
    // await page.getByRole('cell', { name: 'Phone Number' }).click();
    // await page.getByRole('cell', { name: '-027-047' }).click();
    // await page.getByRole('cell', { name: 'Athena_Jast45@hotmail.com' }).click();
    // await page.getByRole('cell', { name: 'Gender' }).click();
    // await page.getByRole('cell', { name: 'Valerie Hirthe' }).click();
    // await page.getByRole('cell', { name: 'Gender' }).click();
    // await page.getByRole('cell', { name: 'Brendan Gutmann' }).click();
    // await page.getByRole('cell', { name: 'Status' }).click();
    // await page.getByRole('row', { name: 'Valerie Hirthe 501-051-154' }).getByRole('cell').nth(4).click();
    // await page.getByRole('cell', { name: 'Status' }).click();
    // await page.getByRole('row', { name: 'Jessie Klein 501-084-965' }).getByRole('cell').nth(4).click();
});