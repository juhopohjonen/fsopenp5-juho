import React from "react";
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import CreateNew from './CreateNew'

import likeBlog from './likefunction'
import { act } from "react-dom/test-utils";

test('renders a blog but no togglablecontent', () => {
    const blog = {
        author: 'pekka',
        url: 'timo',
        name: 'pekan logi',
        likes: 100
    }


    const container = render(<Blog blog={blog} likeFunction={likeBlog} />)

    let hasCaught = false

    try {
        const div = container.querySelect('.togglableContent')
    } catch (e) {
        hasCaught = true
    }

    expect(hasCaught).toBe(true)
})

test('clicking the button shows togglableContent', async () => {
    const blog = {
        author: 'pekka',
        url: 'timo',
        name: 'pekan logi',
        likes: 100
    }

    const userEx = {
        username: 'example'
    }

    const mockHandler = jest.fn()

    render(
        <Blog blog={blog} user={userEx} />
    )

    const user = userEvent.setup()
    const button = screen.getAllByText('view')[0]
    await button.click()



    const likestext = screen.getAllByText('likes')[0]
    expect(likestext).toBeDefined()
})

test('pressing like button twice calls event twice', async () => {
    const blog = {
        author: 'pekka',
        url: 'timo',
        name: 'pekan logi',
        likes: 100
    }

    const userEx = {
        username: 'example'
    }

    const mockHandler = jest.fn()

    const blogObject = render(
        <Blog blog={blog} user={userEx} likeFunction={mockHandler} />
    )

    const viewButton = screen.getByText('view')
    console.log('viewButton is', viewButton)
    await viewButton.click()


    const likeButton = screen.getByText('like')

    const user = userEvent.setup()

    
    await user.click(likeButton)
    await user.click(likeButton)




    console.log('mockhandler is', mockHandler.mock)

    expect(mockHandler.mock.calls).toHaveLength(2)

})


test('make sure that form calls callback func with right info', async () => {
    const mockHandler = jest.fn()

    const blogObject = render(
        <CreateNew setBlogs={() => none} blogs={[]} createBlogFunc={mockHandler} />
    )

    const newButton = screen.getByText('new note')
    await newButton.click()

    const inputs = screen.getAllByRole('textbox')
  
    const user = userEvent.setup()

    await user.type(inputs[0], 'titleHere')
    await user.type(inputs[1], 'authorHere')
    await user.type(inputs[2], 'urlHere')

    const expectedObject = {
        title: 'titleHere',
        author: 'authorHere',
        url: 'urlHere'
    }

    const createButton = screen.getByText('create')
    await createButton.click()

    const funcCall = mockHandler.mock.calls[0]

    expect(funcCall[0]).toEqual(expectedObject)

    
})