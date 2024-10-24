import LeftBar from "../../Components/LeftBar/LeftBar";
import './Post.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";

export default function Post()
{
    const[image, setImage] = useState();
    const[fileName,setFileName] = useState();
    const inputClick = () => 
    {
        document.getElementById('fileInput').click();
    };

    return(
        <div>
            <div className='d-flex'>
                <LeftBar></LeftBar>
                <div className='col-10 d-flex flex-column justify-content-center align-items-center border border-secondary text-break' style={{ height: '94vh' }} id='container'>
                    <label className="fw-bold">Create a Post</label>
                    <div className="col-4 custom-post-container mt-5 d-flex flex-column ">
                        <div className="border border-secondary-4 rounded " id="textImage">
                            <textarea class="col-12 fs-5" id="textPost" placeholder="Whatever you want!" rows="7"></textarea>
                            {image && <img src={image} style={{ maxWidth: '100%', maxHeight: '30vh' }} />}
                            <div  style={{backgroundColor:'white', height:'0.1vh', width:'50vh'}} ></div>
                            <button className="d-flex justify-content-center align-items-center ms-2 mt-2 mb-2" onClick={inputClick} style={{height:'2.8vh', width:'2.8vh'}}>
                                <FontAwesomeIcon icon={faImage} id="imageIcon" />
                            </button>
                        </div>
                        <div className="d-flex justify-content-end">
                            <button id="postButton" className="rounded-5 mt-3 fs-4">
                                Post
                            </button>
                        </div>
                        
                        <input multiple type="file" accept="image/*, video/*" id="fileInput" style={{ display: 'none' }} onChange={({target:{files}})=>{
                            files[0] && setFileName(files[0].name)
                            if(files)
                            {
                                setImage(URL.createObjectURL(files[0]))
                            }
                        }} ></input>

                        
                    </div>
                    
                </div>
            </div>
        </div>
    );
}