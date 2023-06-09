import 'tailwindcss/tailwind.css';
import 'daisyui/dist/full.css';

import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './Components/Shared/Navbar'
import Footer from './Components/Shared/Footer';

function App() {
 

  return (
    <div>
    
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  )
}

export default App
