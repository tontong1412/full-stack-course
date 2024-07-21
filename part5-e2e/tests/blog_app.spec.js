const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog, createUser } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await createUser(request, {
      name: 'Nonnadda Silamai',
      username: 'nsilamai',
      password: 'password'
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

    test('cannot see remove button for the other user\'s blogs', async ({ page, request }) => {
      await createUser(request, {
        name: 'other user',
        username: 'other',
        password: 'password'
      })
      await createBlog(page, 'test blog', 'author', 'url')
      await page.getByRole('button', { name: 'log out' }).click()
      await loginWith(page, 'other', 'password')
      await expect(page.locator('.blog')).toBeVisible()
      await expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible()
    })

  })

  test('blogs are arranged in the order according to likes', async ({ page }) => {
    await loginWith(page, 'nsilamai', 'password')
    await createBlog(page, 'first blog', 'author', 'url')
    await createBlog(page, 'second blog', 'author', 'url')
    await createBlog(page, 'third blog', 'author', 'url')

    const firstBlog = await page.getByText('first blog')
    await firstBlog.getByRole('button', { name: 'view' }).click()
    const firstBlogLikeButton = await firstBlog.getByRole('button', { name: 'like' })
    await expect(firstBlog.getByText('likes 0')).toBeVisible()

    await page.waitForTimeout(1000)

    const secondBlog = await page.getByText('second blog')
    await secondBlog.getByRole('button', { name: 'view' }).click()
    const secondBlogLikeButton = await secondBlog.getByRole('button', { name: 'like' })
    await secondBlogLikeButton.click()
    await expect(secondBlog.getByText('likes 1')).toBeVisible()
    await secondBlogLikeButton.click()
    await expect(secondBlog.getByText('likes 2')).toBeVisible()

    await page.waitForTimeout(1000)

    const thirdBlog = await page.getByText('third blog')
    await thirdBlog.getByRole('button', { name: 'view' }).click()
    const thirdBlogLikeButton = await thirdBlog.getByRole('button', { name: 'like' })
    await thirdBlogLikeButton.click()
    await expect(thirdBlog.getByText('likes 1')).toBeVisible()

    const blogs = await page.locator('.blog').all()
    expect(blogs[0]).toContainText('second blog')
    expect(blogs[1]).toContainText('third blog')
    expect(blogs[2]).toContainText('first blog')

  })

})
