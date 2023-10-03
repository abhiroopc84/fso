import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>{props.text}</button>
  )
}

const StatisticLine = (props) => {
  return (
      <tr>
        <td>{props.name}</td>
        <td>{props.value}</td>
      </tr>
  )
}

const Statistics = ({good,neutral,bad}) => {
  const all = good+neutral+bad
  if (all===0) {
    return (
      <div>
        <h1>statistics</h1>
        No feedback given
      </div>
    )
  }
  return (
  <>
      <h1>statistics</h1>
      <table>
        <tbody>
        <StatisticLine name="good" value={good}/>
        <StatisticLine name="neutral" value={neutral}/>
        <StatisticLine name="bad" value={bad}/>
        <StatisticLine name="all" value={all}/>
        <StatisticLine name="average" value={((good*1+bad*(-1))/all).toFixed(1)}/>
        <StatisticLine name="positive" value={((good*100)/all).toFixed(1)+" \%"}/>
        </tbody>
      </table>
  </>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={()=>{setGood(good+1)}} text="good"/>
      <Button handleClick={()=>{setNeutral(neutral+1)}} text="neutral"/>
      <Button handleClick={()=>{setBad(bad+1)}} text="bad"/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App
