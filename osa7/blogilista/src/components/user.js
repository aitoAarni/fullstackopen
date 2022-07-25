import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getAll } from '../services/user'

const UserView = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        const promiseSender = async () => {
            const users = await getAll()
            setUsers(users)
            console.log('users', users)
        }
        promiseSender()
    }, [])
    const id = useParams().id

    const user = users.find((user) => user.id === id)
    if (!user) return null

    return (
        <div>
            <h1>{user.username}</h1>
            <h2>added blogs</h2>

            <ul>
                {user.blogs.map((blog) => (
                    <li key={blog.id}>{blog.title}</li>
                ))}
            </ul>
        </div>
    )
}

export default UserView
