import React, { useState } from 'react'

function App() {
  const [votes, setVotes] = useState(0)

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Ankush Counter</h1>
      <p>Votes: {votes}</p>
      <button onClick={() => setVotes(votes + 1)}>Upvote</button>
      <button onClick={() => setVotes(votes - 1)} style={{ marginLeft: '10px' }}>Downvote</button>
    </div>
  )
}

export default App
