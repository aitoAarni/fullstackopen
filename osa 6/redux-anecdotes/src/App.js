import Anecdotes from "./components/AnecdoteList"
import AddAnecdote from "./components/AnecdoteForm"
import Notification from "./components/Notification"
import Filter from "./components/filter"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import anecdoteServices from './services/anecdotes'
import { addAnecdotes } from "./reducers/anecdoteReducer"


const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    anecdoteServices.getAll()
    .then(anecdotes => dispatch(addAnecdotes(anecdotes)))
  }, [dispatch])
  return (
    <div>
      <Notification />
      <h1>Anecdotes</h1>
      <Filter />
      <Anecdotes />
      <AddAnecdote />
    </div>
  )
}

export default App