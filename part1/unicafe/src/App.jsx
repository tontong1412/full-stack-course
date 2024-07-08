import { useState } from 'react'

const Button = ({onClick, title}) => <button onClick={onClick}>{title}</button>

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={()=>setGood(good+1)} title='good'/>
      <Button onClick={()=>setNeutral(neutral+1)} title='nutral'/>
      <Button onClick={()=>setBad(bad+1)} title='bad'/>
      <h2>statistics</h2>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
    </div>
  )
}

export default App