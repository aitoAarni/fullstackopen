import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import { Blog } from './Blog'
import userEvent from '@testing-library/user-event'

describe('<Blog />', () => {
    let container
    const mockHandler = jest.fn()
    const blog = {
        title: 'Test title',
        author: 'Pekka',
        likes: 1,
        url: 'notvisible.gov',
        user: { name: 'pade' }
    }
    beforeEach(() => {
        console.log('jihuuu löytyi')
        container = render(
            <Blog blog={blog} updatedLikes={mockHandler}
                user={{ name: 'pade' }} />)
    })

    test('Blog rendered correctly', async () => {
        container.getByText('Test title', { exact: false  })
        container.getByText('Pekka', { exact: false  })
        const rest = screen.queryByText('likes: ', { exact: false  })

        expect(rest).not.toBeVisible()
    })

    test('blog renders rest of blog when button is clicked', async () => {
        const user = userEvent.setup()
        const button = screen.getByText('show')
        await user.click(button)
        expect(screen.getByText('likes: ', { exact: false  })).toBeVisible()
    })

    test('2 presses to like button makes 2 eventhandler calls', async () => {
        const user = userEvent.setup()
        const button = screen.getByText('show')
        await user.click(button)
        const likeButton = screen.getByText('like')
        await user.click(likeButton)
        await user.click(likeButton)
        expect(mockHandler.mock.calls).toHaveLength(2)
    })
})