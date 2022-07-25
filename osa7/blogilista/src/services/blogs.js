import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
    token = `bearer ${newToken}`
    console.log(token)
}

const getAll = async () => {
    const request = axios.get(baseUrl)
    const response = await request
    return response.data
}

const postBlog = async (content) => {
    const config = {
        headers: { Authorization: token },
    }
    const request = axios.post(baseUrl, content, config)
    const response = await request
    return response.data
}

const updateLikes = async (blog) => {
    const config = {
        headers: { Authorization: token },
    }

    const request = await axios.put(baseUrl + `/${blog.id}`, blog, config)
    return request.data
}

const deleteBlog = async (blog) => {
    const config = {
        headers: { Authorization: token },
    }
    await axios.delete(baseUrl + `/${blog.id}`, config)
}

const addComment = async (comment, id) => {
    console.log('creating post request')
    const config = {
        headers: { Authorization: token },
    }
    await axios.post(`${baseUrl}/${id}/comments`, comment, config)
}

export default {
    getAll,
    postBlog,
    updateLikes,
    deleteBlog,
    setToken,
    addComment,
}
