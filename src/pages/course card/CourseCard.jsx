import React from 'react'
import { FaVideo } from "react-icons/fa";
import { LuClock9 } from "react-icons/lu";
import { BsCurrencyDollar } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { useCourses } from '../../context/CoursesContext';
import axios from 'axios';

export default function CourseCard({
  photo,
  price,
  duration,
  videoCount,
  navigateTo,
  enroll,
}) {
  const navigate = useNavigate();
  const { filterCourses } = useCourses();

  const handleCourseNavigation = () => {
    filterCourses(navigateTo);
    navigate(`/courses/${navigateTo}`);
  };


  return (
    <div className="card" onClick={() => handleCourseNavigation()}>
      <div className="upper-section">
        <img src={photo} />
      </div>
      <div className="bottom-section">
        <div className="left-side">
          <div className="left-side-item">
            <FaVideo size={15} color="#6882AF" />
            <p>{videoCount}</p>
          </div>
          <div className="left-side-item">
            <LuClock9 size={15} color="#6882AF" />
            <p>{duration} duration</p>
          </div>
        </div>
        <div className="right-side">
          <div className="right-side-item">
            <BsCurrencyDollar size={13} color="#6882AF" />
            <p>course {price}$</p>
          </div>
          {!enroll ? (
            <button >Enroll now</button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
