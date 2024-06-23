import "./Cards.css";
import { Link } from "react-router-dom";
import landing from '../../assets/360_F_306636176_KQbxttYdxWHsH3S6bYCD47NvVGdTL2xV.jpg'
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import CourseCard from "../course card/CourseCard";
import { useCourses } from "../../context/CoursesContext";
import { useEffect } from "react";

function Cards() {

  const {filterByCat} = useCourses()
  // const coursesPerCategory = filterByCat(JSON.parse(sessionStorage.getItem('courses')))


  return (
    <div className="courses-section">
      <h1 className="courses-section-header" id="courses">Enroll your favorite courses</h1>
      {/* <div className="courses-titles">
        <Link className="course-btn">Web development</Link>
        <Link className="course-btn">Skill Building</Link>
        <Link className="course-btn">Building Financial </Link>
        <Link className="course-btn">Online Store</Link>
        <Link className="course-btn">Consultation Sessions</Link>
        <Link className="course-btn">Services for Teachers</Link>
      </div> */}
      <div className="courses-cards">
        {/* {Object.values(coursesPerCategory[0])?.map((e) => {
          console.log(e);
          return  <CourseCard 
           photo={e.course_img ? e.course_img : null} 
          price={e.course_price} 
          duration={e.course_duration} 
          navigateTo={e._id} 
          key={e._id}
          videoCount={e.course_name}
          /> 
        }) } */}
        </div>
      <div className="features">
        <div className="left-side">
          <h1 className="features-title">
            Intererective teaching <br />
            our online platforms{" "}
          </h1>
          <img src={landing} />
        </div>
        <div className="right-side">
          <div className="description">
            <IoCheckmarkDoneCircle size={30} color="#032867" />
            <div className="title">
              <h3>Everyday complete workshit</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui
                molestias perspiciatis <br /> ab cum asperiores porro quos alias
                expedita minima dicta!
              </p>
            </div>
          </div>

          <div className="description">
            <IoCheckmarkDoneCircle size={30} color="#032867" />
            <div className="title">
              <h3>Everyday complete workshit</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui
                molestias perspiciatis <br /> ab cum asperiores porro quos alias
                expedita minima dicta!
              </p>
            </div>
          </div>

          <div className="description">
            <IoCheckmarkDoneCircle size={30} color="#032867" />
            <div className="title">
              <h3>Everyday complete workshit</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui
                molestias perspiciatis <br /> ab cum asperiores porro quos alias
                expedita minima dicta!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cards;
