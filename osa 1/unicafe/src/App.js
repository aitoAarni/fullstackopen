import { useState } from 'react'

const Greeting = () => <h1>give feedback</h1>



const Button = ({event, text}) => (
  <>
  <button onClick={event}>{text}</button>
  </>
)

const StatisticLine = ({value, text, text2}) => (
  <>
  <tr>
    <td>{text}</td>
    <td>{value} {text2}</td>
  </tr>
  </>
)

const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad
  const average = (good-bad)/all
  const positive = good/all * 100
  if (all === 0) return (<p>No feedback given</p>)
  return (
    <div>
      <table>
        <tbody>
          <StatisticLine value={good} text="good"/>
          <StatisticLine value={neutral} text="neutral"/>
          <StatisticLine value={bad} text="bad"/>
          <StatisticLine value={all} text="all"/>
          <StatisticLine value={average} text="average"/>
          <StatisticLine value={positive} text="positive" text2="%"/>
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = () => setGood(good + 1)
  const increaseNeutral = () => setNeutral(neutral + 1)
  const increaseBad = () => setBad(bad + 1)

  return (
    <div>
      <Greeting />
      <div>
        <Button event={increaseGood} text="good" />
        <Button event={increaseNeutral} text="neutral"/>
        <Button event={increaseBad} text="bad"/>
      </div>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App