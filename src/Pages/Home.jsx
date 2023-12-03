import { useEffect } from 'react';
import '../assets/HomeStyle.css';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
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

  return (
    <div className="AllContents">
      <div className='HomeHeader'>
        <img className="LogoHome" alt="Logo-Financiamigos" src="logo.png" />
        <p className='FText'> Financiamigos </p>
        <img className='Menu' alt='LogOut-Icon' src='logout.png' onClick={logOut} />
      </div>
      <div className='HomeBody'>
        <div className='QuizContent' >
          <Link to="/roulette">
            <img className='QuizzesImg' alt='Imagen Quizzes' src='quiz.png' />
            <img className='QuizImgMovil' alt='Imagen Quizzes' src='Quizzes.png' />
          </Link>
        </div>
        <div className='ComentContent' >
          <Link to='/coment'>
            <img className='ComentImg' alt='Imagen Comentarios' src='coment.png' />
            <img className='ComentImgMovil' alt='Imagen Quizzes' src='Comentarios.png' />
          </Link>
        </div>
      </div>
    </div>
  )
}


export default Home; 