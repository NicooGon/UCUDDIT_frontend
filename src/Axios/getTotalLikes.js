import axios from "axios";

export default async function getTotalLikes() {
    const response = await axios.get('http://localhost:8080/total/likes'); 
    return response.data; 
}
