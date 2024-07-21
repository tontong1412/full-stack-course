const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Nonnadda Silamai',
        username: 'nsilamai',
        password: 'password'
      }
    })
    await page.goto('/')
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
      await createBlog(page, 'test blog', 'author', 'url')

      await expect(page.locator('.info')).toContainText('a new blog "test blog" added')
      await expect(page.getByText('create new')).not.toBeVisible()
      await expect(page.locator('.blog')).toContainText('test blog author')

    })

    test('blogs can be liked', async ({ page }) => {
      await createBlog(page, 'test blog', 'author', 'url')

      await page.getByRole('button', { name: 'view' }).click()
      await page.getByRole('button', { name: 'like' }).click()
      await expect(page.getByText('likes 1')).toBeVisible()
    })

    test('can delete own created blog', async ({ page }) => {
      await createBlog(page, 'test blog', 'author', 'url')
      await page.getByRole('button', { name: 'view' }).click()
      page.on('dialog', dialog => dialog.accept());
      await page.getByRole('button', { name: 'remove' }).click()
      await expect(page.locator('.blog')).not.toBeVisible()
    })

  })

})
