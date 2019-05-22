import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const course = {
      name:'Half Stack -sovelluskehitys',
      parts: [
    {
      name: 'Reactin perusteet',
      exercises: 10
    },
    {
      name: 'Tiedonvälitys propseilla',
      exercises: 7
    },
    {
      name: 'Komponenttien tila',
      exercises: 14
    }
    ]
  }

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
    )
}

const Header = (props) => {
    return (
        <React.Fragment>
        <h1>{props.course.name}</h1>
        </React.Fragment>
    )
}

const Content = (props) => {
    const t = props.course.parts;
    return (
        <React.Fragment>
            <Part name={t[0].name} exercises={t[0].exercises} />
            <Part name={t[1].name} exercises={t[1].exercises} />
            <Part name={t[2].name} exercises={t[2].exercises} />
        </React.Fragment>
    )
}

const Part = (props) => {
    return (
        <React.Fragment>
        <p>
        {props.name} {props.exercises}
        </p>        
        </React.Fragment>
    )
} 

const Total = (props) => {
    const parts = props.course.parts;
    const exercises = parts.map(part => part.exercises);
    const sum = t => t.reduce((a,b) => a + b, 0);
    return (
        <p>
            {sum(exercises)}
        </p>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))
