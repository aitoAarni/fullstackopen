import { createSlice } from "@reduxjs/toolkit"
import services from '../services/anecdotes'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]




const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    addVote(state, action) {

      state = state.map(anecdote => anecdote.id === action.payload.id 
        ? action.payload : anecdote )
      return state
    },
    addAnecdotes(state, action) {
      return action.payload
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    }
  }
})

export const createAnecdote = (data) => {
  return async dispatch => {
    const newData = await services.postAnecdote(data)
    dispatch(appendAnecdote(newData))
  }
}

export const updateVotes = data => {
  return async dispatch => {
    const newData = await services.updateVotes(data)
    dispatch(addVote(newData))
  }
}

export const { addAnecdotes, appendAnecdote, addVote } = anecdoteSlice.actions
export default anecdoteSlice.reducer