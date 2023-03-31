const Header = (props) => {
  console.log(props);
  return <h1>{props.courseName}</h1>;
};
const Parts = (props) => {
  console.log(props);
  return (
    <p>
      {props.partName} {props.exerciseNum}
    </p>
  );
};
const Content = (props) => {
  console.log(props);
  const [part1, part2, part3] = props.parts;
  return (
    <div>
      <Parts
        partName={part1.name}
        exerciseNum={part1.exercises}
      />
      <Parts
        partName={part2.name}
        exerciseNum={part2.exercises}
      />
      <Parts
        partName={part3.name}
        exerciseNum={part3.exercises}
      />
    </div>
  );
};
const Total = (props) => {
  console.log(props);
  const [exercise1, exercise2, exercise3] = props.parts.map(part => part.exercises);
  return (
  <>
    <p>Number of exercises {exercise1 + exercise2 + exercise3}</p>
  </>
  )
}
const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ];
  return (
    <div>
      <Header courseName={course} />
      <Content
        parts={parts}
      />
      <Total parts={parts} />
    </div>
  );
};

export default App;
