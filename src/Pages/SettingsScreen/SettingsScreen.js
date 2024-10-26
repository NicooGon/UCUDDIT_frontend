import { useAuth0 } from '@auth0/auth0-react';
import LeftBar from '../../Components/LeftBar/LeftBar';

export default function SettingsScreen() {
    const { user } = useAuth0();
    return (
        <div className='d-flex flex-column flex-md-row'>
            <LeftBar />
            <div className='col-12 col-md-10 d-flex flex-column justify-content-evenly align-items-center border border-secondary text-break' style={{ minHeight: '94.87vh'}} id='container'>
                <div 
                    className='img-fluid rounded-circle border border-white' 
                    style={{ 
                        backgroundImage: `url(${user?.picture})`, 
                        height: '150px', 
                        width: '150px', 
                        backgroundSize: 'cover', 
                        backgroundPosition: 'center', 
                        backgroundRepeat: 'no-repeat' 
                    }} 
                />
                <div className='col-5 text-break mb-4'>
                    <label style={{ fontSize: '3rem' }}>Name: {user?.given_name}</label>
                    <div className='col-12'  style={{ backgroundColor: 'white', height: '0.3vh'}}></div>
                </div>
                <div className='col-5 text-break mb-4'>
                    <label style={{ fontSize: '3rem' }}>Usuario: {user?.name}</label>
                    <div className='col-12'  style={{ backgroundColor: 'white', height: '0.3vh'}}></div>
                </div>
                <div className='col-5 text-break mb-4'>
                    <label style={{ fontSize: '3rem' }}>Email: {user?.email}</label>
                    <div style={{ backgroundColor: 'white', height: '0.3vh' }}></div>
                </div>
            </div>
        </div>
    );
}
