import React, { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  if (good + neutral + bad === 0) {
    return (
      <div>
      <Header text={"Give Feedback Here: "} />
      <Button clickHandler={() => setGood(good + 1)} text="Good" />
      <Button clickHandler={() => setNeutral(neutral + 1)} text="Neutral" />
      <Button clickHandler={() => setBad(bad + 1)} text="Bad" /> <br />
      No Feedbacks yet
      </div>
    )
  }
  
  return (
    <div>
      <Header text={"Give Feedback Here: "} />
      <Button clickHandler={() => setGood(good + 1)} text="Good" />
      <Button clickHandler={() => setNeutral(neutral + 1)} text="Neutral" />
      <Button clickHandler={() => setBad(bad + 1)} text="Bad" />
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

const Header = ({ text }) => (
  <>
    <h1>{text}</h1>
  </>
)

const Button = ({ clickHandler, text }) => (
  <>
    <button onClick={clickHandler}>{text}</button>
  </>
)

const Statistics = ({ good, neutral, bad }) => {

  const total = good + neutral + bad;
  const avg = (good - bad)/total;
  const percentage = (good/total) * 100;
  console.log(bad)
  return (
    <>
    <table>
    <StatisticLine text="Good" value={good} />
    <StatisticLine text="Neutral" value={neutral} />
    <StatisticLine text="Bad" value={bad} />

    <tr>
      <td>Total Feedback</td> <td>{total}</td>
    </tr>
    <tr>
      <td>Average Feedback</td> <td>{avg}</td>
    </tr>
    <tr>
      <td>Positive</td> <td>{percentage}%</td>
    </tr>
    </table>
    </>
  )
}
const StatisticLine = ({text, value}) => (
  <>
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
  </>
)
export default App