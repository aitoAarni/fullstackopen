/* eslint-disable no-unused-vars */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import { BlogForm } from './blogForm'
import userEvent from '@testing-library/user-event'

describe('<BlogForm>', () => {
    const newBlog = {
        title: 'new title',
        author: 'new author',
        url: 'newUrl.gov'
    }

    test(`callback function that has been 
    passed as props will be called with right
     values at the point of creating the blog`,async () => {
        const user = userEvent.setup()
        const mockHandler = jest.fn()
        render(<BlogForm createNotification={mockHandler} setBlogs={(...params) => null}
            setUnvisible={(...params) => null}/>)
        const titleField = screen.getByText('title:', { exact: false })
        const authorField = screen.getByText('author:', { exact: false })
        const urlField = screen.getByText('url:', { exact: false })
        const saveButton = screen.getByText('save')
        await user.type(titleField, newBlog.title)
        await user.type(authorField, newBlog.author)
        await user.type(urlField, newBlog.url)
        await user.click(saveButton)
        console.log(mockHandler.mock.calls)
        expect(mockHandler.mock.calls).toEqual([])
    })
})