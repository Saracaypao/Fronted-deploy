import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Auth from "../api/quizzService";
import "../assets/Quizz.css";

const Quizz = () => {


    const [preguntas, setPreguntas] = useState([]);
    const [preguntaActual, setPreguntaActual] = useState(0);
    const [respuestaSeleccionadaQuizz, setRespuesta] = useState([]);
    const [puntaje, setPuntaje] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const [subjectVideo, setSubjectVideo] = useState("");

    const subjects = [
        { option: 'Capital', video: 'https://www.youtube.com/embed/Aaq3BRDOTvU?si=Hv_DbxuXd9zdeVOM' },
        { option: 'Capital Financiero', video: 'https://www.youtube.com/embed/FDTFXPlVQDU?si=zLnHGpRqHb22CE4A' },
        { option: 'Inversión', video: 'https://www.youtube.com/embed/clJw_qu8ODI?si=cX166-hkdAs6OB5p' },
        { option: 'Inflación', video: 'https://www.youtube.com/embed/TOVvFXR3jA8?si=5K4lwcNGJXZF_ryM' },
        { option: 'Mercado de Valores', video: 'https://www.youtube.com/embed/KhEQ8HY8UvY?si=TTkmjvdCtPU_q963' },
        { option: 'Balance y Punto de Equilibrio', video: 'https://www.youtube.com/embed/R1fudBO1Fpk?si=hGBKf_-YhquXP0-B' },
        { option: 'Liquidez', video: 'https://www.youtube.com/embed/gAZr_sbgZOA?si=ZAgoojMdv3xs1QLv' },
        { option: 'Diversificación', video: 'https://www.youtube.com/embed/eO9vKqnTbjg?si=Urfll2kzCV2WxbDD' },
        { option: 'Riesgo Financiero', video: 'https://www.youtube.com/embed/dTO8fO-VrOQ?si=OkgXvi5GyaZvpJyz' },
        { option: 'Rentabilidad y Rendimiento', video: 'https://www.youtube.com/embed/i9dKSqgHnB4?si=vQNECkx_kYDNiUV6' },
        { option: 'Dividendos', video: 'https://www.youtube.com/embed/cV-Jnsk2Ggc?si=K0aTsb0NToRVwmyX' },
        { option: 'Decisiones Financieras Estratégicas', video: 'https://www.youtube.com/embed/_4xujg7NOGk?si=mJqQ6LVMZAnFniFM' },
        { option: 'Impuestos', video: 'https://www.youtube.com/embed/c71Ptm9IUmI?si=vgbsqH-PXkrgtq6w' },
        { option: 'Gestión de Deudas', video: 'https://www.youtube.com/embed/PYwED_VkUTA?si=vQqpwZuRO2wSYBfa' },
        { option: 'Presupuesto de Emergencia', video: 'https://www.youtube.com/embed/n2EtjS4FVMw?si=AVIJPW_BHpJtNwXo' },
        { option: 'Construcción de Historial Crediticio', video: 'https://www.youtube.com/embed/ctihdV9Xn2s?si=J1ro7vXGKh4YLV9U' },
        { option: 'Seguros y Protección Financiera', video: 'https://www.youtube.com/embed/XiFxqmrvlUo?si=fNDFhydZqhYhvFwC' },
    ]

    const navigate = useNavigate();

    const auth = new Auth();

    // Leer dato desde localStorage
    var storedSubject = localStorage.getItem("subject");

    useEffect(() => {
        getSubjectVideo();
    }, []);

    const getSubjectVideo = () => {
        subjects.forEach((subject) => {
            if (subject.option === storedSubject) {
                setSubjectVideo(subject.video);
            }
        });
    }


    // Array para darle un orden aleatorio a las preguntas y respuestas
    const shuffleArray = (array) => {
        const newArray = array.slice();
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const temaSeleccionado = storedSubject;
                const response = await auth.quizz(temaSeleccionado);

                // Mezclando preguntas
                const preguntasMezcladas = shuffleArray(response.preguntasPorTema);

                // Mezclando respuestas
                const preguntasConRespuestasMezcladas = preguntasMezcladas.map(
                    (pregunta) => ({
                        ...pregunta,
                        respuestas: shuffleArray(pregunta.respuestas),
                    })
                );

                setPreguntas(preguntasConRespuestasMezcladas);
            } catch (error) {
                console.error("Error al obtener preguntas:", error);
            }
        };

        fetchData();
    }, []);

    const handleRespuestaSeleccionada = (props) => {
        setRespuesta(
            viejasRespuestas => [
                ...viejasRespuestas, props
            ]
        );
    }

    //Puntaje
    const handleRespuestaClick = (respuestaSeleccionada) => {
        const respuestaCorrecta = preguntas[preguntaActual].respuesta_correcta;
        handleRespuestaSeleccionada(respuestaSeleccionada);

        if (respuestaSeleccionada === respuestaCorrecta) {
            setPuntaje((prevPuntaje) => prevPuntaje + 1);

        }

        if (preguntaActual < preguntas.length - 1) {
            setPreguntaActual((prevPregunta) => prevPregunta + 1);
        } else {
            setIsFinished(true);
        }
    };

    const handleVolverClick = () => {
        navigate("/home");
    };

    //Obtener el token del localStorage
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


    return (
        <div className="QuizAll">
            <div className="HomeHeader">
                <img className="LogoHome" alt="Logo-Financiamigos" src="logo.png" />
                <p className="FText"> Financiamigos </p>
            </div>
            {isFinished ? (
                <div className="QuizFinished">
                    <h2 className="TextHeaderQuizFinshed">¡Quiz finalizado!</h2>
                    <p className="Puntaje">Tu puntaje: {puntaje}</p>

                    {
                        preguntas.map((pregunta, index) => {
                            const respuestaCorrecta = pregunta.respuesta_correcta;
                            return (
                                <div className="RespCont" key={index}>
                                    <p className="Pregunta">{pregunta.pregunta}</p>
                                    {
                                        pregunta.respuestas.map((respuesta, rIndex) => {
                                            if (respuestaSeleccionadaQuizz[index] === respuesta) {
                                                return (
                                                    <p key={rIndex} className='Respuesta' style={{ color: "blue" }}>{respuesta}</p>
                                                )
                                            } else if (respuesta === respuestaCorrecta) {
                                                return (
                                                    <p key={rIndex} className='Respuesta' style={{ color: "green" }}>{respuesta}</p>
                                                )
                                            } else {
                                                return (
                                                    <p key={rIndex} className='Respuesta' style={{ color: "red" }}>{respuesta}</p>
                                                )
                                            }
                                        })
                                    }
                                </div>
                            )
                        })
                    }

                    <div className="Video" >
                        <iframe
                            width="560"
                            height="315"
                            src={`${subjectVideo}`}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; 
                        autoplay; 
                        clipboard-write; e
                        ncrypted-media; 
                        gyroscope; 
                        picture-in-picture; 
                        web-share"
                            allowFullScreen>
                        </iframe>
                        <button className="ButtonVolver" onClick={() => {
                            localStorage.removeItem("subject");
                            handleVolverClick();
                        }}>
                            Volver
                        </button>
                    </div>

                </div>
            ) : (
                <div className="Card">
                    <p className="TextHeader">{preguntas[preguntaActual]?.pregunta}</p>
                    <div className="Cards">
                        {preguntas[preguntaActual]?.respuestas.map((respuesta, index) => (
                            <button
                                key={index}
                                className={`BtCard${index + 1}`}
                                onClick={() => handleRespuestaClick(respuesta)}
                            >
                                {respuesta}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Quizz;
