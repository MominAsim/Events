import React from 'react'
import Register from "../auth/Register";
import Login from "../auth/Login";
import Profile from "../user/Profile";
import ListUserNotAdmin from "../user/ListUserNotAdmin";
import addUserEvent from "../user/addUserEvent";
import UpdateProfile from "../user/UpdateProfile";
import ProtectedRoute from "../auth/ProtectedRoute";
import UploadAvatar from "../user/UploadAvatar";
import UpdatePassword from "../user/UpdatePassword";
import ForgotPassword from "../auth/ForgotPassword";
import ResetPassword from "../auth/ResetPassword";
import  Home  from "../Home";
import VerifyEmail from "../auth/VerifyEmail";
import {Route} from "react-router-dom";
import EventDetails from '../events/EventDetails';
import showSchedule from "../user/showSchedule";


const userRoutes = () => {
  return (
    <>
      <Route path="/" element={<Home />}/>  
       <Route path="/login" element={<Login />}/>  
       <Route path="/register" element={<Register />}/>  

       <Route path="/password/forgot" element={<ForgotPassword />}/>  
       <Route path="/password/reset/:token" element={<ResetPassword />}/>  

       <Route path="/verify-email/:token/:id" element={<VerifyEmail />}/>  

       <Route path="/event/:id" element={<EventDetails />}/>  

       <Route 
       path="/me/profile" 
       element={
        <ProtectedRoute>
          <Profile />
          </ProtectedRoute>
        }
        />  
       <Route 
       path="/me/update_profile" 
       element={
          <ProtectedRoute>
            <UpdateProfile />
          </ProtectedRoute>
        }/>  

      <Route 
       path="/me/upload_avatar" 
       element={
          <ProtectedRoute>
            <UploadAvatar />
          </ProtectedRoute>
        }/>  

       <Route 
       path="/me/update_password" 
       element={
          <ProtectedRoute>
            <UpdatePassword />
          </ProtectedRoute>
        }/>  
       
       <Route 
       path="/users" 
       element={
        <ProtectedRoute>
          <ListUserNotAdmin />
          </ProtectedRoute>
        }
        /> 

       <Route 
       path="/add-event/:id" 
       element={
        <ProtectedRoute>
          <addUserEvent />
          </ProtectedRoute>
        }
        /> 

       <Route 
       path="/show-schedule/:id" 
       element={
        <ProtectedRoute>
          <showSchedule />
          </ProtectedRoute>
        }
        /> 

    </>
  )
}

export default userRoutes
