import "./coursePage.css";
import img from "../../assets/courseDefault.jpg"
import { useNavigate } from "react-router-dom";
import { useCourses } from "../../context/CoursesContext";
import { useEffect, useState } from "react";
import AddCourseVideoModal from '../../components/AddCourseVideoModal/AddCourseVideoModal'
import axios from "axios";

function Course() {

  const navigate = useNavigate()
    const {  courseVideos,getCourseVideos, filterVideos ,openAddVideoModal,setOpenAddVideoModal,admin,setEnroll } =
      useCourses();

      const selectedCourse = JSON.parse(sessionStorage.getItem('selectedCourse'))

      useEffect(() => {
        // setSelectedCourse(JSON.parse(sessionStorage.getItem('selectedCourse')))
        getCourseVideos(selectedCourse._id)
        // const courses = JSON.parse(localStorage.getItem('knoz-user')).user.courses
        // courses.filter((c_id) =>  c_id == selectedCourse._id) ? setSelectedCourse({...selectedCourse,isEnrolled: true}) : null
        
      },[])


      const handleVideoClicking = (id) => {
        filterVideos(id)
        navigate(`/courses/${selectedCourse._id}/videos`);
      }

      const handleEnroll = async () => {
        try {
          const course_id = selectedCourse._id
          const token = JSON.parse(localStorage.getItem('knoz-user')).token
          const res = await axios.patch('/account/course_enroll',{course_id},{headers: {
            Authorization: token
          }});
          if(res.status == 200) { const id = JSON.parse(localStorage.getItem('knoz-user')).user.id
          const user2 = await axios.get('/account/get-current-user/' + id, {headers: {
            Authorization : token
          }})
        localStorage.setItem('knoz-user',JSON.stringify({token: token, user: user2.data}));
        setEnroll(prev => !prev)
        selectedCourse.isEnrolled = true
          // try {
          //   await axios.patch(`/courses/enroll/${selectedCourse._id}`);
          // } catch (error) {
          //   console.log(error);
          // }
        sessionStorage.setItem('selectedCourse',JSON.stringify(selectedCourse))
        location.reload()
        }
        } catch (error) {
          console.log(error);
        }
      }


  return !openAddVideoModal ? (
    <div className="course-page-container">
      <div className="course-page-upper-section">
        <div className="left-side">
          <img
            src={selectedCourse.course_img ? selectedCourse.course_img : img}
            alt=""
            className="course-img"
          />
        </div>
        <div className="right-side">
          {admin ? (
            <div className="up">
              <strong>About the course</strong>
              {admin && (
                <button
                  className="open-add-video"
                  onClick={() => setOpenAddVideoModal(true)}
                >
                  Add video
                </button>
              )}
            </div>
          ) : (
            <>
            <strong>About the course</strong>
            <p>{selectedCourse.course_description ? selectedCourse.course_description : 'Knoz Academy provide you this course.'}</p>
            </>
          )}

        </div>
      </div>
      <div className="p">
        <p>Course Videos :</p>
      </div>
      <div className="course-page-bottom-section">
        {selectedCourse.isEnrolled ? (
          courseVideos.length !== 0 ? (
            courseVideos.map((ele, idx) => {
              return (
                <div
                  key={idx}
                  className="video-container"
                  onClick={() => handleVideoClicking(ele._id)}
                >
                  <p className="video-number">{idx + 1}</p>
                  <div className="video-details">
                    <strong>{ele.video_title}</strong>
                    <p>
                      {ele.description.length >= 50
                        ? ele.description.slice(0, 85) + "..."
                        : ele.description}
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="no-videos-text">
              <p>There is no videos here yet </p>
            </div>
          )
        ) : (
          // ) : courseVideos.length != 0 ? (
          //   <div className="video-container">
          //     <video
          //       src={courseVideos[0]?.video_uri}
          //       className="video"
          //       controls
          //       controlsList="nodownload"
          //     />
          //     <div className="video-details">
          //       <strong>{courseVideos[0]?.video_title}</strong>
          //       <p>
          //         {courseVideos[0]?.description.length > 50
          //           ? courseVideos[0]?.description.slice(
          //               50,
          //               courseVideos[0]?.description.length - 1
          //             ) + "..."
          //           : courseVideos[0]?.description}
          //       </p>
          //     </div>
          //   </div>
          <div className="no-videos-text">
            <p className="not-enrolled">
              You must enroll this course to see all videos
            </p>
          </div>
        )}
        {!selectedCourse.isEnrolled ? (
          <button className="enroll-btn" onClick={handleEnroll}>
            Enroll now
          </button>
        ) : null}
      </div>
    </div>
  ) : (
    <AddCourseVideoModal id={selectedCourse._id} />
  );
}

export default Course;
