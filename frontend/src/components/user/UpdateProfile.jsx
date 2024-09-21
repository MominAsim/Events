import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {useUpdateProfileMutation} from '../../redux/api/userApi'
import UserLayout from '../layout/UserLayout';
import MetaData from '../layout/MetaData'

const UpdateProfile = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("")

    const navigate = useNavigate()

    const [updateProfile, {isLoading, error, isSuccess}] = useUpdateProfileMutation()
      
    const { user } = useSelector((state) => state.auth);

    useEffect(()=>{
        if(user){
            setName(user?.name);
            setEmail(user?.Email);
        }
        if(error){
            toast.error(error?.data?.message)
        }
        if(isSuccess){
            toast.success("User updated")
            navigate("/me/profile")
        }
    }, [user, error, isSuccess])

    const submitHandler = (e) => {
        e.preventDefault();
        
        const userData = {
          name,
          email,
        };

        updateProfile(userData);
      };

  return (
    <UserLayout>
      <> 
      <MetaData title ={'Update Profile'} />
    <div className="row wrapper">
    <div className="col-10 col-lg-8">
      <form
        className="shadow rounded bg-body"
        onSubmit={submitHandler}
      >
        <h2 className="mb-4">Update Profile</h2>

        <div className="mb-3">
          <label htmlFor="name_field" className="form-label"> ENTER YOUR NEW NAME </label>
          <input
            type="text"
            id="name_field"
            className="form-control"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* <div className="mb-3">
          <label htmlFor="email_field" className="form-label">CHANGE EMAIL ASSOCIATED WITH THIS ACCOUNT</label>
          <input
            type="email"
            id="email_field"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div> */}

        <button type="submit" className="btn update-btn w-100" disabled={isLoading}>
            {isLoading ? "Updating...." : "Update"} 
        </button>
      </form>
    </div>
  </div>
  </>
  </UserLayout>
  )
}

export default UpdateProfile
