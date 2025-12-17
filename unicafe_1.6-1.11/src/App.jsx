import { useState } from 'react'

const StatisticsLine = ({title, value}) => {
  return (
    <p>{title}: {value}</p>
  )
}

const Statistics = ({props}) => {

  if (props.total <= 0) return (
    <p>No Feedback Given</p>
  )

  return (
    <div>
      <h2>Statistics</h2>
      <StatisticsLine title="Good" value={props.good}/>
      <StatisticsLine title="Neutral" value={props.neutral}/>
      <StatisticsLine title="Bad" value={props.bad}/>
      <StatisticsLine title="Total" value={props.total}/>
      <StatisticsLine title="Average" value={props.keskiarvo}/>
      <StatisticsLine title="Positive" value={props.positive}/>
    </div>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const total = good + neutral + bad
  const keskiarvo = total === 0 ? 0 : (good - bad) / total
  const positive = total === 0 ? 0 : (good / total) * 100

  return (
    <div>
      <h1>Give Feedback</h1>
      <div>
        <button onClick={() => setGood(prev => prev + 1)}>Good</button>
        <button onClick={() => setNeutral(prev => prev + 1)}>Neutral</button>
        <button onClick={() => setBad(prev => prev + 1)}>Bad</button>
      </div>
      <Statistics props={{
        good,
        bad,
        neutral,
        total,
        keskiarvo,
        positive
      }}/>
    </div>
  )
}

export default App