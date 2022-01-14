import React, { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  const random = Math.floor(Math.random() * anecdotes.length)
  const handleVote = () => {
    const copyVote = [...votes]
    copyVote[selected] += 1
    return setVotes(copyVote)
  }
  const maximum = Math.max(...votes)
  const max_index = votes.indexOf(maximum)

  return (
    <div>
      <Display text={"Anecdote of the day:"} anecdotes={anecdotes[selected]} votes={votes[selected]} />
      <button onClick={() => setSelected(random)}>Next Anecdote</button>
      <button onClick={handleVote}>Vote</button>

      <Display text={"Most popular anecdote: "} anecdotes={anecdotes[max_index]} votes={votes[max_index]} />
    </div>
  )
}

const Display = ({ text, anecdotes, votes }) => (
  <div>
    <h1>{text}</h1>
    {anecdotes} <br/>
    {votes}
  </div>
)




export default App