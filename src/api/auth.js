import axios from 'axios';

export default class AuthService {
    async logIn(correo, contrasena) {
        try {
            const response = await axios.post('api/auth/logIn', { correo, contrasena });

            if (response.status === 200) {
                localStorage.setItem('token', response.data.token);
                console.log(response.data.token)
            }
            return response.status;
        } catch (error) {
            return Promise.reject("Log In fallido");
        }
    }
}




