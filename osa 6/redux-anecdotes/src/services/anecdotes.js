import axios from 'axios'
const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const postAnecdote = async (anecdote) => {
    const data = { content: anecdote, votes: 0 }
    const response = await axios.post(baseUrl, data)
    return response.data
}

const updateVotes = async (anecdote) => {
    const data = { ...anecdote, votes: anecdote.votes + 1 }
    const response = await axios.put(`${baseUrl}/${data.id}`, data)
    return response.data
    
}

export default { getAll, postAnecdote, updateVotes }