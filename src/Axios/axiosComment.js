import axios from "axios";

export async function CreateComment(commentData) {
    try {
        const response = await axios.post('http://localhost:8080/comments', commentData);
        return response.data;
    } 
    catch (error) {
        console.error("Error creating comment:", error);
        throw error; 
    }
}
