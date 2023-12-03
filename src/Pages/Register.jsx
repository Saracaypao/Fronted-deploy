import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import '../assets/registerStyle.css';
import Auth from '../api/registerService';

const Register = () => {

    const [formData, setFormData] = useState({
        nombre: "",
        usuario: "",
        correo: "",
        contrasena: "",
    });

    const navigate = useNavigate();

    const auth = new Auth()

    const onFormChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const { nombre, usuario, correo, contrasena } = formData;

        console.log(nombre, usuario, correo, contrasena);

        // Validate password
        if (!validatePassword(contrasena)) {
            alert("La contraseña debe tener al menos 8 caracteres, una letra mayúscula y un número.");
            return;
        }

        // Register user
        auth.register(nombre, usuario, correo, contrasena)
            .then((res) => {
                console.log(res);
                if (res === 200) {
                    navigate("/home");
                } else {
                    console.error("Registration failed");
                }
            })
            .catch((err) => {
                console.error("Registration failed:", err);
            });
    }


    const contrasenaRegexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,32})/;

    const validatePassword = (contrasena) => {
        return contrasenaRegexp.test(contrasena);
    }

    useEffect(() => {
        console.log(formData)
    }, [formData]);


    return (
        <div className="ContentRegister">
            <form className="inputsRegister" onSubmit={handleSubmit}>
                <Link className='Back' to='/login' > <img alt='BackIcon' src='back.png' /> </Link>
                <img className='BGImage' alt="Imagen de fondo logo" src="fondoLogo.png" />
                <p className='RegisterText'> REGISTRATE</p>
                <input className="BoxesRegister" name="nombre" type="text" maxLength={100} placeholder="  Escribe tu nombre" onChange={onFormChange} required />
                <input className="BoxesRegister" name="usuario" type="text" placeholder="  Escribe tu usuario" onChange={onFormChange} required />
                <input className="BoxesRegister" name="correo" type="email" placeholder=" Escribe tu correo" onChange={onFormChange} required />
                <input className="BoxesRegister" name="contrasena" type="password" placeholder="  Escribe tu contraseña" onChange={onFormChange} required />
                <button className="BoxButtons" type="submit">Iniciar Sesión</button>
            </form>
        </div>
    )
}

export default Register;


