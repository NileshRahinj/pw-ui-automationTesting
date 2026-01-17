import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';

test('OrangeHRM Dashboard Flow: ', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login();

  await expect(
    page.getByRole('heading', { name: 'Dashboard' })
  ).toBeVisible();
});
