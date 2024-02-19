

import { useEffect, useState } from "react";
import { FaGoogle, FaGithub, FaFacebook } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { SignInWithUserAccount, SignInWithGoogle } from "../firebase/firebaseAuth";

export default function Login({setIsAuthenticated}) {
  const [user, setUser] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const router = useNavigate()

  const FormHandler = async (e) => {
    e.preventDefault();
    try {
      SignInWithUserAccount(user.email, user.password, setMessage, router, setIsAuthenticated);
      setUser({ ...user, email: '', password: '' });
    } catch (err) {
      setMessage(err.message);
    }
  };

  const LoginProvider = async (e) => {
    try {
      SignInWithGoogle(setMessage, router, setIsAuthenticated);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
   
    
  }, []);

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <form onSubmit={(e) => FormHandler(e)} className="p-5 w-96 flex flex-col justify-center align-middle rounded-lg border border-purple-400">
          <label className="font-semibold text-white/80 lg:text-xl">Login to Continue</label>
          <input type="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} required className="w-4/5 self-center mt-10 h-8  bg-transparent outline-none border-b-2 border-purple-300 focus:border-purple-500  p-5" placeholder="Enter your email" />
          <input type="password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} required className="w-4/5 self-center mt-5 h-8 bg-transparent outline-none border-b-2 border-purple-300 focus:border-purple-500  p-5" placeholder="Enter your password" />
          {message && <div className='mt-5 self-center'>{message}</div>}
          <button onSubmit={(e) => FormHandler(e)} className="mt-10 p-2 w-72 self-center font-semibold bg-purple-600 rounded-md text-white/90 hover:bg-white/90 hover:text-purple-600 ">Login</button>
          <div className="mt-10 flex flex-col self-center justify-center align-middle w-3/5" >
            <div className="flex flex-row justify-center align-middle gap-2" >
              <div className="p-1px h-1px self-center bg-slate-500 w-1/2 rounded-full"></div>
              <div>or</div>
              <div className="p-1px h-1px self-center bg-slate-500 w-1/2 rounded-full"></div>
            </div>
            <div className="mt-5 flex flex-row justify-evenly align-middle p-3">
              <FaGoogle className="h-25px w-25px cursor-pointer text-white/80 hover:text-white" onClick={(e) => { LoginProvider(e) }}></FaGoogle>
              <FaGithub className="h-25px w-25px cursor-pointer text-white/80 hover:text-white"></FaGithub>
              <FaFacebook className="h-25px w-25px cursor-pointer text-white/80 hover:text-white"></FaFacebook>
            </div>
          </div>
          <div className="mt-5 text-sm text-nowrap w-full flex justify-center align-middle">Dont have an account <div onClick={()=>{router("/signup")}} className="text-blue-500 underline underline-offset-1 text-nowrap mr-2 ml-2 cursor-pointer ">Signup</div> here</div>
        </form>
      </div>
    </div>
  );
}
