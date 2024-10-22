import LeftBar from '../LeftBar/LeftBar';
import './MainScreen.css';

export default function MainScreen() {
    return (
        <div>
            <div className='d-flex'>
                <LeftBar></LeftBar>
                <div className='col-10 d-flex flex-column  border border-secondary text-break' style={{ height: '94vh' }} id='container'>
                    <label>
                        aaa
                    </label>
                </div>
            </div>
        </div>
        
        
    );
}