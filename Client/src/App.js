import './App.css';
import Router from './Routers/Router';
import 'react-day-picker/dist/style.css';
import { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';

function App() {
  const [theme, setTheme] = useState("light")
useEffect(()=>{
 
    if(theme=== "dark"){
      document.documentElement.classList.add("dark")
    } 
   else{
    document.documentElement.classList.remove('dark')
   }
 
},[theme])
const handelDark = () =>{
  setTheme(theme === "dark" ? "light" : "dark")
}
  return (
    <div className='max-w-[1440px] mx-auto dark:bg-white  bg-black' >
    <Router handelDark={handelDark}></Router>
    <Toaster></Toaster>
    </div>
  );
}

export default App;
