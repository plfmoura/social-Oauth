import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { LoginContext } from '../context/LoginContext'

export default function Private() {

  const { userName, logout } = useContext(LoginContext)

  return (
    <div>
      <h1>Página Privada</h1>
      <p>Seja Bem-vindo: {userName}</p>
      <Link onClick={ logout }>Sair</Link>
    </div>
  )
}
