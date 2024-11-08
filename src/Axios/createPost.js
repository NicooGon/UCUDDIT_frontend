import axios from "axios";

export default async function CreatePost(postData) {
    const response = await axios.post('http://localhost:8080/save/posts', postData);  
    return response.data;
}
