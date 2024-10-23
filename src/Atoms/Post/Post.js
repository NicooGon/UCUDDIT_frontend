import LeftBar from "../../Components/LeftBar/LeftBar";
import './Post.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';


export default function Post()
{
    const inputClick = () => 
    {
        document.getElementById('fileInput').click();
    };

    return(
        <div>
            <div className='d-flex'>
                <LeftBar></LeftBar>
                <div className='col-10 d-flex flex-column justify-content-evenly align-items-center border border-secondary text-break' style={{ height: '94vh' }} id='container'>
                    <label className="fw-bold">Create a Post</label>
                    <div className="col-4 custom-post-container  d-flex flex-column ">
                        <textarea class="col-12 form-control" id="inputPost" placeholder="Whatever you want!" rows="7"></textarea>
                        <input type="file" id="fileInput" style={{ display: 'none' }}></input>
                        <button className="d-flex justify-content-center align-items-center mt-2" onClick={inputClick} style={{height:'2.8vh', width:'2.8vh'}}>
                            <FontAwesomeIcon icon={faImage} id="imageIcon" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}