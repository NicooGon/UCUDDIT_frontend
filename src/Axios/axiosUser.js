import axios from "axios";

export async function CreateUser(userData) {
    try {
        const response = await axios.post('http://localhost:8080/user', userData);
        return response.data;
    } 
    catch (error) {
        console.error("Error creating user:", error);
        throw error; 
    }
}
