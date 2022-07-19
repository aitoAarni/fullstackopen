import { useDispatch, useSelector } from "react-redux/es/exports"
import { updateVotes } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"


const Anecdote = ({anecdote}) => {
    const dispatch = useDispatch()
    const onVote = () => {
        dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
        dispatch(updateVotes(anecdote))

    }

    return (
    <div>
        <div>
            {anecdote.content}
        </div>
        <div>
            has {anecdote.votes}
            <button onClick={onVote}>
                vote
            </button>
        </div>
        </div>)
}

const Anecdotes = () => {
    const filter = useSelector(a => a.filter).toLowerCase()
    const anecdotes = useSelector(a => a.anecdotes.filter(anecdote => 
        anecdote.content.toLowerCase().includes(filter)))
        .sort((a,b) => b.votes-a.votes)

    return (
        <div>
            {anecdotes.map(anecdote =>
                <Anecdote key={anecdote.id} anecdote={anecdote} />)}
        </div>
    )
}


export default Anecdotes