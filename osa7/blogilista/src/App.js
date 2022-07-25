import { useEffect, useRef } from 'react'
import { Blog } from './components/Blog'
import { Notification } from './components/notifications'
import blogService from './services/blogs'
import { Togglable } from './components/togglable'
import { LoginForm } from './components/loginForm'
import { BlogForm } from './components/blogForm'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { logOut, storeUser } from './reducers/userReducer'
import Users from './components/users'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import UserView from './components/user'
import { Button } from 'react-bootstrap'

const App = () => {
    const dispatch = useDispatch()
    const blogFormRef = useRef()

    useEffect(() => {
        const loggedUserJson = window.localStorage.getItem('loggedUser')
        if (loggedUserJson) {
            dispatch(storeUser(JSON.parse(loggedUserJson)))
            blogService.setToken(JSON.parse(loggedUserJson).token)
        }
    }, [dispatch])

    useEffect(() => {
        dispatch(initializeBlogs())
    }, [dispatch])

    const user = useSelector((store) => store.user)

    const blogs = useSelector((store) => [...store.blogs])
    blogs.sort((a, b) => b.likes - a.likes)

    const toggleVisibility = () => {
        blogFormRef.current.toggleVisibility()
    }

    const handleLogout = () => {
        window.localStorage.removeItem('loggedUser')
        dispatch(logOut())
        dispatch(setNotification('loggedi outta here'))
    }

    const style = {
        border: 'solid',
        padding: 10,
        borderWidth: 1,
    }
    const padding = {
        padding: 5,
    }

    return (
        <div className="container">
            {user === null ? (
                <div>
                    <Notification />
                    <Togglable buttonLabel="login">
                        <LoginForm />
                    </Togglable>
                </div>
            ) : (
                <div>
                    <BrowserRouter>
                        <Link to="/" style={padding}>
                            Blogs
                        </Link>
                        <Link to="/users" style={padding}>
                            Users
                        </Link>
                        {user?.name ?? 'loading'} logged in
                        <Button
                            onClick={handleLogout}
                            name="logout"
                            style={padding}
                        >
                            logout
                        </Button>
                        <Notification />
                        <h2>Blogs</h2>
                        <Routes>
                            <Route
                                path="/"
                                element={
                                    <div>
                                        <Togglable
                                            buttonLabel="create blog"
                                            ref={blogFormRef}
                                        >
                                            <BlogForm
                                                setUnvisible={toggleVisibility}
                                            />
                                        </Togglable>
                                        <div>
                                            {blogs.map((blog) => (
                                                <div
                                                    key={blog.id}
                                                    style={style}
                                                >
                                                    <Link
                                                        to={`/blogs/${blog.id}`}
                                                    >
                                                        {blog.title}
                                                    </Link>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                }
                            />
                            <Route path="/users" element={<Users />} />
                            <Route path="/users/:id" element={<UserView />} />
                            <Route path="/blogs/:id" element={<Blog />} />
                        </Routes>
                    </BrowserRouter>
                </div>
            )}
        </div>
    )
}

export default App
