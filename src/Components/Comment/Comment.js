import { useAuth0 } from "@auth0/auth0-react";
import "./Comment.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpLong, faDownLong } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from "react";
import axios from "axios";

export default function Comment({ content, user: commentUser, creationDate, commentId }) {
    const { isAuthenticated, user } = useAuth0();
    const [likeButton, setLikeButton] = useState(false);
    const [dislikeButton, setDislikeButton] = useState(false);
    const [likesCount, setLikesCount] = useState(0);
    const [disLikesCount, setDisLikesCount] = useState(0);

    useEffect(() => {
        if (isAuthenticated) {
            getUserLikeForComment();
            getLikesCount();
        }
    }, [isAuthenticated]);

    const getUserLikeForComment = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/user/${user?.sub}/comment/${commentId}/like`);
            const userLike = response.data;
            setLikeButton(userLike === 1);
            setDislikeButton(userLike === -1);
        } 
        catch (error) {
            console.error("Error fetching user like:", error);
        }
    };

    const getLikesCount = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/comment/${commentId}/likes`);
            setLikesCount(response.data);
            const responseDislikes = await axios.get(`http://localhost:8080/comment/${commentId}/dislikes`);
            setDisLikesCount(responseDislikes.data);
        } 
        catch (error) {
            console.error("Error fetching likes count:", error);
        }
    };

    const toggleLikeDislike = async (rateValue) => {
        const newRateValue = (likeButton && rateValue === 1) || (dislikeButton && rateValue === -1) ? 0 : rateValue;

        if (isAuthenticated) {
            try {
                await axios.post('http://localhost:8080/toggle/comment', null, {
                    params: {
                        auth0id: user?.sub,
                        commentId,
                        rateValue: newRateValue,
                    }
                });

                if (newRateValue === 1) {
                    setLikeButton(true);
                    setDislikeButton(false);
                } 
                else if (newRateValue === -1) {
                    setLikeButton(false);
                    setDislikeButton(true);
                } 
                else {
                    setLikeButton(false);
                    setDislikeButton(false);
                }

                getLikesCount();
            } 
            catch (error) {
                console.error("Error toggling like/dislike:", error);
            }
        } 
        else {
            alert("You must register or log in to rate.");
        }
    };

    return (
        <div className="col-12 col-md-5 border-3 rounded-4 mt-3">
            <div className='col-12' style={{ backgroundColor: 'rgb(57, 57, 57)', height: '0.1vh' }}></div>
            <div className="d-flex flex-column justify-content-between mt-3" id='containerComment'>
                <div className="d-flex align-items-center mb-2">
                    <div
                        className='circle rounded-circle border border-white'
                        style={{
                            backgroundImage: `url(${commentUser?.imageUrl})`,
                            height: '40px',
                            width: '40px',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            flexShrink: 0,
                        }}
                    />
                    <label className="fs-5 ms-3">{commentUser?.name}</label>
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
                            onClick={() => toggleLikeDislike(1)}
                        >
                            <FontAwesomeIcon className='fs-4' style={{ color: likeButton ? 'lightBlue' : 'white' }} icon={faUpLong} />
                        </button>
                        <div className="fs-4">{likesCount - disLikesCount}</div>
                        <button
                            className="btn btn-light rounded-circle ms-1"
                            id='dislikeButton'
                            onClick={() => toggleLikeDislike(-1)}
                        >
                            <FontAwesomeIcon className='fs-4' style={{ color: dislikeButton ? 'lightBlue' : 'white' }} icon={faDownLong} />
                        </button>
                    </div>
                </div>
            </div>
            <div className='col-12 mt-2 mb-3' style={{ backgroundColor: 'rgb(57, 57, 57)', height: '0.1vh' }}></div>
        </div>
    );
}
