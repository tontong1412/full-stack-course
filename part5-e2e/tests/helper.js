const loginWith = async (page, username, password) => {
  await page.getByTestId('username').fill(username)
  await page.getByTestId('password').fill(password)
  await page.getByRole('button', { name: 'login' }).click()
}

const createBlog = async (page, title, author, url) => {
  await page.getByRole('button', { name: 'new blog' }).click()
  await page.getByPlaceholder('Title of the blog').fill(title)
  await page.getByPlaceholder('Author of the blog').fill(author)
  await page.getByPlaceholder('Url of the blog').fill(url)
  await page.getByRole('button', { name: 'create' }).click()
}

const createUser = async (request, { name, username, password }) => {
  await request.post('/api/users', {
    data: {
      name,
      username,
      password
    }
  })
}

export { loginWith, createBlog, createUser }