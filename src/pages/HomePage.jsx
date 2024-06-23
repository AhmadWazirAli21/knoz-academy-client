import React, { useEffect } from 'react'
import Cards from './Cards/Cards'
import OnlineCourses from './online-courses/OnlineCourses';
import StudentOpinionsSec from './students opinios/StudentOpiniosSec';
import Footer from './Footer/Footer'
import Intron from './Intro/Intorn'
import { useCourses } from '../context/CoursesContext';

export default function HomePage() {


  return (
    <>
       <Intron />
        <Cards />
        <OnlineCourses />
        <StudentOpinionsSec />
        <Footer />
    </>
  )
}
