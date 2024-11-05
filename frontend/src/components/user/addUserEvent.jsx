import React from 'react'
import MetaData from '../layout/MetaData'
import { useUpdateUserNotAdminMutation, } from '../../redux/api/userApi';

const addUserEvent = () => {
  return (
     <>
    <MetaData title ={'ALL USERS (ADMIN)'} />
      
    </>
  )
}

export default addUserEvent
