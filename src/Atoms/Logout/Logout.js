import { useAuth0 } from "@auth0/auth0-react";
import './Logout.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faRightFromBracket} from '@fortawesome/free-solid-svg-icons';

export const LogoutButton = () =>{
    
    const {logout} = useAuth0();
    return <button id="logoutButton" onClick={()=>logout({returnTo: window.location.origin})}>
        <div className=" d-flex justify-content-center align-items-center ms-1">
            <FontAwesomeIcon icon={faRightFromBracket} style={{color:"black"}} />
            <div className="ms-2" style={{color:"black"}}>Log Out</div>
        </div>
        </button>
}