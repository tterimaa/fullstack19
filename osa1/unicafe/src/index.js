import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const clickGood = () => {
      setGood(good + 1);
  }

  const clickNeutral = () => {
      setNeutral(neutral + 1)
  }

  const clickBad = () => {
      setBad(bad + 1)
  }

  return (
    <div>
      <h1>anna palautetta</h1>
      <div>
          <Button handleClick={clickGood} text="hyvä" />
          <Button handleClick={clickNeutral} text="neutraali" />
          <Button handleClick={clickBad} text="huono" />
      </div>
      <h1>statistiikka</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
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

const Statistics = ({good, neutral, bad}) => {
    const yht = good + neutral + bad;
    const ka = ((good * 1) + (bad * -1)) / yht;
    const pos = (good / yht) * 100;
    if(good || neutral || bad) {
        return (
        <table>
            <tbody>
                <Statistic text="hyvä" value={good} />
                <Statistic text="neutraali" value={neutral} />
                <Statistic text="huono" value={bad} />
                <Statistic text="yhteensä" value={yht} />
                <Statistic text="keskiarvo" value={ka} />
                <Statistic text="positiivisia" value={pos} pf="%" />
            </tbody>
        </table> 
    )} else return <div>Ei yhtään palautetta annettu</div>
}

const Statistic = ({text, value, pf}) => {
    if(isNaN(value)) value = "";
    return (
    <tr>
        <td>{text}</td>
        <td>{value} {pf}</td>
    </tr>
    )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)