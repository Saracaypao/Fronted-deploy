import axios from 'axios';

export default class CommentService {

    async createComment(comment, token) {

        try {
            const response = await axios.post(`api/comment/`, {
                comentario: comment
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            return response.status;

        } catch (error) {
            console.error('Error creando comentario', error);
            throw error;
        }

    }

}
