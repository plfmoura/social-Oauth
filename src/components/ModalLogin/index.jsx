import { useContext, useEffect, useState } from 'react'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import jwtDecode from 'jwt-decode';
import { googleLogout } from '@react-oauth/google';
import style from './modal.module.css'
import FacebookLogin from '../FacebookLogin';
import { LoginContext } from '../../context/LoginContext';

function ModalLogin() {
  
    const { setUserName, login, logout, showPrivate, setShowPrivate, userName, status } = useContext(LoginContext)
    const [data, setData] = useState([])
    const [loginGoogle, setLoginGoogle] = useState(false)
    const [show, setShow] = useState('hidden')
    const [ modal, setModal ] = useState(false)

    const handleClick = () => {
        setModal(!modal)
        googleLogout()
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

  return (
        <div className={style.modalContainer}>
            <button onClick={ handleClick }>Fazer Login</button>
            <div className={style.formLogin} style={{visibility: show}}>
                <span onClick={() => setModal(false)}>X</span>
                {showPrivate ? (
                        <div>
                        <div>
                            <img src="logo.png" alt="" width="40px" />
                            <h4>Usuário Cadastrado com Sucesso!</h4>
                            <p>Seja Bem-vindo {userName} </p>
                        </div>
                        <div className={style.formContainer}>
                            <button className={style.cadastrartBtn} style={{marginTop: '1rem'}} onClick={ logout }>Sair</button>
                        </div>
                        </div>
                    ) : (
                        <>
                        <div>
                        <div>
                            <img src="logo.png" alt="" width="40px" />
                            <h4>Cadastre-se agora</h4>
                            <p>Faça seu cadastro agora e comece a explorar nossos passeios.</p>
                        </div>
                        <div className={style.formContainer}>
                            <input type="text" placeholder='Digite seu email' value={data.email} onChange={(e) => setUserName(e.target.value)}/>
                            <input type="password" placeholder='Digite uma Senha'/>
                            <input type="password" placeholder='Confirme sua Senha'/>
                            <p className={style.authStatus}>{status}</p>
                            <button className={style.cadastrartBtn} onClick={ login }>Cadastrar</button>
                        </div>
                        </div> 
                        <p>ou</p>
                        </>
                        )}
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
