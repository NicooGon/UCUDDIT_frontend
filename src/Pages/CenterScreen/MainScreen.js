import LeftBar from '../../Components/LeftBar/LeftBar';
import './MainScreen.css';

export default function MainScreen() {
    return (
        <div className='d-flex flex-column flex-md-row'>
            <LeftBar />
            <div className='col-12 col-md-10 d-flex flex-column border border-secondary text-break' style={{ height: '94.87vh' }} id='container'>
                <label className='p-3'>
                    aaa
                </label>
            </div>
        </div>
    );
}
