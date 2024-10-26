import { useAuth0 } from "@auth0/auth0-react";
import './Login.css';

export const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();

    return (
        <button 
            className="btn btn-secondary rounded-pill d-flex align-items-center justify-content-center fs-4" 
            id="loginButton" 
            onClick={() => loginWithRedirect()}
        >
            Login
        </button>
    );
};
