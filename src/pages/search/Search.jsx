import {useEffect} from 'react'
import { useCourses } from '../../context/CoursesContext'
import CourseCard from '../course card/CourseCard'
import '../Cards/Cards.css'

export default function Search() {

    const {course,filterCourses} = useCourses();

    useEffect(() =>{
      filterCourses(course._id)
    },[])

  return (
    <div className='courses-cards'>
        {course == 'no courses found' ? course :
      <CourseCard 
      photo={course.course_img ? course.course_img : null} 
      duration={course.course_duration} 
      price={course.course_price} 
      navigateTo={course._id}
      videoCount={course.course_name}
      />}
    </div>
  )
}
