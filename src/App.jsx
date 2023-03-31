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
        partName={props.parts.part1}
        exerciseNum={props.exercises.exercises1}
      />
      <Parts
        partName={props.parts.part2}
        exerciseNum={props.exercises.exercises2}
      />
      <Parts
        partName={props.parts.part3}
        exerciseNum={props.exercises.exercises3}
      />
    </div>
  );
};
const App = () => {
  const course = "Half Stack application development";
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;

  return (
    <div>
      <Header courseName={course} />
      <Content
        parts={{ part1, part2, part3 }}
        exercises={{ exercises1, exercises2, exercises3 }}
      />
      <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>
    </div>
  );
};

export default App;
