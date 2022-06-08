import { useState } from 'react'

const randomNum = len => {
  return Math.floor(Math.random() * (len-1) )
}


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  const [popular, setPopular]= useState({maxVotes: 0, index : 0})
  const btnHandler = len => {
    const selected = randomNum(anecdotes.length)
    setSelected(selected)
  }

  const voteHandler = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
    if (votes[selected] > popular.maxVotes) {
      const popCopy = {...popular}
      popCopy.maxVotes = votes[selected]
      popCopy.index = selected
      setPopular(popCopy)
    }
    
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes.</p> 
      <button onClick={voteHandler}>vote</button>
      <button onClick={btnHandler}>next anecdote</button>
      <h1>Anecdote with the most votes</h1>
      <p>{anecdotes[popular.index]}</p>

    </div>
  )
}

export default App