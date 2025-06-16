import { useState } from 'react'

const StatisticLine = props => (
  <tr>
    <td>{props.text}</td>
    <td>{props.value}</td>
  </tr>
)

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Statistics = (props) => {
  const { good, neutral, bad } = props
  const all = good + neutral + bad

  if (all === 0) {
    return (
      <p>
        No feedback given
      </p>
    )
  }

  const average = (good * 1 + neutral * 0 + bad * -1) / all
  const positive = good / all * 100

  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={all} />
        <StatisticLine text="average" value={average} />
        <StatisticLine text="positive" value={`${positive} %`} />
      </tbody>
    </table>
  )
}

const App = () => {
  // enregistrer les clics de chaque bouton dans un état différent
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setToValue = (feedback) => {
    if (feedback === 'good') {
      setGood(good + 1)
    } else if (feedback === 'neutral') {
      setNeutral(neutral + 1)
    } else {
      setBad(bad + 1)
    }

    console.log('Feedback added!')
  }

  return (
    <div>

      <h1>give feedback</h1>

      <Button handleClick={() => setToValue('good')} text="good" />
      <Button handleClick={() => setToValue('neutral')} text="neutral" />
      <Button handleClick={() => setToValue('bad')} text="bad" />

      <h1>statistics</h1>

      <Statistics good={good} neutral={neutral} bad={bad} />

    </div>
  )
}

export default App