import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('renders content', () => {
  const { container } = render(<BlogForm addBlog={() => {}}/>)

  const div = container.querySelector('.blog-form')

  expect(div).toHaveTextContent('title')
  expect(div).toHaveTextContent('author')
  expect(div).toHaveTextContent('url')
})

test('addBlog is called with with correct detail', async () => {
  const mockAddBlog = vi.fn()
  const { container } = render(<BlogForm addBlog={mockAddBlog}/>)

  const user = userEvent.setup()

  const titleInput = screen.getByPlaceholderText('Title of the blog')
  const urlInput = screen.getByPlaceholderText('Url of the blog')
  const authorInput = screen.getByPlaceholderText('Author of the blog')
  const button = screen.getByText('create')

  await user.type(titleInput, 'example title')
  await user.type(authorInput, 'example author')

  await user.type(urlInput, 'example url')

  await user.click(button)

  expect(mockAddBlog.mock.calls).toHaveLength(1)
  expect(mockAddBlog.mock.calls[0][0].title).toBe('example title')
  expect(mockAddBlog.mock.calls[0][0].author).toBe('example author')
  expect(mockAddBlog.mock.calls[0][0].url).toBe('example url')
})
