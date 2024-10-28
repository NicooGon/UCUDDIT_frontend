import LeftBar from "../../Components/LeftBar/LeftBar";
import './SubmitPost.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";

export default function SubmitPost() {
    const [image, setImage] = useState();
    const [fileName, setFileName] = useState();

    const inputClick = () => {
        document.getElementById('fileInput').click();
    };

    const typeInput = (e) => {
        e.target.style.height = 'auto'; 
        e.target.style.height = `${e.target.scrollHeight}px`; 
    };
    
    return (
        <div className="container-fluid d-flex flex-column flex-md-row p-0">
            <LeftBar />
            <div className='col-12 col-md-10 d-flex flex-column justify-content-center align-items-center border border-secondary text-break' style={{ minHeight: '94.87vh', padding: '0', margin: '0' }} id='container'>
                <label className="fw-bold fs-3 mb-3 text-center">Create a Post</label>
                <div className="col-12 col-md-8 col-lg-6 custom-SubmitPost-container d-flex flex-column">
                    <textarea 
                        className="border border-secondary rounded p-3 mb-3" 
                        id="textPost"
                        rows="2"
                        placeholder="Put a title!"
                        maxLength={150}
                        style={{
                            width: '100%',
                            fontSize: '1.5rem'
                        }}
                        onInput={typeInput}
                        >           
                    </textarea>
                    <div className="border border-secondary rounded p-3 mb-3" id="textImage">
                        <textarea
                            id="textPost"
                            placeholder="Whatever you want!"
                            rows="3"
                            maxLength={300}
                            style={{
                                width: '100%',
                                fontSize: '1.5rem'
                            }}
                            onInput={typeInput}
                        ></textarea>
                        {image && (
                            <img
                                src={image}
                                className="img-fluid mb-3"
                                style={{ maxHeight:'500px', width: '65%', objectFit: 'cover' }}
                                alt="preview"
                            />
                        )}
                        <div style={{ backgroundColor: 'white', height: '1px', width: '100%' }}></div>
                        
                        <button
                            className="btn d-flex justify-content-center align-items-center mt-2"
                            onClick={inputClick}
                        >
                            <FontAwesomeIcon icon={faImage} 
                                id="imageIcon"
                                style={{ height: '28px' }} 
                            />
                        </button>
                    </div>
                    <div className="d-flex justify-content-end mt-1">
                        <button id="postButton" className="btn btn-primary rounded-5 fs-4">
                            Post
                        </button>
                    </div>

                    <input
                        type="file"
                        accept="image/*"
                        id="fileInput"
                        style={{ display: 'none' }}
                        onChange={({ target: { files } }) => 
                            {
                                if (files[0]) 
                                {
                                    setFileName(files[0].name);
                                    setImage(URL.createObjectURL(files[0]));
                                }
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
