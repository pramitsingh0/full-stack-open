import React from 'react'

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
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
    ]
  }
  
  return (
    <div>
      <Header header={course.name} />
      <Content parts={course.parts} />
      <Total total={course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises} />
    </div>
  )
}

const Header = props => {
  return (
  <div>
    <h1>{props.header}</h1>
  </div>
)}

const Content = props => (
  <div>
    {console.log(props.parts)}

    {props.parts.map(element => {
      console.log(element.name, element.exercises);
      return <Part part={element.name} exercises={element.exercises} />
    })}
  </div>
)

const Total = props => (
  <div>
    <p>Number of exercises {props.total}</p>
  </div>
)

const Part = props => (
  <>
    <p>
      {props.part} {props.exercises}
    </p>
  </>
)
export default App