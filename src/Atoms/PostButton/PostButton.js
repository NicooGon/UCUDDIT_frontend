import "./PostButton.css"
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function PostButton(){
    const [postState, setPostState] = useState(false);
    const navigate = useNavigate();

    const togglePostTrue = () =>
    {
        setPostState(true);
        navigate('/post');
    }
    const togglePostFalse = () =>
    {
        setPostState(false);
    }

    return(
        <div className="col-3">
            <button className=' col-12 fs-4 rounded-pill d-flex align-items-center justify-content-evenly ' id='buttonPost' onClick={togglePostTrue}>
                <FontAwesomeIcon icon={faPlus}/>
                Post
            </button>
            {postState && (
                <div></div>
            )}
        </div>
            
    );
}