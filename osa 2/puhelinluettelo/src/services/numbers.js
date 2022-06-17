import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(baseUrl)
}

const create = (content) => {
    return axios.post(baseUrl, content)
}

const update = (id, content) => {
    return axios.put(`${baseUrl}/${id}`, content)
}

const remove = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}

export default { getAll, create, update, remove }