import { useAuth0 } from "@auth0/auth0-react";
import "./Post.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpLong, faDownLong } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Post({ title, content, user: postUser, createdAt, postId }) {
    const { isAuthenticated, user } = useAuth0();
    const [likeButton, setLikeButton] = useState(true);
    const [dislikeButton, setDislikeButton] = useState(true);

    const likeButtonPulsed = () => {
        if (isAuthenticated) {
            setLikeButton(!likeButton);
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
                setLikeButton(true);
            }
        } else {
            alert("You must register or log in to rate.");
        }
    };

    return (
        <div className="col-12 col-md-5 border-3 rounded-4 mt-5" style={{ position: 'relative' }}>
            <div className='col-12' style={{ backgroundColor: 'rgb(57, 57, 57)', height: '0.1vh' }}></div>

            <div className="d-flex flex-column justify-content-between mt-3" id='containerPost'>
                <Link to={`/post/${postId}`} style={{ textDecoration: 'none', position: 'absolute', top: 10, left: 0, right: 0, bottom: 20, zIndex: 1 }} />
                
                <div className="d-flex align-items-center">
                    <div
                        className='circle rounded-circle border border-white'
                        style={{
                            backgroundImage: `url(${postUser?.imageUrl})`,
                            height: '40px',
                            width: '40px',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            flexShrink: 0,
                        }}
                    />
                    <label className="fs-5 ms-3">{postUser?.name}</label>
                    <label className="fs-5 ms-3">{createdAt}</label>
                </div>

                <div className="d-flex flex-column align-items-start justify-content-start text-start ">
                    <label className="fs-2 text-light mb-3">{title}</label>
                    <div className="fs-3" id="content">
                        <p>{content}</p>
                    </div>
                </div>
            
            <div className="d-flex flex-column flex-md-row align-items-center mt-2">
                <div className="d-flex justify-content-center align-items-center rounded-5 me-md-4 mb-3 mb-md-0" id="likesContainer">
                    <button
                        className="btn btn-light rounded-circle me-1"
                        id='likeButton'
                        onClick={likeButtonPulsed}
                        style={{ zIndex: 3 }} 
                    >
                        <FontAwesomeIcon className='fs-4' style={{ color: likeButton ? 'white' : 'lightBlue' }} icon={faUpLong} />
                    </button>
                    <div className="fs-4">1</div>
                    <button 
                        className="btn btn-light rounded-circle ms-1"
                        id='dislikeButton'
                        onClick={dislikeButtonPulsed}
                        style={{ zIndex: 3 }} 
                    >
                        <FontAwesomeIcon className='fs-4' style={{ color: dislikeButton ? 'white' : 'lightBlue' }} icon={faDownLong} />
                    </button>
                </div>

                    <div className="d-flex ms-md-4 rounded-5" id="containerComment">
                        <button id="commentButton" className="btn btn-light rounded-circle ms-1 me-1">
                            <FontAwesomeIcon className='fs-4' icon={faComment} style={{ color: 'white' }} />
                        </button>
                        <div className="fs-4 me-3 text-light">31</div>
                    </div>
            </div>
            </div>
            <div className='col-12 mt-2 mb-3' style={{ backgroundColor: 'rgb(57, 57, 57)', height: '0.1vh' }}></div>
            
        </div>
    );
}
