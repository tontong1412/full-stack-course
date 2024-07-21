import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'title',
    author: 'author',
    url: 'url',
    likes: 5,
    user: {
      name: 'owner'
    },
  }

  const { container } = render(<Blog blog={blog} handleLike={() => {}} handleRemove={() => {}}/>)

  const div = container.querySelector('.blog')

  expect(div).toHaveTextContent(
    'title author'
  )
  expect(div).not.toHaveTextContent('likes 5')
  expect(div).not.toHaveTextContent('url')
})

test('click view button',async() => {
  const blog = {
    title: 'title',
    author: 'author',
    url: 'url',
    likes: 5,
    user: {
      name: 'owner'
    },
  }

  const { container } = render(<Blog blog={blog} handleLike={() => {}} handleRemove={() => {}} user={{ name:'owner' }}/>)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)
  const div = container.querySelector('.blog')

  expect(div).toHaveTextContent('likes 5')
  expect(div).toHaveTextContent('url')
})