import { test as base, expect } from '@playwright/test';
import { allure } from 'allure-playwright';

export const test = base.extend({});

test.beforeEach(async ({ page }, testInfo) => {
  await allure.step(`Starting test: ${testInfo.title}`, async () => {    
  });
});

test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== testInfo.expectedStatus) {
    const screenshot = await page.screenshot();

    await testInfo.attach('Failure Screenshot', {
      body: screenshot,
      contentType: 'image/png',
    });

    await allure.step('Attached failure screenshot', async () => {});
  }
});

export { expect };
