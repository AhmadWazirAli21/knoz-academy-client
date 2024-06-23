import './intor.css'
import landing from '../../assets/study.jpg'
import { useNavigate } from 'react-router-dom'
import {CiSearch} from 'react-icons/ci'
import { useCourses } from '../../context/CoursesContext'
import { useState } from 'react'

function Intorn() {

 const navigate = useNavigate()
 const {courses,setCourse} = useCourses();
 const [search_word, setSearch_word] = useState('');

 const handleSearch = () => {
    const course = courses.find((e) => e.course_name == search_word)
    course ?  setCourse(course) : setCourse('no courses found')
    navigate(`/search`);
 }


  return (
    <div className="intro-container">
      <section>
        <div className="section-left-side">
          <h1>Knoz Academy</h1>
          <h2>Education is create better future</h2>
          <p>
            we believe in the importance of nurturing a conscious and educated
            generation equipped with the necessary skills to face lifes various
            challenges
          </p>
          <p>
            Building the skills and awareness needed for a better future for
            your little ones starts here
          </p>
          <div className="section-search-course">
            <input type="text" placeholder='search a course' className='search-course-input' value={search_word} onChange={(e) => setSearch_word(e.target.value)}/>
            <button className='search-course-btn' onClick={() => handleSearch()}>
            <CiSearch className='search-course-btn-icon'  size={20} color='white'/>
            </button>
          </div>
        </div>
        <div className="section-right-side">
          <img src={landing} />
        </div>
      </section>
    </div>
  );
}

export default Intorn