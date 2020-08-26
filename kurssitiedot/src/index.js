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
    <Total parts={course.parts} />
    </div>
  )
}

const Part = (props) => (
  <p>
    {props.part} {props.exercises}
  </p>
)

const Total = (props) => {
  const { parts } = props

  const totExercises = parts.reduce((prevValue,part) => prevValue + part.exercises, 0 )

  return (
    <div><hr/>Number of exercises <b>{totExercises}</b></div>  
  )
}

const App = () => {
    const courses = [
      {
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
            name: 'Redux',
            exercises: 11,
            id: 4
          }
        ]
      }, 
      {
        name: 'Node.js',
        id: 2,
        parts: [
          {
            name: 'Routing',
            exercises: 3,
            id: 1
          },
          {
            name: 'Middlewares',
            exercises: 7,
            id: 2
          }
        ]
      }
    ]
  
    return (
      <div>
        {courses.map(course => <Course key={ course.id } course={ course } />)}
      </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))