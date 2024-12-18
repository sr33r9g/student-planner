import React from 'react';
import './App.css'
import { createBrowserRouter,Navigate,RouterProvider } from 'react-router-dom';
import Login from './pages/Login/Login.jsx';
import SignUp from './pages/SignUp/SignUp.jsx';
import {Toaster} from 'react-hot-toast'
import { useAuthContext } from './Context/Auth.context.jsx';
import Home from './pages/Home/Home.jsx';
import Notes from './pages/Notes/notes.jsx';
import Cal from './pages/Calender/Calender.jsx';
import NotificationDialog from './pages/Eve/NotificationDialog.jsx';





function App() {
  const {authUser}=useAuthContext()
  const router=createBrowserRouter([
    {
      path:'/login',
      element:authUser?<Navigate to='/home'/>:<Login/>,
      errorElement: <div>404 Not Found</div>
    },
    {
      path:'/signup',
      element:authUser?<Navigate to='/home'/>:<SignUp/>,
      errorElement: <div>404 Not Found</div>
    },
    {
      path:'/home/cal',
      element:<Cal/>,
      errorElement:<div>404 Not Found</div>
    },
    {
      path:'/home',
      element:authUser?<Home/>:<Navigate to='/login'/>,
      errorElement: <div>404 Not Found</div>
    },
    {
      path:'/home/notes',
      element:authUser?<Notes/>:<Navigate to="/login"/>,
      errorElement:<div>404 Not Found</div>
    },
    {
      path:'/eve',
      element:<NotificationDialog/>,
      errorElement:<div>404 Not Found</div>
    }

  
  ]);
  return (   
    
    <div className='container hwc' >
     
     <RouterProvider router={router} />
     <Toaster />
   </div>
    
  );
}

export default App;
