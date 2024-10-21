import { useAuth0 } from "@auth0/auth0-react";
import './Login.css'

export const LoginButton = () =>{
    
    const {loginWithRedirect} = useAuth0();
    return <button className="col-2 fs-4 rounded-pill d-flex align-items-center justify-content-evenly" id="loginButton"  onClick={()=>loginWithRedirect()}>Login</button>
}