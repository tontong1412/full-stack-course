import { useState } from 'react'

const Button = ({onClick, title}) => <button onClick={onClick}>{title}</button>

const StatisticLine = ({text, value}) => {
  return <tr>
      <td>{text}</td> 
      <td>{value}</td>
    </tr>
}

const Statistics = ({good, neutral, bad}) => {
  const getAll = () => (good + neutral + bad)

  const getAverage = () => (good - bad) / getAll()

  const getPositive = () => (good / getAll() * 100)
  
  if(getAll() <= 0) return <p>No feedback given</p>

  return <>
      <h2>statistics</h2>
      <table>
        <tbody>
          <StatisticLine text='good' value={good}/>
          <StatisticLine text='neutral' value={neutral}/>
          <StatisticLine text='bad' value={bad}/>
          <StatisticLine text='all' value={good + neutral + bad} />
          <StatisticLine text='average' value={getAverage()} />
          <StatisticLine text='positive' value={`${getPositive()} %`} />
        </tbody>      
      </table>
  </>
}

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
      <Statistics good={good} neutral={neutral} bad={bad}/>
      
    </div>
  )
}

export default App