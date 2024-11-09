import { useAuth0 } from "@auth0/auth0-react";
import { LogoutButton } from "../Logout/Logout";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faGear } from '@fortawesome/free-solid-svg-icons';
import './Profile.css';

export const Profile = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        isAuthenticated && (
            <div className="col-auto d-flex justify-content-center">
                <div className="dropdown d-flex justify-content-center">
                    <button 
                        className="btn p-0 circle rounded-circle border border-white dropdown-toggle" 
                        id="profileButton"
                        data-bs-toggle="dropdown" 
                        aria-expanded="false"
                        style={{ 
                            backgroundImage: `url(${user.picture})`, 
                            height: '40px', 
                            width: '40px', 
                            backgroundSize: 'cover', 
                            backgroundPosition: 'center' 
                        }}
                    />
                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="profileButton">
                        <li>
                            <a className="dropdown-item d-flex align-items-center" href={`/activity/user/${user.sub}`}>
                                <FontAwesomeIcon icon={faUser} />
                                <span className="ms-2">My Activity</span>
                            </a>
                        </li>
                        <li>
                            <a className="dropdown-item d-flex align-items-center" href="/settings">
                                <FontAwesomeIcon icon={faGear} />
                                <span className="ms-2">Settings</span>
                            </a>
                        </li>
                        <li >
                            <div className="d-flex align-items-center ms-2">
                                <LogoutButton  />
                            </div>
                            
                        </li>
                    </ul>
                </div>
            </div>
        )
    );
};
