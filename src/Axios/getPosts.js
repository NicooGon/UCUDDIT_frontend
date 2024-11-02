import axios from "axios";

export default async function getPosts() {
    const response = await axios.get('http://localhost:8080/posts'); 
    return response.data; 
}
