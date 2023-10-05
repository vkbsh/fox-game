import { test, expect } from '@playwright/test';

const userName = 'John Doe';

const welcomePageUrl = 'http://127.0.0.1:3000';
const playPageUrl = 'http://127.0.0.1:3000/play';

test('Set a user name and play the game', async ({ page }) => {
  await page.goto(welcomePageUrl);

  const input = page.locator('[name=user-name]');
  await input.fill(userName);

  await page.keyboard.press('Enter');

  expect(await page.locator('h2').innerText()).toBe(`Hello ${userName}`);

  await page.getByText('Play').click();

  await page.waitForURL(playPageUrl);

  const winImage = page.getByAltText('win');
  const loseImage = page.getByAltText('lose');

  await expect(winImage).toHaveCount(1);
  await expect(loseImage).toHaveCount(8);

  await winImage.click();

  await expect(page.getByText('Score: 1')).toBeVisible();
});
