import 'bootstrap/dist/css/bootstrap.min.css';
import './TopBar.css';
import UcuLogo from './UCU.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { LoginButton } from '../../Atoms/Login/Login';
import { Profile } from '../../Atoms/Profile/Profile';
import { useAuth0 } from '@auth0/auth0-react';
import PostButton from '../../Atoms/PostButton/PostButton';

export default function TopBar() {
    const { isAuthenticated } = useAuth0();

    return (
        <div className='container-fluid d-flex flex-wrap align-items-center justify-content-between border border-secondary p-2' id='topBarContainer'>
            <a href='/' className='d-flex align-items-center col-12 col-md-4 link-light link-underline-opacity-0 mb-2 mb-md-0'>
                <img className='img-fluid ms-3' src={UcuLogo} alt="UCU Logo" style={{ height: '40px', width: 'auto' }} />
                <label className='fs-2 fs-md-4 fw-bold ms-2'>UCUDDIT</label>
            </a>

            <div className='col-12 col-md-6 d-flex justify-content-center align-items-center mb-2 mb-md-0'>
                <div className='rounded-start-pill d-flex align-items-center' id='searchIconContainer' style={{ padding: '0 1vh' }}>
                    <FontAwesomeIcon id='searchIcon' className='fs-5' icon={faMagnifyingGlass} />
                </div>
                <input
                    id='searchBar'
                    placeholder='Search'
                    className='rounded-end-pill border-0 fs-5'
                    style={{ width: '70%' }}
                />
            </div>

            <div className='col-12 col-md-2 d-flex align-items-center justify-content-evenly'>
                <PostButton />
                {isAuthenticated ? (
                    <Profile />
                ) : (
                    <LoginButton />
                )}
            </div>
        </div>
    );
}