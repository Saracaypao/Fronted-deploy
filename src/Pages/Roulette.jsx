import React, { useEffect, useState } from 'react';
import { Wheel } from 'react-custom-roulette';
import { Link, useNavigate } from 'react-router-dom';
import '../assets/Roulette.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Roulette = () => {

    const data = [
        { option: 'Capital', style: { backgroundColor: '#85bb65', textColor: 'black' } },
        { option: 'Capital Financiero', style: { backgroundColor: '#3184e1', textColor: 'black' } },
        { option: 'Inversión', style: { backgroundColor: '#0a498f', textColor: 'white' } },
        { option: 'Inflación', style: { backgroundColor: '#85bb65', textColor: 'black' } },
        { option: 'Mercado de Valores', style: { backgroundColor: '#3184e1', textColor: 'black' } },
        { option: 'Balance y Punto de Equilibrio', style: { backgroundColor: '#0a498f', textColor: 'white' } },
        { option: 'Liquidez', style: { backgroundColor: '#85bb65', textColor: 'black' } },
        { option: 'Diversificación"', style: { backgroundColor: '#3184e1', textColor: 'black' } },
        { option: 'Riesgo Financiero', style: { backgroundColor: '#0a498f', textColor: 'white' } },
        { option: 'Rentabilidad y Rendimiento', style: { backgroundColor: '#85bb65', textColor: 'black' } },
        { option: 'Dividendos', style: { backgroundColor: '#3184e1', textColor: 'black' } },
        { option: 'Decisiones Financieras Estratégicas', style: { backgroundColor: '#0a498f', textColor: 'white' } },
        { option: 'Impuestos', style: { backgroundColor: '#85bb65', textColor: 'black' } },
        { option: 'Gestión de Deudas', style: { backgroundColor: '#3184e1', textColor: 'black' } },
        { option: 'Presupuesto de Emergencia', style: { backgroundColor: '#0a498f', textColor: 'white' } },
        { option: 'Construcción de Historial Crediticio', style: { backgroundColor: '#85bb65', textColor: 'black' } },
        { option: 'Seguros y Protección Financiera', style: { backgroundColor: '#3184e1', textColor: 'black' } },
    ];

    //Obtener el token del localStorage
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    //Si no hay token, redireccionar al login
    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, [token, navigate]);

    if (!token) {
        return null;
    }

    //Borrando el token del localStorage
    const logOut = () => {
        localStorage.removeItem('token');
        window.location.href = '/';
    }

    const [mustSpin, setMustSpin] = useState(false);
    const [prizeNumber, setPrizeNumber] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);

    const handleSpinClick = () => {
        if (!mustSpin) {
            const newPrizeNumber = Math.floor(Math.random() * data.length);
            setPrizeNumber(newPrizeNumber);
            setMustSpin(true);
        }
    }

    const onHandleClick = () => {
        if (selectedOption != null) {
            navigate('/quiz');
        } else {
            toast.error("Gira la ruleta para seleccionar un tema");
        }
    }

    return (
        <>
            <div className="Roulette" >
                <div>
                    <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} draggable pauseOnHover />
                </div>
                <div className='HomeHeader'>
                    <Link className='Back' to='/home' > <img alt='BackIcon' src='back.png' style={{ width: '40px' }} /> </Link>
                    <img className="LogoHome" alt="Logo-Financiamigos" src="logo.png" />
                    <p className='FText'> Financiamigos </p>
                    <img className='Menu' alt='Menu-Hamburguesa' src='logout.png' onClick={logOut} />
                </div>
                <div align="center" className='roulette-container'>
                    <Wheel
                        mustStartSpinning={mustSpin}
                        prizeNumber={prizeNumber}
                        data={data}
                        onStopSpinning={() => {
                            setMustSpin(false);
                            setSelectedOption(data[prizeNumber].option);
                            var subject = data[prizeNumber].option;
                            localStorage.setItem("subject", subject);
                        }}
                        outerBorderColor="white"
                        innerBorderColor="white"
                        radiusLineColor="white"
                        fontFamily="Helvetica"
                        fontSize="11"
                        radiusLineWidth="0"
                    />
                    <div className='opSelected' >
                        Opción seleccionada: {selectedOption}
                    </div>
                    <div className='botones'>
                        <button className="spin-button" onClick={handleSpinClick}>Girar</button>
                        <button className="custom-button" onClick={onHandleClick}>Vamos</button>
                    </div>
                    <div className='temas'>
                        <label className='Ruletemas'>Ruletemas</label>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Roulette;