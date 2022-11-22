import { test, expect } from '@playwright/test';

test.describe('Transfer funds and make payments', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://zero.webappsecurity.com/');
        await page.click('#signin_button');
        await page.type('#user_login', 'username');
        await page.type('#user_password', 'password');
        await page.click('text=Sign In');

        await page.goto('http://zero.webappsecurity.com/bank/transfer-funds.html');
    });

    test('Transfer funds', async ({ page }) => {
        await page.selectOption('#tf_fromAccountId', '2');
        await page.selectOption('#tf_toAccountId', '3');
        await page.type('#tf_amount', '500');
        await page.type('#tf_description', 'Test message');
        await page.click('#btn_submit');

        const verifyMessage = await page.locator('h2.board-header');
        await expect(verifyMessage).toContainText('Verify'); 
        await page.click('#btn_submit');

        const successMessage = await page.locator('.alert-success');
        await expect(successMessage).toContainText('You successfully submitted your transaction.');
    })
});