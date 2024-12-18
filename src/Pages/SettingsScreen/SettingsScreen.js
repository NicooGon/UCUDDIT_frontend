import { useAuth0 } from '@auth0/auth0-react';

export default function SettingsScreen() {
    const { user } = useAuth0();
    return (

        <div className='col-12 col-md-10 d-flex flex-column justify-content-evenly align-items-center border border-secondary text-break' style={{ minHeight: '94.9vh' }} id='container'>

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
                <label style={{ fontSize: '2.5rem' }}>Name: {user?.given_name}</label>
                <div className='col-12' style={{ backgroundColor: 'white', height: '0.3vh' }}></div>
            </div>

            <div className='col-5 text-break mb-4'>
                <label style={{ fontSize: '2.5rem' }}>User: {user?.name}</label>
                <div className='col-12' style={{ backgroundColor: 'white', height: '0.3vh' }}></div>
            </div>

            <div className='col-5 text-break mb-4'>
                <label style={{ fontSize: '2.5rem' }}>Email: {user?.email}</label>
                <div style={{ backgroundColor: 'white', height: '0.3vh' }}></div>
            </div>
            
        </div>
    );
}
