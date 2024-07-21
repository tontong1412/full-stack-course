const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http:localhost:3002/api/testing/reset')
    await request.post('http://localhost:3002/api/users', {
      data: {
        name: 'Nonnadda Silamai',
        username: 'nsilamai',
        password: 'password'
      }
    })
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    const locator = await page.getByText('Log in to application')
    await expect(locator).toBeVisible()
    await expect(page.getByTestId('username')).toBeVisible()
    await expect(page.getByTestId('password')).toBeVisible()
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByTestId('username').fill('nsilamai')
      await page.getByTestId('password').fill('password')
      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByText('Nonnadda Silamai is logged in')).toBeVisible()
      await expect(page.getByText('blogs')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByTestId('username').fill('nsilamai')
      await page.getByTestId('password').fill('password1234')
      await page.getByRole('button', { name: 'login' }).click()

      const errorDiv = await page.locator('.error')
      await expect(errorDiv).toContainText('Wrong credentials')
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {

    })

    test('a new blog can be created', async ({ page }) => {
      // ...
    })
  })

})
