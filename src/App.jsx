import { useRef, useState } from 'react'
import { Outlet } from 'react-router-dom'
import './App.css'
import { LoginContext } from './context/LoginContext'

function App() {
  const [ showPrivate, setShowPrivate ] = useState(false)
  const [ status, setStatus ] = useState('')
  const [ userName, setUserName ] = useState('')
  const emailRef = useRef()
  const passwordRef = useRef()
 
  const db = {
    user: 'plfmoura',
    name: 'Pedro Moura',
    password: '123'
  }

  const login = () => {
    let email = emailRef.current.value;
    let password = passwordRef.current.value;
  
    if(email === db.user && password === db.password){
      setStatus('Usuário encontrado!')
      setUserName(db.name)
      setTimeout(() => {
        setShowPrivate(true)
        setStatus('')
      }, 2000)
    } else {
      setStatus('Usuário não encontrado.')
      setTimeout(() => {
        setStatus('')
      }, 3000)
      setShowPrivate(false)
    }
  }

  const logout = () => {
    setTimeout(() => {
      setShowPrivate(false)
      setUserName('')
      setStatus('')
    }, 2000)
    console.log(showPrivate)
  }

  return (
    <div className="App">
      <LoginContext.Provider 
        value={{ 
          setShowPrivate,
          showPrivate,
          login,
          logout,
          status,
          emailRef,
          passwordRef,
          userName
          }}>
        <Outlet />
      </LoginContext.Provider>
    </div>

  )
}

export default App