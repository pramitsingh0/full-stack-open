import { useState } from "react";
const Anecdote = ({ anecdote, votes }) => {
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdote}</p>
      <p>Has {votes} votes</p>
    </div>
  );
};
const MostVotedAnecdote = ({ anecdote, vote }) => {
  return (
    <div>
      <h1>Anecdote with most votes</h1>
      <p>{anecdote}</p>
      <p>has {vote} votes</p>
    </div>
  );
};
const ChangeButton = ({ onClickHandle }) => {
  return <button onClick={onClickHandle}>Next Anecdote</button>;
};
const VoteButton = ({ onClickHandle }) => {
  return <button onClick={onClickHandle}>Vote</button>;
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));
  const [maxAnecdotes, setMaxAnecdotes] = useState(0);
  const changeAnecdote = () => {
    let random = Math.floor(Math.random() * anecdotes.length);
    setSelected(random);
  };
  const vote = (currentAnec) => () => {
    const votesCopy = [...votes];
    votesCopy[currentAnec] += 1;
    setVotes(votesCopy);
    mostVotedAnecdote();
  };
  const mostVotedAnecdote = () => {
    const maxVote = votes.reduce((max, ele) => max < ele ? ele : max)
    const maxAnecdotesIndex = votes.indexOf(maxVote)
    setMaxAnecdotes(maxAnecdotesIndex);
  };

  return (
    <div>
      <Anecdote anecdote={anecdotes[selected]} votes={votes[selected]} />
      <VoteButton onClickHandle={vote(selected)} />
      <ChangeButton onClickHandle={changeAnecdote} />
      <MostVotedAnecdote anecdote={anecdotes[maxAnecdotes]} vote={votes[maxAnecdotes]} />
    </div>
  );
};

export default App;
