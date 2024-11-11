import axios from "axios";

export  async function getTotalLikes(postId) {
    try {
        const response = await axios.get(`http://localhost:8080/likes/${postId}`); 
        return response.data;
    } catch (error) {
        console.error("Error fetching total likes:", error);
        throw error; 
    }
}

export async function saveTotalLikes(rateData) {
    try {
        const response = await axios.post('http://localhost:8080/save', rateData);
        return response.data;
    } catch (error) 
    {
        console.error("Error saving total likes:", error);
        throw error; 
    }
}
