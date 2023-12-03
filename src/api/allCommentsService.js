import axios from 'axios';

export default class AllCommentService {
    async getComments() {
        try {
            const token = localStorage.getItem('token');

            const response = await axios.get(`api/comment/comments`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                return response.data;
            } else {
                return [];
            }
        } catch (error) {
            console.error('Creación de comentario fallido:', error.response?.data);
            return Promise.reject(error.response?.data || 'Creación de comentario fallido');
        }
    }
}



