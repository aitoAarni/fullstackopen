import { connect } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"


const AddAnecdote = (props) => {

    const createNewAnecdote = async event => {
        event.preventDefault()
        props.setNotification(`Anecdote: '${event.target.anecdote.value}' created.`)
        props.createAnecdote(event.target.anecdote.value)
        event.target.anecdote.value = ''
}
    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={createNewAnecdote}>
                <input name='anecdote' />
                <button type='submit'>save</button>
            </form>
        </div>
        
    )
}

export default connect(null, {setNotification, createAnecdote})(AddAnecdote)