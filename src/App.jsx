import { useState } from 'react'
import './App.css'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import jwtDecode from 'jwt-decode';
import { googleLogout } from '@react-oauth/google';

function App() {
  
  const [data, setData] = useState([])
  const [login, setLogin] = useState(false)
 
  googleLogout()

  return (
    <div className="App">
        {
          <div style={{display: "flex", flexDirection: "column"}}>
            <label htmlFor="">Name</label>
            <input type="text" value={data.name}/>
            <label htmlFor="">Email</label>
            <input type="text" value={data.email}/>
            <label htmlFor="">Confirme seu Email</label>
            <input type="text" value={data.email}/>
            <label htmlFor="">Digite uma Senha</label>
            <input type="password" />
            <br/>
            <input type="submit" value="Cadastrar" />
            <br/>
            <br/>
          </div>
        }
      <GoogleOAuthProvider clientId="973512195077-aabhc3laek2v39701j20qpqoo6mdpuei.apps.googleusercontent.com">
        { login ? ( <p>Você se conectou com Google!</p>) : (
          <div>
            <p>ou</p>
            <GoogleLogin
              onSuccess={credentialResponse => {
                const details = jwtDecode(credentialResponse.credential)
                console.log(details)
                setData(details)
                setLogin(true)
              }}
              onError={() => {
                console.log('Login Failed');
              }}
            />
          </div>)
        }
      </GoogleOAuthProvider>
    </div>
  )
}

export default App
