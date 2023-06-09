import 'tailwindcss/tailwind.css';
import 'daisyui/dist/full.css';

import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './Components/Shared/Navbar'
import Footer from './Components/Shared/Footer';
import { useContext } from 'react';
import { AuthContext } from './Components/Authorization/AuthProvider';

function App() {
  const {user} = useContext(AuthContext)
  if(!user){
   return <div className='w-full  h-screen  flex justify-center items-center'><span className="loading loading-bars loading-lg"></span></div>
  }

  return (
    <div>
    
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  )
}

export default App
