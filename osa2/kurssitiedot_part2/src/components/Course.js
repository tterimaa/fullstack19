import React from 'react'
import Header from './Header'
import Content from './Content'
import Total from './Total'

const Course = (props) => {
    const name = props.course.name
    const parts = props.course.parts
    const exercises = parts.map(part => part.exercises);
    return (
        <div>
          <Header name={name} />
          <Content parts={parts} />
          <Total exercises={exercises} />
        </div>
        )
}

export default Course