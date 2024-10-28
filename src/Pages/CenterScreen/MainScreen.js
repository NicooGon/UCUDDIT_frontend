import LeftBar from '../../Components/LeftBar/LeftBar';
import './MainScreen.css';
import Post from '../../Components/Post/Post'

export default function MainScreen() {
    return (
        <div className='d-flex flex-column flex-md-row'>
            <LeftBar />
            <div className='col-12 col-md-10 d-flex flex-column align-items-center border border-secondary text-break' style={{ height: '94.87vh' }} id='container'>
                <Post></Post>  
                <Post></Post>
            </div>
        </div>
    );
}
