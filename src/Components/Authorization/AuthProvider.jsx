/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";

import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from "../../Firebase/firebase.config";
import axios from "axios";

const auth = getAuth(app)

const googleProvider = new GoogleAuthProvider(auth)

export const AuthContext = createContext()
const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    // singup
    const signUp = (email, password) =>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    // sing in
    const login = (email, password) =>{
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const googleLogin = () =>{
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    useEffect(()=>{
        const unsubcribe = onAuthStateChanged(auth, (currentUser) =>{
            
            setUser(currentUser)
            if(currentUser){

                axios.post("https://summer-camp-server-weld.vercel.app/jwt", {email: currentUser.email})
                .then(data => {
                    localStorage.setItem("access-token", data.data)
                    setLoading(false)
                })
            }
            else{
                localStorage.removeItem("access-token")
                setLoading(false)
            }
        })
        return () =>{
            return unsubcribe()
        }

    },[])

    const profileUpdate = (name, photo) =>{
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
          })
          
    }

    const logOut = () => {
        return signOut(auth)
    }
    const authInfo = {
        signUp,
        login,
        googleLogin,
        logOut,
        profileUpdate,
        user,
        loading
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;