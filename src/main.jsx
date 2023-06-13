import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './Components/Home/Home.jsx';
import SignUp from './Components/Authorization/SignUp.jsx';
import Login from './Components/Authorization/Login.jsx';
import AuthProvider from './Components/Authorization/AuthProvider.jsx';


import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import Instructors from './Components/Instructor/Instructors.jsx';
import Classes from './Components/Classes/Class.jsx';
import Error404 from './Components/Shared/Error.jsx';
import Dashboard from './Components/Dashboard/Dashboard.jsx';
import SelectedClass from './Components/Dashboard/UserDashboard/SelectedClass.jsx';
import EnrolledClass from './Components/Dashboard/UserDashboard/EnrolledClass.jsx';
import PrivetRoute from './Components/Authorization/PrivetRoute.jsx';
import DashboardOverview from './Components/Dashboard/DashboardOverview.jsx';
import AddClass from './Components/Dashboard/InstructorDashboard/AddClass.jsx';
import MyClass from './Components/Dashboard/InstructorDashboard/MyClass.jsx';
import PayClass from './Components/Dashboard/UserDashboard/PayClass.jsx';
import ManageUsers from './Components/Dashboard/AdminDashboard/ManageUsers.jsx';
import ManageClass from './Components/Dashboard/AdminDashboard/ManageClass.jsx';

const queryClient = new QueryClient()


const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    errorElement: <Error404></Error404>,
    children: [
      {
        path: "/",
        element: <Home></Home>
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>
      },
      {
        path: "/login",
        element: <Login></Login>
      },
      {
        path: '/instructors',
        element: <Instructors></Instructors>
      },
      {
        path: "class",
        element: <Classes></Classes>
      }
    ]
  },
  {
    path: "/dashboard",
    element: <PrivetRoute><Dashboard></Dashboard></PrivetRoute>,
    children: [
      {
        path: "/dashboard",
        element: <DashboardOverview></DashboardOverview>
      },
      // user Routes
      {
        path: "selectedClass",
        element: <SelectedClass></SelectedClass>
      },
      {
        path: "enrolledClass",
        element: <EnrolledClass></EnrolledClass>
      },
      {
        path: "payClass",
        element: <PayClass></PayClass>
      },
      // instructors route
      {
        path: "addClass",
        element: <AddClass></AddClass>
      },
      {
        path: "myClass",
        element: <MyClass></MyClass>
      },
      // admin routes
      {
        path: "manageUsers",
        element: <ManageUsers></ManageUsers>
      },
      {
        path: "manageClass",
        element: <ManageClass></ManageClass>
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>,
)




