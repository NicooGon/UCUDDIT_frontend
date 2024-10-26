import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import './LeftBar.css';

export default function LeftBar() {
    return (
        <div className="col-12 col-md-2 d-flex flex-column border border-secondary text-break" id="leftBarContainer">
            <div className='d-flex flex-column ' style={{ height: '94.7vh', width:'auto' }}>
                <a href='/' className='d-flex justify-content-center align-items-center link-light link-underline-opacity-0 mt-5 p-3'>
                    <div id='homeButton' className='d-flex align-items-center rounded p-2'>
                        <FontAwesomeIcon icon={faHouse} className='fs-3' />
                        <label className='fs-3 ms-2'>Home</label>
                    </div>   
                </a>
            </div>
        </div>
    );
}
