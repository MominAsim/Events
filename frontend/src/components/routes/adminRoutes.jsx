import React from 'react'
import {Route} from "react-router-dom";
import ProtectedRoute from "../auth/ProtectedRoute";
import ListEvents from '../admin/ListEvents';
import NewEvent from '../admin/NewEvent';
import UpdateEvent from '../admin/UpdateEvent';
import ListUsers from '../admin/ListUser';
import UpdateUser from '../admin/UpdateUser';

const adminRoutes = () => {
  return (
    <>

       <Route 
       path="/admin/Events" 
       element={
       <ProtectedRoute admin={true}>
       <ListEvents />
       </ProtectedRoute>
        }/>  

        <Route
        path="/admin/event/new"
        element={
          <ProtectedRoute admin={true}>
            <NewEvent />
          </ProtectedRoute>
        }
      />

        <Route
        path="/admin/Events/:id"
        element={
          <ProtectedRoute admin={true}>
            <UpdateEvent />
          </ProtectedRoute>
        }
      />

       <Route
        path="/admin/users"
        element={
          <ProtectedRoute admin={true}>
            <ListUsers />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/admin/users/:id"
        element={
          <ProtectedRoute admin={true}>
            <UpdateUser />
          </ProtectedRoute>
        }
      />
    </> 
  )
}

export default adminRoutes
