import axios from 'axios';

export default class quizzService {
    async quizz(subject) {
        try {
            const response = await axios.get(`api/quiz/bySubject/${subject}`)
            return response.data; 
        } catch (error) {
            console.error("Carga de quiz fallido:", error.response?.data);
            return Promise.reject(error.response?.data || "Quiz fallido");
        }
    }
}