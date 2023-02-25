import React, { useEffect, useState } from "react";
import SocialButton from "./SocialButton";

function FacebookLogin() {
    const [ profile, setProfile ] = useState(null)
    const [loginFacebook, setLoginFacebook] = useState(false)

  const handleSocialLogin = (user) => {
    setProfile(user.profile);
    setLoginFacebook(true)
  };

  const handleSocialLoginFailure = (err) => {
    console.error(err);
    setLoginFacebook(false)
  };

    // useEffect(() => {console.log(profile)}, [profile])

  return (
    <div>
      { loginFacebook ? ( <p>Você se conectou pelo Facebook!</p> ) : ( 
        <SocialButton
          provider="facebook"
          appId="3404739599801682"
          onLoginSuccess={handleSocialLogin}
          onLoginFailure={handleSocialLoginFailure}
          style={{
            backgroundColor: "#4267B2",
            alignItems: "center",
            justifyContent: "center",
            borderColor: "#374957",
            borderRadius: "0",
            padding: ".7rem 2rem"
          }}
        >
          Continuar com Facebook
        </SocialButton>
       )
      }  
    </div>
  );
}

export default FacebookLogin;
