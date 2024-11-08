import axios from "axios";

export default async function saveTotalLikes(rateData) {
    const response = await axios.post('http://localhost:8080/save', rateData)
    return response.data;
}
