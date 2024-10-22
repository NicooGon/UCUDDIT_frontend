import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import './LeftBar.css';

export default function LeftBar() {
    return (
        <div className="col-2">
            <div className='col-12 d-flex flex-column  border border-secondary text-break' style={{ height: '94vh' }} id='container'>
                <a href='/' className='d-flex justify-content-center align-items-center link-light link-underline-opacity-0 mt-5' >
                    <div id='homeButton' className='rounded'>
                        <FontAwesomeIcon icon={faHouse} className='fs-3' />
                        <label className='fs-3 ms-2 ' >Home</label>
                    </div>   
                </a>
            </div>
        </div>
    );
}
