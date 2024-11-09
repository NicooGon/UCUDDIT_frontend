import { useAuth0 } from "@auth0/auth0-react";
import "./Comment.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpLong, faDownLong } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";

export default function Comment({ post, content, user: postUser, creationDate }) {
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
        <div className="col-12 col-md-5 border-3 rounded-4 mt-3">
            <div className='col-12' style={{ backgroundColor: 'rgb(57, 57, 57)', height: '0.1vh' }}></div>
            <div className="d-flex flex-column justify-content-between mt-3" id='containerPost'>
                <div className="d-flex align-items-center mb-2">
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
                    <label className="fs-5 ms-3">{creationDate}</label>
                </div>

                <div className="d-flex flex-column align-items-start justify-content-start text-start ">
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
                        >
                            <FontAwesomeIcon className='fs-4' style={{ color: likeButton ? 'white' : 'lightBlue' }} icon={faUpLong} />
                        </button>
                        <div className="fs-4">1</div>
                        <button
                            className="btn btn-light rounded-circle ms-1"
                            id='dislikeButton'
                            onClick={dislikeButtonPulsed}
                        >
                            <FontAwesomeIcon className='fs-4' style={{ color: dislikeButton ? 'white' : 'lightBlue' }} icon={faDownLong} />
                        </button>
                    </div>
                </div>
            </div>
            <div className='col-12 mt-2 mb-3' style={{ backgroundColor: 'rgb(57, 57, 57)', height: '0.1vh' }}></div>
        </div>
    );
}
