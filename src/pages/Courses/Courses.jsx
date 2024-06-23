import React, { useEffect, useState } from 'react'
import './courses.css'
import { Link } from "react-router-dom";
import CourseCard from '../course card/CourseCard';
import { useCourses } from '../../context/CoursesContext';
import AddCourseModal from '../../components/AddCourseModal/AddCourseModal';
import defaultimg from '../../assets/courseDefault.jpg'

export default function Courses() {

  const {filterByCat,openAddCourseModal,setOpenAddCourseModal,admin,setCourses,enroll} = useCourses();
  
  const coursesPerCategory = filterByCat(JSON.parse(sessionStorage.getItem('courses')))

  useEffect(() => {
    const courses = JSON.parse(sessionStorage.getItem('courses'));
    const userCourses = JSON.parse(localStorage.getItem('knoz-user')).user.courses;
     userCourses.length ? courses.map(e => {
     const course = userCourses.filter(c => c == e._id)
     if(course[0] == e._id)  e.isEnrolled = true
    }) : null
    sessionStorage.setItem('courses',JSON.stringify(courses))
    setCourses(courses)
  },[enroll])

    return !openAddCourseModal ? (
      coursesPerCategory.length ? (
    <div className='courses-page'>
      {coursesPerCategory.map(ele => {
        return  <div key={Object.keys(ele).at(0)}>
        <div className="courses-titles">
          <Link className="course-btn">{Object.keys(ele).at(0)}</Link>
          {admin && <button className='add-course' onClick={() => setOpenAddCourseModal(true)}>add Course</button>}
          </div>
          <div className="courses-cards">
        {Object.values(ele).at(0).map(e => <CourseCard 
        photo={e.course_img ? e.course_img : defaultimg} 
        price={e.course_price} 
        enroll={e.isEnrolled}
        duration={e.course_duration} 
        navigateTo={e._id} 
        key={e._id}
        videoCount={e.course_name}
        />
        )}
      </div>
      </div>
      })}
    </div>) : <div className='noCoursesPage'>
    <h2 className='noCourses'>no courses yet</h2>
    <button className='add-course' onClick={() => setOpenAddCourseModal(true)}>Add Course</button>
    </div>
  ) : <AddCourseModal />
}
