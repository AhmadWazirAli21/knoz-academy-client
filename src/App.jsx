import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage';
import Login from './pages/Login/Login'
import Register from './pages/Register/Register';
import CoursePage from './pages/course page/CoursePage';
import axios from 'axios';
import PageLayout from './pages/PageLyout/PageLayout';
import Courses from './pages/Courses/Courses';
import Profile from './pages/profile page/Profile'
import ContsctUs from './pages/Contact us/ContactUs';
import { CoursesProvider } from './context/CoursesContext';
import Search from './pages/search/Search';
import Video from './pages/Video/Video'

function App() {

  axios.defaults.baseURL = 'http://localhost:3000'

  return (
    <>
      <BrowserRouter>
      <CoursesProvider>
      <Routes >
        <Route path='/' element={<PageLayout />} >
          <Route index element={<HomePage />}/>
          <Route path='/courses' element={<Courses />} />
          <Route path='/contact' element={<ContsctUs />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/search' element={<Search />} />
          <Route path='/courses/:id' element={<CoursePage />} />
          <Route path='/courses/:id/videos' element={<Video />} />
        </Route>
        <Route path='/account/login' element={<Login />} />
        <Route path='/account/register' element={<Register />} />
      </Routes>
      </CoursesProvider>
      </BrowserRouter>
    </>
  )
}

export default App
