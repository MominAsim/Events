import React from 'react'
import UserLayout from '../layout/UserLayout'
import {useSelector} from "react-redux"
import MetaData from '../layout/MetaData'
import "../../css/Profile.css"
const Profile = ()  => {
  const {user} = useSelector((state) => state.auth)

  console.log(user?.role);

  return ( 
  <UserLayout>
        <> 
        <MetaData title ={'Profile'} />
     <div className="row justify-content-around mt-5 user-info" id='profile-data-show'>
      <div className="col-12 col-md-3">
        <figure className="avatar avatar-profile" id='avatar-profile-show-main'>
          <img
            className="rounded-circle img-fluid"
            src={
              user?.avatar ? user?.avatar?.url : "/images/default_avatar.jpg"
            }
            alt={user?.name}
          />
        </figure>
      </div>

      <div className="col-12 col-md-5">
        <h4>Full Name</h4>
        <p>{user?.name}</p>

        <h4>Email Address</h4>
        <p>{user?.email}</p>

        <h4>Joined On</h4>
        <p>{user?.createdAt?.substring(0,10)}</p>
      </div>
    </div>
    </> 
    </UserLayout> 
)}

export default Profile