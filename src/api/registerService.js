import axios from 'axios';

export default class registerService {
    async register(nombre, usuario, correo, contrasena) {
        try {
            const response = await axios.post('api/user/newUser', { nombre, usuario, correo, contrasena });
            return response.status;
        } catch (error) {
            console.error("Registro fallido:", error.response?.data);
            return Promise.reject(error.response?.data || "Registro fallido");
        }
    }
}


