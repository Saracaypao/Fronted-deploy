import axios from 'axios';

export default class LikeCommentsService {
    async likeComment(commentId,token) {
        try {

            const response = await axios.patch(`api/comment/Like/${commentId}`, null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                return response.data;
            } else {
                console.error('Error al dar like al comentario:', response.data);
                return Promise.reject(response.data || 'Error al dar like al comentario');
            }
        } catch (error) {
            console.error('Error al dar like al comentario:', error.response?.data);
            return Promise.reject(error.response?.data || 'Error al dar like al comentario');
        }
    }
}
