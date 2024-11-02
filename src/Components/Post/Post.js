import { useAuth0 } from "@auth0/auth0-react";
import "./Post.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpLong, faDownLong } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import { useState, useEffect} from "react";

export default function Post({ title, content, user, createdAt }) {
    const { isAuthenticated } = useAuth0();
    const [likeButton, setlikeButton] = useState(true);
    const [dislikeButton, setDislikeButton] = useState(true);
    
    const likeButtonPulsed = () => {
        if (isAuthenticated) {
            setlikeButton(!likeButton);
            if (!dislikeButton) {
                setDislikeButton(true);
            }
        } else {
            alert("You must register or log in to rate.");
        }
    };

    const dislikeButtonPulsed = () => {
        if (isAuthenticated) {
            setDislikeButton(!dislikeButton);
            if (!likeButton) {
                setlikeButton(true);
            }
        } else {
            alert("You must register or log in to rate.");
        }
    };

    const typeInput = (e) => {
        e.target.style.height = 'auto'; 
        e.target.style.height = `${e.target.scrollHeight}px`; 
    };

    return (
        <div className="col-5 border-3 rounded-4 mt-5">
            <div className='col-12' style={{ backgroundColor: 'rgb(57, 57, 57)', height: '0.1vh'}}></div>
            <div className="d-flex flex-column justify-content-between mt-3" id='containerPost' onInput={typeInput} style={{ height: '50vh' }}>
                <div className="d-flex align-items-center">
                    <div
                        className='img-fluid rounded-circle border border-white'
                        style={{
                            backgroundImage: `url(${user?.imageUrl})`,
                            height: '40px',
                            width: '40px',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                        }}
                    />
                    <label className="fs-5 ms-3"> {user?.name}</label>
                    <label className="fs-5 ms-3">{createdAt}</label>
                </div>
                
                <div className="d-flex flex-column align-items-start justify-content-start" style={{height:"80%"}}>
                    <div>
                        <label className="fs-1">{title}</label>
                    </div>
                    <div className="fs-2">
                        <p>{content}</p>
                    </div>
                </div>

                <div className="d-flex">
                    <div className="d-flex justify-content-center align-items-center rounded-5" id="likesContainer">
                        <button
                            className="d-flex justify-content-center align-items-center fs-3 me-2"
                            id='likeButton'
                            onClick={likeButtonPulsed}
                        >
                            {likeButton ? (
                                <FontAwesomeIcon id="likeIcon" className='fs-4' icon={faUpLong} />
                            ) : (
                                <FontAwesomeIcon id="likeIcon" className='fs-4' style={{ color: 'lightBlue' }} icon={faUpLong} />
                            )}
                        </button>
                        <div className="fs-4">0</div>
                        <button 
                            className="d-flex justify-content-center align-items-center fs-3 ms-2"
                            id='dislikeButton'
                            onClick={dislikeButtonPulsed}
                        >  
                            {dislikeButton ? (
                                <FontAwesomeIcon id="disLikeIcon" className='fs-4' icon={faDownLong} />
                            ) : (
                                <FontAwesomeIcon id="disLikeIcon" className='fs-4' style={{ color: 'lightBlue' }} icon={faDownLong} />
                            )}
                        </button>
                    </div>

                    <div className="d-flex justify-content-center align-items-center rounded-5 ms-4" id="containerComment">
                        <button id="commentButton" className="d-flex justify-content-center align-items-center">
                            <FontAwesomeIcon className='fs-3' icon={faComment} style={{ color: 'white' }} />
                        </button>
                    </div>
                </div>
            </div>
            <div className='col-12 mt-2 mb-3' style={{ backgroundColor: 'rgb(57, 57, 57)', height: '0.1vh'}}></div>
        </div>
    );
}
