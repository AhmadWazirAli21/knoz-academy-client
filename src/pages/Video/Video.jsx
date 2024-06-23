import {  useParams } from "react-router-dom";
import { useCourses } from "../../context/CoursesContext";
import './Videos.css'
import { useEffect, useState } from "react";


function Video() {

    const {  courseVideos, filterVideos ,getCourseVideos } =
      useCourses();
    const {id} = useParams();
    const [video,setVideo] = useState(JSON.parse(sessionStorage.getItem('vid')))

      useEffect(() => {
        getCourseVideos(id)
      },[])

      const handleVideoClicking = (id) => {
        filterVideos(id)
        setVideo(JSON.parse(sessionStorage.getItem('vid')))
      }

  return (
    <div className="video-page-container">
      <div className="video-conatiner">
        <video src={video.video_uri ? video.video_uri : ''} alt="" controls controlsList="nodownload" />
        <p className="video-description">Video description : </p>
        <p>{video.description}</p>
      </div>
      <div className="right-side">
        {courseVideos.map((ele, idx) => {
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
        })}
      </div>
    </div>
  ) 
}

export default Video;
