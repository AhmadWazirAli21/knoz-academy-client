import {  createContext, useContext, useState,useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const coursesContext = createContext();



export const CoursesProvider = ({children}) => {

  const [courseVideos , setCourseVideos] = useState([]);
  const [courses , setCourses] = useState([]);
  const [selectedCourse , setSelectedCourse] = useState(null)
  const [editModal ,setEditModal] = useState(false)
  const [openAddCourseModal , setOpenAddCourseModal] = useState(false)
  const [openAddVideoModal,setOpenAddVideoModal] = useState(false)
  const [skeleton ,setSkeleton] = useState(false)
  const [addSkillsModal , setAddSkillsModal]= useState(false)
  const [course,setCourse] = useState('nothing to show');
  const [admin,setAdmin] = useState(false);
  const [enroll,setEnroll] = useState(false);
  const navigate = useNavigate()
  useEffect(() => {
    fetchd();
    if (!localStorage.getItem("knoz-user")) {
       navigate('/account/login')
    }
      JSON.parse(localStorage.getItem("knoz-user"))?.user?.email ==
        "admin@gmail.com" ||
      JSON.parse(localStorage.getItem("knoz-user"))?.user?.email ==
        "bigBoss@gmail.com"
        ? setAdmin(true)
        : null;
    // const courses2 = JSON.parse(sessionStorage.getItem('courses'));
    // const userCourses = JSON.parse(localStorage.getItem('knoz-user')).user.courses;
    //  userCourses.length ? courses2.map(e => {
    //  const course = userCourses.filter(c => c == e._id)
    //  if(course[0] == e._id)  e.isEnrolled = true
    // }) : null
    // sessionStorage.setItem('courses',JSON.stringify(courses))
    // setCourses(courses2)
  },[])
    async function fetchd () {
        const courses = await axios.get('/courses');
        setCourses(courses.data)
        sessionStorage.setItem('courses',JSON.stringify(courses.data));
      }
      


      const filterCourses = (id) => {
        const course = courses.find((e) => e._id == id);
        setSelectedCourse(course)
        sessionStorage.setItem('selectedCourse',JSON.stringify(course));
    }

    const filterVideos = (id) => {
        const vid = courseVideos.find((vid_id) => id === vid_id._id)
        sessionStorage.setItem('vid',JSON.stringify(vid))
    }


    function filterByCat(arr) {
      const set = new Set();
      arr.map(ele => {
        set.add(ele.category);
      })
  
      const coursesPerCategory = [];
      var obj = {}
      set.forEach(e => {
        obj[e] = courses.filter(el => e == el.category);
        coursesPerCategory.push(obj);
        obj = {}
      })
      return coursesPerCategory;
    }

    const getCourseVideos = async (id) => {
        
        try {
              const res = await axios.get('/courses/get-course/'+ id);
              setCourseVideos(res.data)
        } catch (error) {
            console.log(error);
        }
    }


    return <coursesContext.Provider value={{
      filterCourses,
      setCourses,
      enroll,
      setEnroll,
      admin,
      setAdmin,
      courses,
      courseVideos,
      selectedCourse,
      getCourseVideos,
      setEditModal,
      editModal,
      filterVideos,
      course,
      setCourse,
      filterByCat,
      openAddCourseModal,
      setOpenAddCourseModal,
      skeleton,
      setSkeleton,
      openAddVideoModal,
      setOpenAddVideoModal,
      addSkillsModal,
      setAddSkillsModal
      }} >
        {children}
    </coursesContext.Provider>
}

export const useCourses = () => useContext(coursesContext)