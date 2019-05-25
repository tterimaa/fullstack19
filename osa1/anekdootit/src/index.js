import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { stat } from 'fs';

const App = (props) => {
  const [state, setState] = useState({
      index: 0,
      votes: Array.apply(null, new Array(6)).map(Number.prototype.valueOf,0)
  })
  console.log(state)

  const clickNextAnecdote = () => {
    setState({...state, index: Math.floor(Math.random() * Math.floor(6))})
  }
  
  const clickVote = () => {
    const newVotes = [...state.votes]
    newVotes[state.index] = newVotes[state.index] + 1
    setState({
        ...state,
        votes: newVotes
    })
  }

  const mostVoted = (votesArray) => {
    let maxValue = 0
    let maxValueIndex = 0;
    for(let i = 0; i < votesArray.length; i++) {
        if(votesArray[i] > maxValue) {
            maxValue = votesArray[i]
            maxValueIndex = i
        }
    }
    return maxValueIndex
  }

  return (
    <div>
        <h1>Anecdote of the day</h1>
            {props.anecdotes[state.index]}
            <p>has {state.votes[state.index]} votes</p>
            <div>
              <Button handleClick={clickNextAnecdote} text="next anecdote" />
              <Button handleClick={clickVote} text="vote" />
            </div>
            <h1>Anecdote with most votes</h1>
            <p>{props.anecdotes[mostVoted(state.votes)]}</p>
            <p>has {state.votes[mostVoted(state.votes)]} votes</p>
    </div>
  )
}

const Button = (props) => {
    return (
        <>
        <button onClick={props.handleClick}>
            {props.text}
        </button>
        </>
    )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
