import { useState } from 'react'
import Footer from './Components/Footer'
import { Route, Routes } from 'react-router-dom'
import HomePage from './Pages/HomePage.jsx';
import AboutUs from './Pages/AboutUs.jsx';
import NotFound from './Pages/NotFound.jsx';
import Signup from './Pages/Signup.jsx';
import LoginUser from './Pages/Login.jsx';
import CourseList from './Pages/Course/CourseList.jsx';
import Contact from './Pages/Contact.jsx';
import Denied from './Pages/Denied.jsx';
import CourseDescription from './Pages/CourseDescription.jsx';
import RequireAuth from './Components/Auth/RequireAuth.jsx';
import CreateCourse from './Pages/Course/CreateCourse.jsx';
import Profile from './Pages/User/Profile.jsx';

function App() {

  return(
    <>
      <Routes>
        <Route path='/' element={<HomePage />} ></Route>
        <Route path='/about' element={<AboutUs />} ></Route>
        <Route path='/courses' element={<CourseList/>}></Route>
        <Route path='/contact' element={<Contact/>}></Route>
        <Route path='/denied' element={<Denied />}></Route>
        <Route path='/course/description' element={<CourseDescription />}></Route>


        <Route path='/login' element={<LoginUser/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>


        <Route element={<RequireAuth allowedRoles={['ADMIN']}/>}>
          <Route path='/course/create' element={<CreateCourse/>} />
        </Route>

        <Route element={<RequireAuth allowedRoles={['ADMIN','USER']}/>}>
          <Route path='/user/profile' element={<Profile/>}/>
        </Route>

        <Route path='*' element={<NotFound/>}></Route>
      </Routes>
    </>
  )
}


export default App
