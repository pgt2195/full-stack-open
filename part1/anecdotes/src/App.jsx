import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]


  const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
  }


  const nbOfQuotes = anecdotes.length
  const emptyArray = Array(nbOfQuotes).fill(0)

  const [selected, setSelected] = useState(getRandomInt(nbOfQuotes))
  const [votes, setVotes] = useState(emptyArray)
  

  const getAnecdote = () => {
    if (nbOfQuotes <= 1) {
      console.log("Error, getAnecdote function needs more than one element")
      return
    }

    let randomNb = getRandomInt(nbOfQuotes)
    while (randomNb === selected) {
      randomNb = getRandomInt(nbOfQuotes)
    }
    setSelected(randomNb)
  }


  const vote = (index) => {
    let currentVotes = [...votes]
    currentVotes[index] += 1
    setVotes(currentVotes)
    console.log(`You voted for ${index}`)
  }


  const getMostPopular = () => {
    let temp = 0
    for (let i = 0; i < nbOfQuotes; i++) {
      if (votes[i] > votes[temp]) {
        temp = i
      }
    }

    if (votes.every(vote => vote === 0)) {
      return (
        <p>No votes yet!</p>
      )
    } else {
      return (
        <>
          <p>{anecdotes[temp]}</p>
          <p>Has {votes[temp]} votes</p>
        </>
      )
    }
  }


  return (
    <div>
      <h1>Anecdote of the day</h1>

      <p>{anecdotes[selected]}</p>
      <p>Has {votes[selected]} votes</p>
      <Button handleClick={() => vote(selected)} text='Vote' />
      <Button handleClick={getAnecdote} text='Get random anecdote' />

      <h1>Anecdote with most votes</h1>

      {getMostPopular()}
    </div>
  )
}

export default App