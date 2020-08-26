import React from 'react'

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

export default Course