

import { auth } from "./firebaseConfig"
import {GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword} from "firebase/auth"


const GoogleProvider = new GoogleAuthProvider()

export const CreateUser = (email, password, setIsAuthenticated) =>{
    createUserWithEmailAndPassword(auth, email, password).then((userCredential)=>{
        const user = userCredential.user
        window.sessionStorage.setItem("key", email)
        setIsAuthenticated(window.sessionStorage.getItem("key"))
        return "Accout created Countinue to login"
    }).catch((err)=>{
        console.log(err.message)
        return "The email address or password is incorrect"
    })
}

export const SignInWithUserAccount = (email, password, setMsg, router, setIsAuthenticated) =>{
    signInWithEmailAndPassword(auth, email, password).then((userCredential)=>{
        const user = userCredential.user
        window.sessionStorage.setItem("key", email)
        setIsAuthenticated(window.sessionStorage.getItem("key"))
        router("/user/dashboard")
        setMsg("Redirecting")

        
        
    }).catch((err)=>{
        setMsg("Invalide email or password")
    })
}


export const SignInWithGoogle = (setMsg, router, setIsAuthenticated)=>{
    signInWithPopup(auth, GoogleProvider).then((snapShot)=>{
        const credentials = GoogleAuthProvider.credentialFromResult(snapShot)
        const token = credentials.accessToken
        const userId = snapShot.user.email
        const userName = snapShot.user.displayName
        window.sessionStorage.setItem("key", snapShot.user.email)
        setIsAuthenticated(window.sessionStorage.getItem("key"))
        setMsg("Redirecting")
        router("/user/dashboard")
        
        
       
    }).catch((err)=>{
        const errcode = err.code
        const errMsg = errcode.message
        const email = err.customData.email
        const credential = GoogleAuthProvider.credentialFromError(err)

    })
}