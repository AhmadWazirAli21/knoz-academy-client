import { useEffect, useState } from "react";
import "./Profile.css";
import avatar from "../../assets/avatar.png";
import Modal from "../../components/Modal/Modal";
import defaultImg from '../../assets/courseDefault.jpg'
import { useCourses } from "../../context/CoursesContext";
import { useNavigate } from "react-router-dom";
import {IoIosAdd} from 'react-icons/io'
import AddSkillsModal from '../../components/AddSkillsModal/AddSkillsModal'
import axios from "axios";
import { Box, Skeleton } from "@mui/material";
import CourseCard from "../course card/CourseCard";

function Profile() {
  
  const [btns, setBtns] = useState("aboutMe");
  const navigate = useNavigate()
  const { setEditModal,
          editModal,setAddSkillsModal,addSkillsModal,courses,setCourses} = useCourses();
          const [user,setUser] = useState(null);
          const [loader,setLoader] = useState(true)

          const getUser = async () => {
            const token = JSON.parse(localStorage.getItem('knoz-user')).token
            const id = JSON.parse(localStorage.getItem('knoz-user')).user.id
            const user2 = await axios.get('/account/get-current-user/' + id, {headers: {
              Authorization : token
            }})
            setUser(user2.data)
            user2.data ? setLoader(false) : null
          }

          useEffect(() => {
           getUser()
           const courses = JSON.parse(sessionStorage.getItem('courses'));
           const userCourses = JSON.parse(localStorage.getItem('knoz-user')).user.courses;
           userCourses.length ? courses.map(e => {
           const course = userCourses.filter(c => c == e._id)
          if(course[0] == e._id)  e.isEnrolled = true
          }) : null
          sessionStorage.setItem('courses',JSON.stringify(courses))
          setCourses(courses)
          },[addSkillsModal,editModal])

          if (addSkillsModal){
            return <div className="profile-page-container">
              <AddSkillsModal/>
            </div>
          }
        console.log(user);
          if (loader){
            return (
              <div
                className="loader-conatiner"
                style={{
                  width: "100%",
                  padding: "40px",
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  height: "100vh",
                  gap: "30px",
                }}
              >
                <Box display={"flex"} width={"70%"} gap={"30px"} alignItems={"center"}>
                  <Skeleton
                    width={"120px"}
                    height={"100px"}
                    variant="circular"
                    animation={"pulse"}
                  />
                  <Box display={"flex"} flexDirection={"column"} width={"100%"}>
                    <Skeleton height={"30px"} width={"150px"} animation={"pulse"} />
                    <Skeleton height={"30px"} width={"150px"} animation={"pulse"} />
                  </Box>
                </Box>
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  gap={"0px"}
                  width={"70%"}
                >
                  <Box display={"flex"} gap={"10px"}>
                    <Skeleton width={"100px"} height={"40px"} animation={"pulse"} />
                    <Skeleton width={"100px"} height={"40px"} animation={"pulse"} />
                    <Skeleton width={"100px"} height={"40px"} animation={"pulse"} />
                    <Skeleton width={"100px"} height={"40px"} animation={"pulse"} />
                  </Box>
                  <Skeleton height={"300px"} animation={"pulse"} />
                </Box>
              </div>
            );
          }
        
            if(editModal) {
              return <Modal  />
            }
            return (
              <div className="profile-page-container">
                {!loader ? (
                  <div className="profile-page-upper-side">
                    <img
                      src={!user?.avatar ? avatar : user.avatar}
                      alt=""
                      className="user-avatar"
                    />
                    <div className="user-info">
                      <p className="user-name">{user ? user?.name : null}</p>
                      <div className="student-info-email">
                        <p className="user-type">student</p>
                        <p className="user-email">
                          {user ? user?.email : null}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    style={{
                      padding: "10px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                    }}
                  >
                    <Skeleton variant="circular" width={40} height={40} />
                    <Skeleton variant="rectangular" width={210} height={20} />
                    <Skeleton variant="rounded" width={210} height={20} />
                  </div>
                )}
                <div className="profile-page-bottom-side">
                  <div className="user-porfile-btn">
                    <button
                      value="aboutMe"
                      onClick={(e) => setBtns(e.target.value)}
                    >
                      About me
                    </button>

                    <button
                      value="enrolledCourses"
                      onClick={(e) => setBtns(e.target.value)}
                    >
                      Enrolled courses
                    </button>
                    <button
                      className="edit-profile-btn"
                      onClick={() => setEditModal(true)}
                    >
                      Edit Profile
                    </button>
                    <button
                      className="logout-btn"
                      onClick={() => {
                        localStorage.clear();
                        navigate("/");
                      }}
                    >
                      Logout
                    </button>
                  </div>
                  {btns === "aboutMe" ? (
                    <div className="about-me-section">
                      <div className="about-text-conatiner">
                        <strong>About</strong>
                        <p className="about-text">
                          {user?.about
                            ? user?.about
                            : "Tell other students about yourself"}
                        </p>
                      </div>
                      <div className="skills-conatiner">
                        <strong>Skills</strong>
                        <div className="skills">
                          {user?.skills
                            ? user?.skills.map((ele, index) => {
                                return (
                                  <div className="skill" key={index}>
                                    <p>{ele}</p>
                                  </div>
                                );
                              })
                            : null}
                          <div
                            className="add-skill-container"
                            onClick={() => setAddSkillsModal(true)}
                          >
                            <p>Add skill</p>
                            <IoIosAdd
                              size={25}
                              background="transparent"
                              className="add-skill"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="enrolled-courses-section courses-cards">
                      {user.courses.length !==0 ? (
                        user.courses.map((e) => {
                          const el = courses.filter((op) => op._id == e);
                          console.log(user.courses);
                          return (
                            <CourseCard
                              photo={
                                el[0].course_img ? el[0].course_img : defaultImg
                              }
                              price={el[0].course_price}
                              duration={el[0].course_duration}
                              navigateTo={el[0]._id}
                              key={el[0]._id}
                              videoCount={el[0].course_name}
                              enroll={el[0].isEnrolled}
                            />
                          );
                        })
                      ) : (
                        <p color="#2b447c" >No enrolled courses. </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
        }
export default Profile;
