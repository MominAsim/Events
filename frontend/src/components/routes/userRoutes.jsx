import React from 'react'
import Register from "../auth/Register";
import Login from "../auth/Login";
import Profile from "../user/Profile";
import UpdateProfile from "../user/UpdateProfile";
import ProtectedRoute from "../auth/ProtectedRoute";
import UploadAvatar from "../user/UploadAvatar";
import UpdatePassword from "../user/UpdatePassword";
import ForgotPassword from "../auth/ForgotPassword";
import ResetPassword from "../auth/ResetPassword";
import  Home  from "../Home";
import VerifyEmail from "../auth/VerifyEmail";
import {Route} from "react-router-dom";

const userRoutes = () => {
  return (
    <>
      <Route path="/" element={<Home />}/>  
       <Route path="/login" element={<Login />}/>  
       <Route path="/register" element={<Register />}/>  

       <Route path="/password/forgot" element={<ForgotPassword />}/>  
       <Route path="/password/reset/:token" element={<ResetPassword />}/>  

       <Route path="/verify-email/:token/:id" element={<VerifyEmail />}/>  

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

    </>
  )
}

export default userRoutes
