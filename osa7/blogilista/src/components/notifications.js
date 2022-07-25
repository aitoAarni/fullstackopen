import { Alert } from 'react-bootstrap'
import { useSelector } from 'react-redux'

const Notification = () => {
    const style = {
        border: 'solid',
        padding: 10,
        borderWidth: 1,
    }
    const notification = useSelector((a) => a.notification)
    if (!notification) return
    return <>{notification && <Alert>{notification}</Alert>}</>
}

export { Notification }
