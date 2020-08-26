import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Content = (props) => {
  const { parts } = props
  return (
    <div>
      {parts.map(part => <Part key={ part.id } part={ part.name } exercises={ part.exercises } />)}
    </div>
  )
}
const Course = (props) => {
  const { course } = props
  return (
    <div>
    <Header course={course.name} />
    <Content parts={course.parts} />
    </div>
  )
}

const Part = (props) => (
  <p>
    {props.part} {props.exercises}
  </p>
)

/*const Total = (props) => (
  <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>  
)*/

const App = () => {
    const course = {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'This is a new course',
          exercises: 3,
          id: 4
        }
      ]
    }
  
    return (
      <div>
        <Course course={course} />
      </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))