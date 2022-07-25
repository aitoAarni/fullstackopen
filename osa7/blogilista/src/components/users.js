import { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { getAll } from '../services/user'

const Users = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        const promiseSender = async () => {
            const users = await getAll()
            setUsers(users)
        }
        promiseSender()
    }, [])

    return (
        <div>
            <h1>Users</h1>
            <Table striped>
                <thead>
                    <tr>
                        <th>user</th>
                        <th>
                            <b>blogs created</b>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <User key={user.id} user={user} />
                    ))}
                </tbody>
            </Table>
        </div>
    )
}

const User = ({ user }) => {
    return (
        <>
            <tr>
                <td>
                    <Link to={`/users/${user.id}`}>{user.username}</Link>
                </td>
                <td>{user.blogs.length}</td>
            </tr>
        </>
    )
}

export default Users
