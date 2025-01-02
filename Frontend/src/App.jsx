import './App.css'
import SignupPage from './pages/signupPage.jsx'
import LoginPage from './pages/loginPage.jsx'
import { Route,Routes, Navigate, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import CommonBtn from './components/SignInLoginButton.jsx'

function App() {
  const token = localStorage.getItem('token')

  
  const navi =useNavigate()

  return(
    <>

   
      <Routes>
        <Route path='/signup' element={<SignupPage/>}/>
        <Route path='/login' element={!token?<LoginPage/>:<Navigate to='/home'/>}/>
        <Route path='/home' element={token?<CommonBtn btnName={"Logout"} clickEvent={()=>{
          localStorage.removeItem('token')
          navi('/login')}} />:<Navigate to='/login'/>}/>
      </Routes>
    

    
    
    </>
  )
}


export default App
