import 'bootstrap/dist/css/bootstrap.min.css';
import './TopBar.css'
import UcuLogo from './UCU.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faPlus } from '@fortawesome/free-solid-svg-icons';
import { LoginButton } from '../../Atoms/Login/Login';
import { LogoutButton } from '../../Atoms/Logout/Logout';
import { Profile } from '../../Atoms/Profile/Profile';
import { useAuth0 } from '@auth0/auth0-react';

export default function TopBar() {
    const {isAuthenticated} = useAuth0();
    return (
            <div className='col-12 d-flex align-items-center border border border-secondary text-break' id='container'>

                <a href='/' className='col-3 d-flex  align-items-center link-light link-underline-opacity-0'>
                    <img className='col-1 img-fluid ms-5' src={UcuLogo}></img>
                    <label className='fs-3 fw-bold ms-2'>UCUDDIT</label>
                </a>
                
                <div className='col-6 d-flex justify-content-center align-items-center '>
                    <div className='col-1 d-flex align-items-center rounded-start-pill' id='searchIconContainer'>
                        <FontAwesomeIcon id='searchIcon' className='col-12 fs-5 ' icon={faMagnifyingGlass} />
                    </div>
                    <input id='searchBar' placeholder='Search' className='col-8 rounded-end-pill border-0 fs-5 '></input>
                </div>

                <div className='col-3 d-flex align-items-center justify-content-evenly'>
                    <button className='col-2 fs-4 rounded-pill d-flex align-items-center justify-content-evenly ' id='buttonPost'>
                        <FontAwesomeIcon icon={faPlus}/>
                        Post
                        </button>
                        {isAuthenticated ? (
                            <>
                                <Profile></Profile>
                                <LogoutButton></LogoutButton>
                            </>
                        ):(
                            <LoginButton></LoginButton>
                        )}
                </div>
           </div>
    );
}