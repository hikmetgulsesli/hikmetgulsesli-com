import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(() => {
    const saved = localStorage.getItem('counter-value')
    return saved ? parseInt(saved, 10) : 0
  })

  useEffect(() => {
    localStorage.setItem('counter-value', count.toString())
  }, [count])

  const increment = () => setCount(c => c + 1)
  const decrement = () => setCount(c => c - 1)
  const reset = () => setCount(0)

  return (
    <div className="container">
      <h1 className="title">Sayaç</h1>
      <div className="counter-value">{count}</div>
      <div className="buttons">
        <button onClick={decrement} className="btn btn-decrement">Azalt</button>
        <button onClick={reset} className="btn btn-reset">Sıfırla</button>
        <button onClick={increment} className="btn btn-increment">Artır</button>
      </div>
    </div>
  )
}

export default App
