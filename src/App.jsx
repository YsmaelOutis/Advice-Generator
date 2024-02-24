import { useState, useEffect } from 'react'
import './App.css'

import Divider from './components/Divider.jsx'
import messages from './data/messages.js'

const URL = 'https://api.adviceslip.com/advice'

function App() {
  const [advice, setAdvice] = useState(false)
  const [loading, setLoading] = useState(true)

  function fetchAdvice() {
    setLoading(true)

    fetch(URL)
      .then(res => res.json())
      .then(data => {
        // If the advice is different from the previous one, set the new advice and stop loading. Else fetch again.
        if (advice.advice !== data.slip.advice) {
          setAdvice(data.slip)
          setLoading(false)
        } else {
          setTimeout(fetchAdvice, 250)
        }
      })
  }

  useEffect(() => {
    fetchAdvice()
    }, [])

  function getWaitingMessage() {
    return messages[Math.floor(Math.random(1 - messages.length) * messages.length)]
  }

  return (
    <main>
      <section>

        {loading && (
          <>
            <h4>{getWaitingMessage()}</h4>
            <div className="loading-icon-wrapper">
              <img src="icon-dice-loading.svg" alt="" className='loading-icon center'/>
            </div>
            <Divider />
          </>
        )}

        {advice && !loading && (
          <>
            <h4>ADVICE #{advice.id}</h4>
            <p className='center'>&quot;{advice.advice}&quot;</p>
            <Divider />
          </>)}
      </section>
      <button onClick={fetchAdvice}><img src="icon-dice.svg" alt="" /></button>
    </main>
  )
}

export default App