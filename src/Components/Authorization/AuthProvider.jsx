/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";

import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import app from "../../Firebase/firebase.config";
import axios from "axios";

const auth = getAuth(app)

const googleProvider = new GoogleAuthProvider(auth)

export const AuthContext = createContext(null)
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
        const unMount = onAuthStateChanged(auth, (currentUser) =>{
            setLoading(false)
            if(currentUser){
                setUser(currentUser)

                axios.post("http://localhost:4214/jwt", {email: currentUser.email})
                .then(data => {
                    localStorage.setItem("access-token", data.data)
                })
            }
            else{
                localStorage.removeItem("access-token")
            }
        })
        return () =>{
            return unMount()
        }

    },[])

    const logOut = () => signOut(auth)
    const authInfo = {
        signUp,
        login,
        googleLogin,
        logOut,
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