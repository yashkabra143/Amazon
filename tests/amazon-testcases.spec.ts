import { test, expect } from '@playwright/test';
import { login } from './test_common';
import { config } from './config';

test('Go to Amazon.com, Validate Login, and Capture Screenshot on Failure', async ({context, browser, page }) => {
  try {
    // Step 1: Login to the page
    await login(page);

    // Step 2: Find the greeting text after login
    const signInText = await page.getByText('Hello, Yash');

    // Step 3: Expectation: Check if the greeting text is visible
    await expect(signInText).toBeVisible();
    await context.close();
    
  } catch (error) {
    // Capture a screenshot if the test fails
    await page.screenshot({ path: 'login_failure_screenshot.png' });
    throw error; // Re-throw the error after capturing the screenshot
  }
});

test('Search Functionality & Validate Search Result with Screenshot', async ({ page }) => {
  try {
    // Step 1: Navigate to the Amazon.in
    await page.goto('https://www.amazon.in/');

    // Step 2: Search for 'iphone 13'
    const searchField = await page.getByPlaceholder('Search Amazon.in');
    await searchField.click();
    await searchField.fill('iphone 13');
    const goBtn = await page.getByRole('button', { name: 'Go' });
    await goBtn.click();

    // Step 3: Expectation: Check if the text 'iphone 13' is visible on the page
    const typeText = await page.getByText('"iphone 13"', { exact: true });
    await expect(typeText).toBeVisible();

  } catch (error) {
    // Capture a screenshot if the test fails
    await page.screenshot({ path: 'search_failure_screenshot.png' });
    throw error; // Re-throw the error after capturing the screenshot
  }

});

test('Wishlist Functionality & Validate Product Wishlist', async ({ page }) => {
  try {
    // Step 1: Login to the page
    await login(page);

    // Step 2: Find the search field and input 'iphone 13'
    const searchField = await page.getByPlaceholder('Search Amazon.in');
    await searchField.fill('iphone 13');

    // Step 3: Click on the search field
    await searchField.click();

    // Step 4: Press 'Enter' to initiate the search
    await page.keyboard.press('Enter');

    // Step 5: Click on the first link in the search results
    const firstLink = await page.locator('._bXVsd_gridColumn_2Jfab > div > div > a').first();
    await firstLink.click();

    // Step 6: Scroll down using 'PageDown'
    await page.keyboard.press('ArrowDown');

    // Step 7: Click on 'Add to Wish List'
    const addToWishlistLink = await page.getByLabel('Add to Wish List');
    await addToWishlistLink.click();

    // Step 8: Click on 'View Your List' link
    const wishlistlbl = await page.getByText('One item added to');
    await expect(wishlistlbl).toBeVisible();
    const viewwishlistbtn = await page.getByRole('link', { name: 'View Your List' });

    // Step 9: Check if the desired product is visible in the wishlist
    const product = await page.getByText('Apple iPhone 13 (128GB) - (Product) RED');
    expect(product).toBeVisible();


  } catch (error) {
    // Capture a screenshot if the test fails
    await page.screenshot({ path: 'wishlist_failure_screenshot.png' });
    throw error; // Re-throw the error after capturing the screenshot
  }
});

test('Product Checkout', async ({ page }) => {
  // Step 1: Login to the page
  await login(page);

  // Step 2: Find the search field and input 'iphone 13'
  const searchField = await page.getByPlaceholder('Search Amazon.in');
  await searchField.fill('iphone 13');

  // Step 3: Click on the search field
  await searchField.click();

  // Step 4: Press 'Enter' to initiate the search
  await page.keyboard.press('Enter');

  // Step 5: Click on the first link in the search results
  const firstLink = await page.locator('._bXVsd_gridColumn_2Jfab > div > div > a').first();
  await firstLink.click();

  //Step 6: Click on Add to Cart Button

  const addtocartbtn = await page.getByRole('button', { name: 'Add to Cart' });
  await addtocartbtn.click();

  await expect(page.locator('#NATC_SMART_WAGON_CONF_MSG_SUCCESS').getByText('Added to Cart')).toBeVisible();

  //Step 7: Go to the Cart page and validate the product 
  const cartbtn = await page.locator('#sw-gtc').getByRole('link', { name: 'Go to Cart' });
  await cartbtn.click();

  const headingcart = await page.getByRole('heading', { name: 'Shopping Cart' });
  await expect(headingcart).toBeVisible();
  await expect(page.getByRole('link', { name: 'Apple iPhone 13 (128GB) - (Product) RED', exact: true })).toBeVisible();

  // Step 8: Proceed with checkout page and validate the checkout page and the product

  const checkoutbtn = await page.getByLabel('Proceed to Buy\n                    \n                    \n                \n                \n                    Buy Amazon items');
  await checkoutbtn.click();
  await expect(page.getByRole('heading', { name: 'Checkout' })).toBeVisible();
  await page.getByRole('button', { name: 'Submit' }).click();





});







