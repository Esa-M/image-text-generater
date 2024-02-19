import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css'

import { Routes, Route } from 'react-router-dom'


import Panel from './Components/Panel'
import Login from './Components/Login'
import SignUp from './Components/SignUp'
import PrivateRoute from './Components/PrivateRoute'
import UserPanel from './Components/UserPanel'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(window.sessionStorage.getItem("key"));
  const [key, setKey] = useState(window.sessionStorage.getItem("key"))
  // const key = window.sessionStorage.getItem("key")

  



  useEffect(()=>{
      if(key == undefined){
    setIsAuthenticated(false)
  }else{
    setIsAuthenticated(true)
  }
  }, [])

  return (
    <>
    {/* <Panel></Panel> */}
  <Routes>
    <Route path='/' element={<Login setIsAuthenticated={setIsAuthenticated}></Login>}> </Route>
    <Route path='/signup' element={<SignUp setIsAuthenticated={setIsAuthenticated}></SignUp>}></Route>
    <Route path='/user' element={<PrivateRoute isAuthenticated={isAuthenticated}></PrivateRoute>}>
      <Route path='dashboard' element={<UserPanel></UserPanel>}></Route>
    </Route>
  </Routes>
     
    </>
  )
}

export default App
