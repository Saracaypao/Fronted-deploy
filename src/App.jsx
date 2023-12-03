import { Navigate, Route, Routes} from 'react-router-dom' 
import Home from './Pages/Home';  
import Login from './Pages/Login';
import Register from './Pages/Register';
import Quiz from './Pages/Quizz';
import Coment from './Pages/ComentS';
import Roulette from './Pages/Roulette';
import './assets/style.css';


function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/home" element={<Home/>} />
      <Route path="/quiz" element={<Quiz/>} />
      <Route path="/coment" element={<Coment/>} />
      <Route path="/roulette" element={<Roulette/>} />
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes> 
    </>
  )
}

export default App;
