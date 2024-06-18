import { useState } from 'react'
import Footer from './Components/Footer'
import { Route, Routes } from 'react-router-dom'
import HomePage from './Pages/HomePage.jsx';

function App() {

  return(
    <>
      <Routes>
        <Route path='/' element={<HomePage />} ></Route>
      </Routes>
    </>
  )
}


export default App
