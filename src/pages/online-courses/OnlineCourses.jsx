import './onlineCourses.css'
import teacher from '../../assets/medium-shot-man-reading-home_23-2149879774.jpg'
import { useNavigate } from 'react-router-dom';

function OnlineCourses() {

  const isRegistered = () => {
    return localStorage.getItem('knoz-user') ? true : false;
  }
  const navigate = useNavigate();

  return (
    <div className="OnlineCourses-section">
      <div className="left-side">
        <h1>
          The best way to learn <br /> online courses
        </h1>
        <p>
          in this world engage, challenge and support in off <br /> for quizzes
          that students love to participate in
        </p>
        <button className="get-started-btn" onClick={() => {
          !isRegistered() ? navigate('/account/login') : navigate('/courses')
        }}>Get started</button>
      </div>
      <div className="right-side">
        <img src={teacher} alt="" />
        </div>
    </div>
  );
}

export default OnlineCourses