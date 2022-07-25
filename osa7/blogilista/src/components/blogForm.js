import { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { addBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const BlogForm = ({ setUnvisible }) => {
    const [newBlog, setNewBlog] = useState({
        title: '',
        author: '',
        url: '',
        likes: 0,
    })
    const dispatch = useDispatch()
    const addNewBlog = (event) => {
        event.preventDefault()
        dispatch(addBlog({ ...newBlog, comments: [] }))

        setUnvisible()
        dispatch(
            setNotification(
                `new blogger: ${newBlog.title}  by  ${newBlog.author}`
            )
        )
        setNewBlog({ title: '', author: '', url: '', likes: 0 })
    }

    return (
        <div>
            <h2>blogs</h2>
            <br />

            <Form onSubmit={addNewBlog}>
                <div>
                    title:
                    <input
                        id="title"
                        value={newBlog.title}
                        onChange={({ target }) =>
                            setNewBlog({ ...newBlog, title: target.value })
                        }
                    />
                    <br />
                </div>
                <div>
                    author:
                    <input
                        id="author"
                        value={newBlog.author}
                        onChange={({ target }) =>
                            setNewBlog({ ...newBlog, author: target.value })
                        }
                    />
                    <br />
                </div>
                <div>
                    url:
                    <input
                        id="url"
                        value={newBlog.url}
                        onChange={({ target }) =>
                            setNewBlog({ ...newBlog, url: target.value })
                        }
                    />
                    <br />
                </div>

                <Button id="create-blog" type="submit">
                    save
                </Button>
            </Form>
        </div>
    )
}

export { BlogForm }
