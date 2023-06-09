import 'tailwindcss/tailwind.css';
import 'daisyui/dist/full.css';

import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './Components/Shared/Navbar'

function App() {

  return (
    <div>
      <Navbar></Navbar>
      <Outlet></Outlet>
    </div>
  )
}

export default App
