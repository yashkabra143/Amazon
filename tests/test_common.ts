import { Page } from '@playwright/test';
import { config } from './config';

// Common function for login
export async function login(page: Page) {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto(config.BASE_URL);
  await page.getByRole('link', { name: 'Hello, sign in Account & Lists' }).click();
  await page.getByLabel('Email or mobile phone number').click();
  await page.getByLabel('Email or mobile phone number').fill(config.USERNAME);
  await page.getByLabel('Email or mobile phone number').press('Enter');
  await page.getByLabel('Password').fill(config.PASSWORD);
  await page.getByLabel('Password').press('Enter');

}
