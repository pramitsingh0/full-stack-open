import { useState } from "react";

const Header = () => <h1>Give Feedback</h1>;

const FeedbackButton = ({ text, clickHandle }) => {
  return <button onClick={clickHandle}>{text}</button>;
};
const Total = ({ stats }) => {
  const [good, neutral, bad] = stats;
  return (
    <div>
      <p>Good {good}</p>
      <p>Neutral {neutral}</p>
      <p>Bad {bad}</p>
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
      <Total stats={[good, neutral, bad, ]} />
    </div>
  );
};

export default App;
