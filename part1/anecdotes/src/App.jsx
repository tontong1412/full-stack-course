import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const [vote, setVote] = useState([0,0,0,0,0,0,0,0])
  const [selected, setSelected] = useState(0)

  const handleRandom = () => {
    const min = 0
    const max = 7
    const randomNum = Math.floor(Math.random() * (max - min + 1)) + min
    setSelected(randomNum)
  }

  const handleVote = () => {
    const newVote = [...vote]
    newVote[selected] = vote[selected] + 1
    setVote(newVote)
  }

  const findMaxVote = () =>{
    const max = Math.max(...vote);
    const maxIndex = vote.indexOf(max);
    return maxIndex
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {vote[selected]} votes</p>
      <div>
        <button onClick={handleVote}>vote</button>
        <button onClick={handleRandom}>next anecdote</button>
      </div>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[findMaxVote()]}</p>
      <p>has {vote[findMaxVote()]} votes</p>
    </div>
  )
}

export default App