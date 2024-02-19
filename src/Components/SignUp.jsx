

import React, { useState } from 'react'


import { FaGoogle, FaGithub, FaFacebook   } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

import { CreateUser } from '../firebase/firebaseAuth';


export default function SignUp({setIsAuthenticated}) {

  const [user, setUser] = useState({email:'', password:'', checkpassword:''})
  const [message, setMessage] = useState('')

  const router = useNavigate()


  const FormHandler = async(e) =>{
    e.preventDefault()
    if(user.password != user.checkpassword){
      return setMessage("make sure passwords are same")
    }
    if(user.password == user.checkpassword){
       try{
        CreateUser(user.email, user.password, setIsAuthenticated)
        setUser({...user, email:'', password:'',checkpassword:''})
        return setMessage("Account Created")
       

       }catch(err){
        console.log(err)
       }
    }else{
      return
    }

  }
  return (
    <div className="hero min-h-screen bg-base-200">
    <div className="hero-content text-center">
       <form onSubmit={(e) => FormHandler(e)} className="p-5 w-96 flex flex-col justify-center align-middle rounded-lg border border-purple-400">
            <label className="font-semibold text-white/80 lg:text-xl">Sign up here</label>
              <input type="email" value={user.email} onChange={(e) => setUser({...user, email:e.target.value})} required className="w-4/5 self-center mt-10 h-8  bg-transparent outline-none border-b-2 border-purple-300 focus:border-purple-500  p-5" placeholder=" email"/>
              <input type="password" value={user.password} onChange={(e) => setUser({...user, password:e.target.value})} required className="w-4/5 self-center mt-5 h-8 bg-transparent outline-none border-b-2 border-purple-300 focus:border-purple-500  p-5" placeholder=" password"/>
              <input type="password" value={user.checkpassword} onChange={(e) => setUser({...user, checkpassword:e.target.value})} required className="w-4/5 self-center mt-5 h-8 bg-transparent outline-none border-b-2 border-purple-300 focus:border-purple-500  p-5" placeholder="Retype your password"/>
          
              {(message) ? (<div className='mt-5 self-center'>{message}</div>) : ''}
          <button onSubmit={ (e) => FormHandler(e)} className="mt-10 p-2 w-72 self-center font-semibold bg-purple-600 text-white/90 rounded-md hover:bg-white/90 hover:text-purple-600 ">SignUp</button>
          

            <div className="mt-16 text-sm flex justify-center align-middle">Creaeted an account <div onClick={()=>{router("/")}} className="text-blue-500 underline underline-offset-1 text-nowrap mr-2 ml-2 cursor-pointer ">login</div> here</div>
       </form>
    </div>
  </div>
  )
}
