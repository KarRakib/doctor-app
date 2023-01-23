import React, { createContext, useEffect, useState } from 'react';
import {getAuth, signOut, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile}  from 'firebase/auth' 
import app  from '../firebase/firebase.config'

export const AuthContext = createContext()
const auth = getAuth(app)
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading , setLoading] = useState(true)

  const userRegister = (email, password) =>{
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password)
  }
  const userLogIn= (email, password) =>{
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password)
  }
  const updateUser = (userInfo) =>{
    return updateProfile(auth.currentUser, userInfo)
  }
  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, (currentUsr)=>{
        setUser(currentUsr)
        console.log(currentUsr);
        setLoading(false)
    })
    return ()=> unsubscribe;
  },[])
  const googleProvider = new GoogleAuthProvider()
  const signGoogle =()=>{
    return signInWithPopup( auth, googleProvider)
  }
  const  userSingOut = () =>{
    setLoading(true)
    localStorage.removeItem('accessToken')
    signOut(auth)
  }
    const authInfo = {
        user,
        loading,
        signGoogle,
        userLogIn,
        updateUser,
        userRegister,
        userSingOut
    }
    return (
        <AuthContext.Provider value={authInfo}>
        {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;