import { useState } from 'react'
import './App.css'
import SignupPage from './SignupPage'
import LoginPage from './LoginPage'

function App() {
  const [showSignup, setShowSignup] = useState(true)

  return (
    <>
      {showSignup ? <SignupPage onChange={setShowSignup} /> : <LoginPage onChange={setShowSignup} />}
    </>
  )
}

export default App
