import './Modal.css'
import default_avatar from '../../assets/avatar.png'
import { useCourses } from '../../context/CoursesContext';
import { useState } from 'react';
import axios from 'axios';

function Modal() {
  const { setEditModal, editModal } = useCourses();

  const handleSubmit = async (e) => {
    const token = JSON.parse(localStorage.getItem('knoz-user')).token
    e.preventDefault();
    const data = new FormData()
    data.append('name',values.username);
    data.append('about',values.about);
    data.append('avatar',values.avatar);

    try {
      const res = await axios.post('/account/profile/update',data,{headers: {
        Authorization: token
      }})
      setEditModal(false)
    } catch (error) {
      console.log(error);
    }
  }

  const [values,setValues] = useState({
    username: '',
    about: '',
    avatar: ''
  })

  return (
    <div className="modal-container">
      <div className="modal-body">
        <label htmlFor="profilePic" className="profilePic">
          <img src={default_avatar} alt="" />
        </label>
        <input
          type="file"
          id="profilePic"
          onChange={(e) => setValues({ ...values, avatar: e.target.files[0] })}
        />
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="New Username"
            value={values.username}
            onChange={(e) => setValues({ ...values, username: e.target.value })}
          />
          <input
            type="text"
            placeholder="About Me"
            value={values.about}
            onChange={(e) => setValues({ ...values, about: e.target.value })}
          />
          <button className='save-btn'>Save</button>
          <button onClick={() => setEditModal(false)} className="close-btn">
            close
          </button>
        </form>
      </div>
    </div>
  );
}

export default Modal