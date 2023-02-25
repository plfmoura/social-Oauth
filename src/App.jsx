import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import './App.css'
import { LoginContext } from './context/LoginContext'

function App() {
  const [ userName, setUserName] = useState()
  const [ showPrivate, setShowPrivate] = useState(false)
  const [ status, setStatus ] = useState('')

  const db = {
    user: 'plfmoura'
  }

  const login = () => {
    if(userName === db.user){
      setStatus('Cadastro efetuado!')
      setTimeout(() => {
        setShowPrivate(true)
      }, 2000)
    } else {
      setStatus('Usuário já cadastrado.')
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
          setUserName, 
          setShowPrivate,
          showPrivate,
          userName,
          login,
          logout,
          status
          }}>
        <Outlet />
      </LoginContext.Provider>
    </div>

  )
}

export default App