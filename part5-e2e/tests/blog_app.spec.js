const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith } = require('./helper')

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
      await loginWith(page, 'nsilamai', 'password')
      await expect(page.getByText('Nonnadda Silamai is logged in')).toBeVisible()
      await expect(page.getByText('blogs')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'nsilamai', 'password1234')

      const errorDiv = await page.locator('.error')
      await expect(errorDiv).toContainText('Wrong credentials')
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'nsilamai', 'password')
    })

    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'new blog' }).click()
      await page.getByPlaceholder('Title of the blog').fill('test blog')
      await page.getByPlaceholder('Author of the blog').fill('author')
      await page.getByPlaceholder('Url of the blog').fill('url')
      await page.getByRole('button', { name: 'create' }).click()

      const infoDiv = await page.locator('.info')

      await expect(infoDiv).toContainText('a new blog "test blog" added')
      await expect(page.getByText('create new')).not.toBeVisible()
      await expect(page.locator('.blog')).toContainText('test blog author')

    })
  })

})
