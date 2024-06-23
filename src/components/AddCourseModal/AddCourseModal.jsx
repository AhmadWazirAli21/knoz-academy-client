
// import "./AddCourseModal.css";
// import { IoMdClose } from "react-icons/io";
// import * as yup from 'yup'
// import { Formik } from "formik";
// import axios from '../../config/axios'
// import { urls } from "../../config/urls";
// import { useContext, useRef, useState } from "react";
// import { MainContext } from "../../context/main_context";

// function AddCourseModal() {
//     const {setOpenAddVideoModal} = useContext(MainContext)
//     const [img , setImg] = useState(null)
//     const ref = useRef()
//     const handleCloseModal = () => {
//       setOpenAddVideoModal(prev => !prev)
//     }
//     const validationSchema = yup.object({
//       course_name: yup
//         .string()
//         .nullable()
//         .required("You must enter a course name"),
//       course_duration: yup
//         .string()
//         .nullable()
//         .required("You must enter a course duration"),
//       course_price: yup
//         .string()
//         .nullable()
//         .required("You must enter a course price"),
//       category: yup
//         .string()
//         .nullable()
//         .required("You must specify course category"),
//       course_description: yup
//         .string()
//         .nullable().min(20 , 'The course description must be at least 20 charachter')
//         .required("You must enter a course descrition"),
//     });

//     const onsubmit = async (values) => {
//       let data = new FormData()
//       data.append('course_name' , values.course_name)
//       data.append("course_duration", values.course_duration);
//       data.append("course_price", values.course_price);
//       data.append("category", values.category);
//       data.append("course_description", values.course_description);
//       data.append('course_img' , img)

//         const token = JSON.parse(
//           localStorage.getItem("knoz-student-token")
//         ).token;
//         try {
//         await axios.post(urls.CREATE_COURSE , data , { headers : {
//           Authorization : token
//         }});
//         } catch (error) {
//             console.log(error);
//         }
//     }
// console.log(ref);
//   return (
//     <div className="add-course-modal-container">
//       <Formik
//         validationSchema={validationSchema}
//         initialValues={{
//           course_name: null,
//           course_duration: null,
//           course_price: null,
//           category: null,
//           course_description: null,
//           course_img: null,
//         }}
//         onSubmit={(values, { resetForm }) => {
//           onsubmit(values);
//           resetForm({ values: null });
//         }}
//       >
//         {(formikProps) => (
//           <form
//             className="add-course-modal"
//             onSubmit={formikProps.handleSubmit}
//           >
//             <div className="add-course-close-btn" onClick={handleCloseModal}>
//               <IoMdClose />
//             </div>
//             <p className="error">
//               {formikProps.touched.course_name &&
//                 formikProps.errors.course_name}
//             </p>
//             <input
//               type="text"
//               placeholder="Course Name"
//               name="course_name"
//               value={formikProps.values.course_name}
//               onChange={formikProps.handleChange}
//             />
//             <p className="error">
//               {formikProps.touched.course_duration &&
//                 formikProps.errors.course_duration}
//             </p>
//             <input
//               type="text"
//               placeholder="Course Duration"
//               name="course_duration"
//               value={formikProps.values.course_duration}
//               onChange={formikProps.handleChange}
//             />
//             <p className="error">
//               {formikProps.touched.course_price &&
//                 formikProps.errors.course_price}
//             </p>
//             <input
//               type="text"
//               placeholder="Course Price"
//               name="course_price"
//               value={formikProps.values.course_price}
//               onChange={formikProps.handleChange}
//             />
//             <p className="error">
//               {formikProps.touched.category && formikProps.errors.category}
//             </p>
//             <input
//               type="text"
//               placeholder="Course Category"
//               name="category"
//               value={formikProps.values.category}
//               onChange={formikProps.handleChange}
//             />
//             <p className="error">
//               {formikProps.touched.course_description &&
//                 formikProps.errors.course_description}
//             </p>
//             <input
//               type="text"
//               placeholder="Course Description"
//               name="course_description"
//               value={formikProps.values.course_description}
//               onChange={formikProps.handleChange}
//             />
//             <input
//               type="file"
//               className="image-input"
//               placeholder="Course Image"
//               onChange={(e) => setImg(e.target.files[0])}
//               ref={ref}
//             />
//             <button
//               className="add-course-modal-btn"
//               onClick={() => ref.current.click()}
//             >
//               add image
//             </button>
//             <button className="add-course-modal-btn">ADD COURSE</button>
//           </form>
//         )}
//       </Formik>
//     </div>
//   );
// }

// export default AddCourseModal;

import { useRef, useState } from "react"
import { useCourses } from "../../context/CoursesContext"
import axios from "axios"
import { IoMdClose } from "react-icons/io";
import './AddCourseModal.css'

function AddCourseModal() {
  
  const [values,setValues] = useState({
    course_name: '',
    course_duration: '',
    course_price: '',
    category: '',
    cousre_description: '',
    course_img: ''
  })

  const [validation,setValidation] = useState({
    course_name: false,
    course_duration: false,
    course_price: false,
    cousre_description: false,
    category: false
  })

  const {setOpenAddCourseModal} = useCourses();

  const handleCloseModal = () => {
    setOpenAddCourseModal(false)
  }
  
  const handleSubmit = async e => {
    e.preventDefault();
    if(!values.course_name) {setValidation({...validation, course_name: true}); return;}
    else if(!values.course_duration) {setValidation({...validation,course_duration: true}); return;}
    else if (!values.course_price) {setValidation({...validation,course_price: true}); return;}
    else if(!values.category) {setValidation({...validation,category: true}); return;}
    else if(values.cousre_description && values.cousre_description.length < 20) {setValidation({...validation,cousre_description: true}); return;}

  const data = new FormData();
  data.append("course_name" , values.course_name);
  data.append("course_duration",values.course_duration);
  data.append("course_price",values.course_price);
  data.append("category",values.category);
  data.append("course_img",values.course_img);
  data.append("cousre_description",values.cousre_description)

    const token = JSON.parse(localStorage.getItem("knoz-user")).token;
               try {
                await axios.post('/courses/create-course', data , { headers : {
               Authorization : token
              }});
              location.reload()
               } catch (error) {
                   console.log(error);
                 }
  }
  
  return (
    <div className="add-course-modal-container">
      <form className="add-course-modal" onSubmit={handleSubmit}>
        <div className="add-course-close-btn" onClick={handleCloseModal}>
              <IoMdClose />
        </div>
        {validation.course_name ? <span className="validation_error">please fill out this field</span> : null}
        <input 
        type="text" 
        placeholder="course name"
        name="course_name"
        value={values.course_name}
        onChange={e => {setValues({...values,course_name: e.target.value})
      setValidation({course_name: false})
      }}
        />
        {validation.course_duration ? <span className="validation_error">please fill out this field</span> : null}
           <input 
              type="text"
              placeholder="Course Duration"
              name="course_duration"
              value={values.course_duration}
              onChange={e => {setValues({...values,course_duration: e.target.value})
              setValidation({course_duration: false})
            }}
              
           />
           {validation.course_price ? <span className="validation_error">please fill out this field</span> : null}
        <input  
           type="text"
           placeholder="Course Price"
           name="course_price"
           value={values.course_price}
           onChange={e => {setValues({...values,course_price: e.target.value})
           setValidation({course_price: false})
          }}
          />
          {validation.category ? <span className="validation_error">please fill out this field</span> : null}
        <input 
           type="text"
           placeholder="Course Category"
           name="category"
           value={values.category}
           onChange={e => {setValues({...values,category: e.target.value})
           setValidation({category: false})
          }}
        />
        {validation.cousre_description ? <span className="validation_error">this field must be at least 20 charachters</span> : null}
        <input 
        type="text" 
        placeholder="Course description"
        name="course_description"
        value={values.cousre_description}
        onChange={e => {setValues({...values,cousre_description: e.target.value})
        setValidation({cousre_description: false})
      }}

        />
        <label htmlFor="file_img" className="add_image">Choose an image</label>
        <input 
        type="file" 
        id="file_img"
        onChange={(e) => setValues({...values,course_img: e.target.files[0]})}
        />
        <button className="add-course-modal-btn">Add course</button>
      </form>
    </div>
  )
}

export default AddCourseModal
