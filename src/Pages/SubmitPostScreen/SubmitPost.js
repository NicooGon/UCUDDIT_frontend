import './SubmitPost.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";
import { createPost } from '../../Axios/axiosPost';
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from 'react-router-dom';
import { Toast, ToastContainer } from 'react-bootstrap';

export default function SubmitPost() {
    const [image, setImage] = useState();
    const [fileName, setFileName] = useState();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [community, setCommunity] = useState('');
    const { user } = useAuth0();
    const [showToast, setShowToast] = useState(false);
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

    const options = [
        { label: "General", value: 1 },
        { label: "Informatics", value: 2 },
        { label: "Psychology", value: 3 },
        { label: "Business", value: 4 },
    ];

    const saveCommunity = (e) => {
        setCommunity(e.target.value);
    }

    const handlePost = async () => {
        if (title.trim() === '') {
            alert('Title is required!');
            return;
        }
        if (content.trim() === '') {
            alert('Content is required!');
            return;
        }
        if (community === '') {
            alert('Community is required!');
            return;
        }

        const postData = {
            user: { auth0id: user.sub },
            title: title,
            content: content,
            community: community,
        };

        await createPost(postData);

        setShowToast(true);
        setTimeout(() => navigate('/'), 3000);
    };

    return (
        <div className='col-12 col-md-10 d-flex flex-column justify-content-center align-items-center border border-secondary text-break' id='container'>
            <label className="fw-bold fs-3 mb-3 text-center">Create a Post</label>

            <div >
                <select className="fs-5 form-select w-100 mb-4" onChange={saveCommunity} style={{ backgroundColor: 'rgb(59, 59, 59)', color: 'white' }}>
                    <option value="" disabled selected>Select a community!</option>
                    {options.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>

            </div>

            <div className="col-12 col-md-8 col-lg-6d-flex flex-column">
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
            <ToastContainer className="toast-container">
                <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide>
                    <Toast.Header>
                        <strong className="me-auto">Post</strong>
                    </Toast.Header>
                    <Toast.Body style={{ color: 'black' }}>Your post has been created successfully!</Toast.Body>
                </Toast>
            </ToastContainer>
        </div>
    );
}
