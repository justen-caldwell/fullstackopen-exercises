import { useState } from 'react'

const StatisticLine = ({ label, count, isPercentage }) => {
  return (
    <tr>
      <td>{label}</td>
      <td>{count} {(isPercentage ? '%' : '')} </td>
    </tr>
  )
}

const Button = ({ label, onClick}) => <button onClick={onClick}>{label}</button>

const Statistics = ({ good, neutral, bad }) => {
  const calcAll = () => good + neutral + bad
  const calcAverage = () => (good - bad) / calcAll()
  const calcPositivePercentage = () => (good / calcAll()) * 100

  if (calcAll() === 0) {
    return (
      <p>No feedback given</p>
    )
  }

  return (
    <table>
      <tbody>
        <StatisticLine label={'good'} count={good} isPercentage={false}/>
        <StatisticLine label={'neutral'} count={neutral} isPercentage={false}/>
        <StatisticLine label={'bad'} count={bad} isPercentage={false}/>
        <StatisticLine label={'all'} count={calcAll()} isPercentage={false}/>
        <StatisticLine label={'average'} count={calcAverage()} isPercentage={false}/>
        <StatisticLine label={'positive'} count={calcPositivePercentage()} isPercentage={true}/>
      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = () => setGood(good + 1)
  const increaseNeutral = () => setNeutral(neutral + 1)
  const increaseBad = () => setBad(bad + 1)

  return (
    <div>
      <h1>give feedback</h1>
      <Button label={'good'} onClick={increaseGood}/>
      <Button label={'neutral'} onClick={increaseNeutral} />
      <Button label={'bad'} onClick={increaseBad} />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
