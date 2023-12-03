import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { UserContext } from "../context"
import { useNavigate } from "react-router-dom";
import '../assets/loginStyle.css';
import Auth from '../api/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {

    localStorage.removeItem('token');

    const [correo, setCorreo] = useState("");
    const [contrasena, setContrasena] = useState("");
    const navigate = useNavigate();
    const { updateUserEmail } = useContext(UserContext);

    const auth = new Auth()

    const onHandleCorreoChange = (e) => {
        setCorreo(e.target.value)
    }

    const onHandleContrasenaChange = (e) => {
        setContrasena(e.target.value)
    }

    const test = async () => {
        try {
            if (!correo || !contrasena) {
                toast.error("Por favor, completa todos los campos.");
                return;
            }

            const LogIn = auth.logIn(correo, contrasena);

            LogIn.then((res) => {
                if (res === 200) {
                    localStorage.setItem('correo', correo);
                    updateUserEmail(correo);
                    navigate("/home");
                } else {
                    toast.error("Error al iniciar sesión. Por favor, ingrese los datos correctamente");
                }
            }).catch((error) => {
                toast.error("Error al iniciar sesión. Por favor, ingrese los datos correctamente");
                console.log(error);
            });
        } catch (error) {
            toast.error("Error al iniciar sesión. Por favor, ingrese los datos correctamente");
            console.log(error);
        }
    }



    return (
        <div className='LoginPage'>
            <div>
                <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} draggable pauseOnHover />
            </div>
            <img className='ImageI' alt='Imagen-Dollars' src='imagen.png' />
            <div className="LoginContainer">
                <div className="Body" >
                    <div className="Header">
                        <img className="image" alt="Image" src="logo.png" />
                        <span className="titulo"> FINANCIAMIGOS</span>
                    </div>
                    <h2 className="WC"> BIENVENIDO</h2>
                    <div className="BoxWhite">
                        <div className="MailContainer">
                            <div className="MailText">
                                <p className="headerMail">Correo Electrónico</p>
                                <input className="UserMail" type="email" placeholder="  Escribe tu correo " onChange={onHandleCorreoChange} />
                            </div>
                        </div>
                        <div className="PasswordContainer">
                            <p className="pw"> Contraseña </p>
                            <input className="UserMail2" type="password" placeholder=" Escribe tu contraseña" onChange={onHandleContrasenaChange} />
                        </div>
                        <div className="LoginButton">
                            <button className="Button" type="button" onClick={test}>Iniciar Sesión</button>
                        </div>
                        <div className="ContentLink">
                            <p className="pLink">  ¿Todavía no tienes cuenta?<Link className="RegisterButton" to="/register" >  Crea una ahora </Link></p>
                        </div>
                    </div>
                </div>
            </div>
            <img className="imgFondoLog" src="loginBGM.png" />
        </div>
    )
}

export default Login;    