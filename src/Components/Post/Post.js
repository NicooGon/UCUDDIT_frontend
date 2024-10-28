import { useAuth0 } from "@auth0/auth0-react";
import "./Post.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpLong, faDownLong,} from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import { useState } from "react";


export default function Post(){
    const {user} = useAuth0();
    const [like, setLike] = useState(true);
    const [dislike, setDisLike] = useState(true);

    const likePulsed= () =>{
        setLike(!like);
        if(!dislike)
        {
            setDisLike(true);
        }
    }

    const disLikePulsed = () => {
        setDisLike(!dislike);
        if(!like)
        {
            setLike(true);
        }
    };

    return (
        
        <div className="col-5 border-3 rounded-4 mt-5">
            <div className='col-12' style={{ backgroundColor: 'rgb(57, 57, 57)', height: '0.1vh'}}></div>

            <div className=" d-flex flex-column justify-content-between mt-3" id='containerPost' style={{ height: '50vh' }}>
            
                <div className="d-flex align-items-center">
                    <div 
                        className='img-fluid rounded-circle border border-white' 
                        style={{ 
                            backgroundImage: `url(${user?.picture})`, 
                            height: '40px', 
                            width: '40px', 
                            backgroundSize: 'cover', 
                            backgroundPosition: 'center', 
                            backgroundRepeat: 'no-repeat', 
                        }} 
                    />
                    <label className="fs-5 ms-3"> {user?.name}</label>
                </div>
                <div className="d-flex">
                    <div className="d-flex justify-content-center align-items-center rounded-5" id="likesContainer">
                        <button
                            className="d-flex justify-content-center align-items-center fs-3 me-3"
                            id='likeButton'   
                            onClick={likePulsed}
                        >
                            {like ? (
                                <FontAwesomeIcon id="likeIcon" className='fs-3' icon={faUpLong} />
                            ) : (
                                <FontAwesomeIcon id="likeIcon" className='fs-3' style={{ color: 'lightBlue' }} icon={faUpLong} />
                            )}
                        </button>
                        
                        <button 
                            className="d-flex justify-content-center align-items-center fs-3 ms-1"
                            id='dislikeButton'
                            onClick={disLikePulsed}    
                        >  
                            {dislike ? (
                                <FontAwesomeIcon id="disLikeIcon" className='fs-3' icon={faDownLong} />
                            ) : (
                                <FontAwesomeIcon id="disLikeIcon" className='fs-3' style={{ color: 'lightBlue' }} icon={faDownLong} />
                            )}
                        </button>
                    </div>

                    <div className="d-flex justify-content-center align-items-center rounded-5 ms-4" id="containerComment">
                        <button id="commentButton" className="d-flex justify-content-center align-items-center">
                            <FontAwesomeIcon className='fs-3' icon={faComment} style={{color: 'white'}} />
                        </button>

                    </div>
                </div>
            </div>
            <div className='col-12 mt-2 mb-3' style={{ backgroundColor: 'rgb(57, 57, 57)', height: '0.1vh'}}></div>
        </div>
    );
}