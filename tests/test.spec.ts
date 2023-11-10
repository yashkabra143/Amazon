import { test, expect } from '@playwright/test';
import { login } from './test_common';
import { config } from './config';

test('sample', async ({page }) => {
    //await page.goto(config.BASE_URL);
    console.log(config.BASE_URL);
    console.log(config.USERNAME);    
    console.log(config.PASSWORD);
  });