import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'

const Anecdote = ({anecdote, handleVote}) => {
  return (
    <div >
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleVote}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () =>{
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()
  return (
    <div>
      {anecdotes.sort((a,b)=>b.votes-a.votes).map(anecdote =>
        <Anecdote key={anecdote.id} anecdote={anecdote} handleVote={() => dispatch(vote(anecdote.id))}/>
      )}
    </div>
    
  )
}
export default AnecdoteList   