import { Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { addComment, deleteBlog, editLikes } from '../reducers/blogReducer'

const Blog = () => {
    const id = useParams().id

    const blog = useSelector((store) =>
        store.blogs.find((blog) => blog.id === id)
    )

    const user = useSelector((store) => store.user)

    const dispatch = useDispatch()

    const removeBlog = (blog) => {
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
            dispatch(deleteBlog(blog))
        }
    }

    const postComment = (event) => {
        event.preventDefault()
        dispatch(addComment(event.target.commentInput.value, id))
        event.target.commentInput.value = ''
    }

    if (!blog) return

    return (
        <div className="blog">
            <h1>
                {blog.title} {blog.author}
            </h1>
            <div>
                <p>
                    <a href={blog.url}>{blog.url}</a>
                    <br />
                    likes: {blog.likes}{' '}
                    <Button
                        className="like-button"
                        onClick={() => {
                            dispatch(editLikes(blog))
                        }}
                    >
                        like
                    </Button>
                    <br />
                    added by {blog.user.name}
                </p>
                {blog.user.name === user.name ? (
                    <Button
                        onClick={() => {
                            removeBlog(blog)
                        }}
                    >
                        remove
                    </Button>
                ) : null}
                <h3>comments</h3>
                <ul>
                    {blog.comments
                        ? blog.comments.map((comment) => (
                              <li key={comment}>{comment}</li>
                          ))
                        : null}
                </ul>
                <Form onSubmit={postComment}>
                    <input type="text" name="commentInput"></input>
                    <Button type="submit">add comment</Button>
                </Form>
            </div>
        </div>
    )
}

export { Blog }
