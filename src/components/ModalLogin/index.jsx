import { useEffect, useState } from 'react'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import jwtDecode from 'jwt-decode';
import { googleLogout } from '@react-oauth/google';
import style from './modal.module.css'
import FacebookLogin from '../FacebookLogin';

function ModalLogin() {
  
    const [data, setData] = useState([])
    const [loginGoogle, setLoginGoogle] = useState(false)
    const [show, setShow] = useState('hidden')
    const [ modal, setModal ] = useState(false)

    const handleClick = () => {
      setModal(!modal)
    }

    function checkModal () {
        if(!modal){
            setShow('hidden')
        } else {
            setShow('visible')
        }
    }

    useEffect(() => {
        checkModal()
    }, [modal])

    googleLogout()

  return (
        <div className={style.modalContainer}>
            <button onClick={ handleClick }>Entrar</button>
            <div className={style.formLogin} style={{visibility: show}}>
                <span onClick={() => setModal(false)}>X</span>
                <div>
                    <img src="logo.png" alt="" width="40px" />
                    <h4>Cadastre-se agora</h4>
                    <p>Faça seu cadastro agora e comece a explorar nossos passeios.</p>
                </div>
                <div className={style.formContainer}>
                    <input type="text" placeholder='Digite seu email' value={data.email}/>
                    <input type="password" placeholder='Digite uma Senha'/>
                    <input type="password" placeholder='Confirme sua Senha'/>
                    <button className={style.cadastrartBtn}>Cadastrar</button>
                </div>
                <p>ou</p>
                <div className={style.socialLogin}>
                    <FacebookLogin />                  
                    <GoogleOAuthProvider clientId="973512195077-aabhc3laek2v39701j20qpqoo6mdpuei.apps.googleusercontent.com">
                        { loginGoogle ? ( <p>Você se conectou com Google!</p>) : (
                            <div>
                            <GoogleLogin
                            onSuccess={credentialResponse => {
                                const details = jwtDecode(credentialResponse.credential)
                                console.log(details)
                                setData(details)
                                setLoginGoogle(true)
                            }}
                            onError={() => {
                                console.log('Login Failed');
                            }}
                            />
                        </div>)
                        }
                    </GoogleOAuthProvider>
                </div>
                <p>Já é cadastrado? <strong>Entrar</strong>.</p>
            </div>
        </div>
  )
}

export default ModalLogin
