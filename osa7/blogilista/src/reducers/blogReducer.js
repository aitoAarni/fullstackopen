import { createSlice } from '@reduxjs/toolkit'
import services from '../services/blogs'

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        addBlogs(state, action) {
            state = action.payload
            return state
        },
        appendBlog(state, action) {
            state.push(action.payload)
            return state
        },
        addLike(state, action) {
            state = state.map((blog) =>
                blog.id === action.payload.id
                    ? { ...blog, likes: action.payload.likes }
                    : blog
            )
            return state
        },
        filterBlogOut(state, action) {
            state = state.filter((blog) => blog.id !== action.payload.id)
            return state
        },
        appendComment(state, action) {
            const [comment, id] = action.payload
            console.log('id comment', id, comment)
            const blog = state.find((blog) => blog.id === id)
            if (!blog.comments) {
                blog.comments = []
            }
            blog.comments.push(comment)
            state = state.map((blg) => (blg.id === id ? blog : blg))
        },
    },
})

export const addBlog = (blog) => {
    return async (dispatch) => {
        const response = await services.postBlog(blog)
        dispatch(appendBlog(response))
    }
}

export const editLikes = (blog) => {
    return async (dispatch) => {
        const payload = await services.updateLikes({
            ...blog,
            likes: blog.likes + 1,
        })
        dispatch(addLike(payload))
    }
}

export const deleteBlog = (blog) => {
    return async (dispatch) => {
        await services.deleteBlog(blog)
        dispatch(filterBlogOut(blog))
    }
}

export const initializeBlogs = () => {
    return async (dispatch) => {
        const blogs = await services.getAll()
        dispatch(addBlogs(blogs))
    }
}

export const addComment = (comment, id) => {
    return async (dispatch) => {
        await services.addComment(comment, id)
        dispatch(appendComment([comment, id]))
    }
}

export const { addBlogs, appendBlog, addLike, filterBlogOut, appendComment } =
    blogSlice.actions
export default blogSlice.reducer
