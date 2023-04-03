import { useState } from "react";

const Header = () => <h1>Give Feedback</h1>;

const FeedbackButton = ({ text, clickHandle }) => {
  return <button onClick={clickHandle}>{text}</button>;
};
const Total = ({ stats }) => {
  const sum = Object.values(stats).reduce((sum, ele) => sum + ele, 0);
  return (
    <>
      <td>All</td>
      <td>{sum}</td>
    </>
  );
};
const Average = ({ stats }) => {
  const { good, neutral, bad } = stats;
  const score = good * 1 + neutral * 0 + bad * -1;
  const sum = Object.values(stats).reduce((sum, ele) => sum + ele, 0);
  return (
    <>
      <td>Average</td>
      <td>{score / sum}</td>
    </>
  );
};
const PositivePercent = ({ stats }) => {
  const sum = Object.values(stats).reduce((sum, ele) => sum + ele, 0);
  const posPercent = (stats.good / sum) * 100;
  return (
    <>
      <td>Positive</td>
      <td>{posPercent}</td>
    </>
  );
};
const StaticLine = ({ text, value }) => {
  return (
    <>
      <td>{text}</td>
      <td>{value}</td>
    </>
  );
};
const Stats = ({ stats }) => {
  const { good, neutral, bad } = stats;
  if (good == 0 && neutral == 0 && bad == 0) return <p>No feedback given</p>;
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <StaticLine text="Good" value={good} />
          </tr>
          <tr>
            <StaticLine text="Netural" value={neutral} />
          </tr>
          <tr>
            <StaticLine text="Bad" value={bad} />
          </tr>
          <tr>
            <Total stats={stats} />
          </tr>
          <tr>
            <Average stats={stats} />
          </tr>
          <tr>
            <PositivePercent stats={stats} />
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [bad, setBad] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const incrementGood = () => setGood(good + 1);
  const incrementBad = () => setBad(bad + 1);
  const incrementNeutral = () => setNeutral(neutral + 1);
  return (
    <div>
      <Header />
      <FeedbackButton text="good" clickHandle={incrementGood} />
      <FeedbackButton text="neutral" clickHandle={incrementNeutral} />
      <FeedbackButton text="bad" clickHandle={incrementBad} />
      <h1>Statistics</h1>
      <Stats stats={{ good: good, neutral: neutral, bad: bad }} />
    </div>
  );
};

export default App;
