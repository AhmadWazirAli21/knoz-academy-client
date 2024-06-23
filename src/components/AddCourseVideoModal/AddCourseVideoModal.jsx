import { useCourses } from '../../context/CoursesContext';
import './AddCourseVideoModal.css'
import { IoMdClose } from 'react-icons/io';
import { useState } from 'react';
import axios from 'axios';



function AddCourseVideoModal({id}) {

const {setOpenAddVideoModal} = useCourses()

  const [data,setData] = useState({
    video_name: '',
    video_description: '',
    video: ''
  });

  const handleSubmit = async e => {
    e.preventDefault();
    const token = JSON.parse(localStorage.getItem('knoz-user')).token
    const formdata = new FormData();
    formdata.append('video_title',data.video_name);
    formdata.append('description',data.video_description);
    formdata.append('course_id', id);
    formdata.append('video_uri',data.video)
    try {
       await axios.post('/courses/create-course/add-videos',formdata,{headers: {
        Authorization: token
      }})
      location.reload()
    } catch (error) {
      
    }
  }

  const handleCloseModal = () => {
    setOpenAddVideoModal(false)
  } 

  return (
    <div className='add-course-video-container'>
      <div className="add-video-close-btn">
              <IoMdClose onClick={handleCloseModal} />
        </div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder='video name'
        onChange={e => setData({...data,video_name: e.target.value})}
        />
        <input type="text" placeholder='video description'
        onChange={e => setData({...data,video_description: e.target.value})}
        />
      <label htmlFor="videos">Select video</label>
        <input type="file" id='videos'
        onChange={e => setData({...data,video:e.target.files[0]})}
        />
        <button type='submit'>Add video</button>
      </form>
    </div>
  )
}

export default AddCourseVideoModal