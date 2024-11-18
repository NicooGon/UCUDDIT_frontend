import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import './LeftBar.css';
import UCU from './1579542124909.jpeg'; 
import Informatics from './1695133555250.jpeg';
import Psychology from './images.jpeg';
import Business from './5254.jpg';

export default function LeftBar() {
    return (
        <div className="col-12 col-md-2 d-flex flex-column border border-secondary text-break" id="leftBarContainer">
            <div className='d-flex flex-column justify-content-between ' style={{ height: '94.7vh', width:'100%' }}>
                <a href='/' className='d-flex justify-content-center align-items-center link-light link-underline-opacity-0 mt-5 p-3'>
                    <div id='homeButton' className='d-flex align-items-center rounded p-2' style={{ zIndex: 10 }}>
                        <FontAwesomeIcon icon={faHouse} className='fs-3' />
                        <label className='fs-3 ms-2'>Home</label>
                    </div>   
                </a>

                <a href={`/postsCommunity/1`} className='d-flex justify-content-center align-items-center link-light link-underline-opacity-0 mt-3 p-3'>
                    <div 
                        id='homeButton' 
                        className='d-flex align-items-center justify-content-center rounded p-2' 
                        style={{
                            backgroundImage: `url(${UCU})`, 
                            backgroundPosition: 'center', 
                            backgroundSize: 'cover', 
                            minHeight: '13vh',
                            width: '75%', 
                            marginBottom: '1rem' 
                        }}
                    >
                        <label className='fs-3 ms-2'>General</label>
                    </div>
                </a>

                <a href={`/postsCommunity/2`} className='d-flex justify-content-center align-items-center link-light link-underline-opacity-0 mt-3 p-3'>
                    <div 
                        id='homeButton' 
                        className='d-flex align-items-center justify-content-center rounded p-2' 
                        style={{
                            backgroundImage: `url(${Informatics})`, 
                            backgroundPosition: 'center', 
                            backgroundSize: 'cover', 
                            minHeight: '13vh',
                            width: '75%', 
                            marginBottom: '1rem'
                        }}
                    >
                        <label className='fs-3 ms-2'>Informatics</label>
                    </div>
                </a>

                <a href={`/postsCommunity/3`} className='d-flex justify-content-center align-items-center link-light link-underline-opacity-0 mt-3 p-3'>
                    <div 
                        id='homeButton' 
                        className='d-flex align-items-center justify-content-center rounded p-2' 
                        style={{
                            backgroundImage: `url(${Psychology})`, 
                            backgroundPosition: 'center', 
                            backgroundSize: 'cover', 
                            minHeight: '13vh',
                            width: '75%', 
                            marginBottom: '1rem'
                        }}
                    >
                        <label className='fs-3 ms-2'>Psychology</label>
                    </div>
                </a>


                <a href={`/postsCommunity/4`} className='d-flex justify-content-center align-items-center link-light link-underline-opacity-0 mt-3 p-3'>
                    <div 
                        id='homeButton' 
                        className='d-flex align-items-center justify-content-center rounded p-2' 
                        style={{
                            backgroundImage: `url(${Business})`, 
                            backgroundPosition: 'center', 
                            backgroundSize: 'cover', 
                            minHeight: '13vh',
                            width: '75%', 
                            marginBottom: '1rem'
                        }}
                    >
                        <label className='fs-3 ms-2'>Business</label>
                    </div>
                </a>
            </div>
        </div>
    );
}
