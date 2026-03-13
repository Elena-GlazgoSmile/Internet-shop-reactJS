import { test, expect } from '@playwright/test';

test('Есть заголовок', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await expect(page).toHaveTitle(/Ништяки/);
});

test('Можно добавить товар в корзину', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.locator('.product-card').first().click();
  await expect(page.locator('.product-title')).toBeVisible();
  await page.locator('.add-to-cart-large').click();
  await page.locator('text=Корзина').click();
  await expect(page.locator('.cart-item')).toBeVisible();
});

test('Корзина показывает правильное количество товаров', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.locator('.product-card').first().click();
  await page.locator('.add-to-cart-large').click();
  await page.goBack();
  await page.locator('.product-card').nth(1).click();
  await page.locator('.add-to-cart-large').click();
  await page.locator('text=Корзина').click();
  await expect(page.locator('.cart-item')).toHaveCount(2);
});

test('Можно удалить товар из корзины', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.locator('.product-card').first().click();
  await page.locator('.add-to-cart-large').click();
  await page.locator('text=Корзина').click();
  await page.locator('.cart-item-remove').first().click();
  await expect(page.locator('.cart-item')).toHaveCount(0);
});

test('Работает переключение категорий', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.locator('.category-link').nth(1).click();
  await expect(page).toHaveURL(/\/category\/\d+/);
  await expect(page.locator('.product-card').first()).toBeVisible({ timeout: 10000 });
});

test('Поиск работает', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.locator('.search-toggle').click();
  await expect(page.locator('.search-input')).toBeVisible();
  await page.locator('.search-input').fill('кружка');
  await page.locator('.search-submit').click();
  const currentUrl = decodeURIComponent(page.url());
  expect(currentUrl).toContain('/search?q=кружка');
  await expect(page.locator('.product-card').first()).toBeVisible({ timeout: 10000 });
  const resultsCount = page.locator('.results-count, .search-results-count');
  if (await resultsCount.isVisible()) {
    await expect(resultsCount).toContainText(/найдено/i);
  }
});

test('Избранное работает', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.locator('.product-card').first().hover();
  await page.locator('.favorite-button').first().click();
  await page.locator('text=Избранное').click();
  await expect(page).toHaveURL('/favorites');
});

test('Админка доступна', async ({ page }) => {
  await page.goto('http://localhost:3000/admin/products');
  await expect(page.locator('h1')).toContainText('Управление товарами');
});