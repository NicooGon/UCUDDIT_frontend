import "./PostButton.css";
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function PostButton() {
    const [postState, setPostState] = useState(false);
    const navigate = useNavigate();

    const togglePostTrue = () => {
        setPostState(true);
        navigate('/post');
    }

    const togglePostFalse = () => {
        setPostState(false);
    }

    return (
        <div className="col-5 col-sm-2 col-md-5 col-lg-4"> 
            <button 
                className='btn btn-primary col-12 fs-4 rounded-pill d-flex align-items-center justify-content-center' 
                id='buttonPost' 
                onClick={togglePostTrue}
            >
                <FontAwesomeIcon icon={faPlus} /> 
                <div className="ms-2">Post</div> 
            </button>
            {postState && (
                <div></div> 
            )}
        </div>
    );
}
