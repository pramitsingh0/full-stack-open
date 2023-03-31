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
  return (
    <div>
      <Parts
        partName={props.parts.part1.name}
        exerciseNum={props.parts.part1.exercises}
      />
      <Parts
        partName={props.parts.part2.name}
        exerciseNum={props.parts.part2.exercises}
      />
      <Parts
        partName={props.parts.part3.name}
        exerciseNum={props.parts.part3.exercises}
      />
    </div>
  );
};
const Total = (props) => {
  console.log(props);
  const [exercise1, exercise2, exercise3] = props.excercise;
  return (
  <>
    <p>Number of exercises {exercise1 + exercise2 + exercise3}</p>
  </>
  )
}
const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }
  return (
    <div>
      <Header courseName={course} />
      <Content
        parts={{part1, part2, part3}}
      />
      <Total excercise={[part1.exercises, part2.exercises, part3.exercises]} />
    </div>
  );
};

export default App;
