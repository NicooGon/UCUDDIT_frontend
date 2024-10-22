import { useAuth0 } from "@auth0/auth0-react";
import { LogoutButton } from "../Logout/Logout";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faGear} from '@fortawesome/free-solid-svg-icons';
import './Profile.css';

export const Profile = () =>{
    
    const {user, isAuthenticated, isLoading} = useAuth0();
    if(isLoading)
    {
        return <div>Loading...</div>
    }

    return(
        isAuthenticated && (
            <div className="col-2">
                <button 
                    className=" img-fluid rounded-circle border border-white dropdown-toggle" 
                    id="profileButton"
                    data-bs-toggle="dropdown" 
                    aria-expanded="false"
                    style={{ backgroundImage: `url(${user.picture})`, height:'4vh', width:'4vh', backgroundSize:'cover' , backgroundPosition:'center' }}>
                </button>
                    <ul className="dropdown-menu custom-dropdown" aria-labelledby="dropdownMenuButton">
                        <li className="custom-dropdown-li">
                            <a className="dropdown-item" href="/user">
                                <div className="d-flex align-items-center justify-content-start" >
                                    <FontAwesomeIcon icon={faUser} />   
                                    <span className="ms-1">View Profile</span>
                                </div>
                            </a>
                        </li>
                        <li className="custom-dropdown-li">
                            <a className="dropdown-item" href="/settings">
                                <div className="d-flex align-items-center justify-content-start">
                                    <FontAwesomeIcon icon={faGear} />
                                    <span className="ms-1">Settings</span>
                                </div>
                            </a>
                        </li>
                        <li className="custom-dropdown-li ms-2">
                            <LogoutButton></LogoutButton>
                        </li>
                    </ul>
            </div>
        )
    );
}