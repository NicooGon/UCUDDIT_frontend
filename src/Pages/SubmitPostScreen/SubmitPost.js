import LeftBar from "../../Components/LeftBar/LeftBar";
import './SubmitPost.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from "react";
import { createPost } from '../../Axios/axiosPost';
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from 'react-router-dom';

export default function SubmitPost() {
    const [image, setImage] = useState();
    const [fileName, setFileName] = useState();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const { user } = useAuth0();
    const navigate = useNavigate();

    const inputClick = () => {
        document.getElementById('fileInput').click();
    };

    const typeInput = (e) => {
        e.target.style.height = 'auto';
        e.target.style.height = `${e.target.scrollHeight}px`;
    };

    const saveTitle = (e) => {
        setTitle(e.target.value);
    };

    const saveContent = (e) => {
        setContent(e.target.value);
    };

    const handlePost = async () => {
        if (title.trim() === '' || content.trim() === '') {
            alert('Title and content are required!');
            return;
        }

        const postData = {
            user: { auth0id: user.sub },
            title: title,
            content: content,
        };
        const newPost = await createPost(postData);
        alert('Post submitted successfully!');
        navigate('/');
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
                        maxLength={50}
                        style={{
                            width: '100%',
                            fontSize: '1.5rem'
                        }}
                        onInput={typeInput}
                        onChange={saveTitle}
                        value={title}
                    />
                    <div className="border border-secondary rounded p-3 mb-3" id="textImage">
                        <textarea
                            id="textPost"
                            placeholder="Whatever you want!"
                            rows="3"
                            maxLength={600}
                            style={{
                                width: '100%',
                                fontSize: '1.5rem'
                            }}
                            onInput={typeInput}
                            onChange={saveContent}
                            value={content}
                        />
                        {image && (
                            <img
                                src={image}
                                className="img-fluid mb-3"
                                style={{ maxHeight: '500px', width: '65%', objectFit: 'cover' }}
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
                        <button
                            id="postButton"
                            className="btn btn-primary rounded-5 fs-4"
                            onClick={handlePost}
                        >
                            Post
                        </button>
                    </div>

                    <input
                        type="file"
                        accept="image/*"
                        id="fileInput"
                        style={{ display: 'none' }}
                        onChange={({ target: { files } }) => {
                            if (files[0]) {
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
