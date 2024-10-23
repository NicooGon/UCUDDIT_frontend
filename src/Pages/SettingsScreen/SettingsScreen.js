import { useAuth0 } from '@auth0/auth0-react';
import LeftBar from '../../Components/LeftBar/LeftBar';

export default function SettingsScreen() {
    const {user} = useAuth0();
    return (
        <div>
            <div className='d-flex'>
                <LeftBar></LeftBar>
                <div className='col-10 d-flex flex-column justify-content-evenly align-items-center border border-secondary text-break' style={{ height: '94vh' }} id='container'>
                    <div className='img-fluid rounded-circle border border-white ' style={{ backgroundImage: `url(${user?.picture})`, height:'15vh', width:'15vh', backgroundSize:'cover' , backgroundPosition:'center', backgroundRepeat:'no-repeat' }}></div>
                    <div>
                        <label>Name: {user?.given_name}</label>
                        <div  style={{backgroundColor:'white', height:'0.3vh', width:'65vh'}} ></div>
                    </div>
                    <div>
                        <label> Usuario: {user?.name}</label>
                        <div  style={{backgroundColor:'white', height:'0.3vh', width:'65vh'}} ></div>
                    </div>
                    <div>
                        <label>Email: {user?.email}</label>
                        <div  style={{backgroundColor:'white', height:'0.3vh', width:'65vh'}} ></div>
                    </div>
                </div>
            </div>
        </div>
        
        
    );
}