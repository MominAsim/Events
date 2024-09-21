import React, { useState, useEffect } from 'react'
import { useRegisterMutation } from '../../redux/api/authApi'
import {Link} from "react-router-dom";
import toast from "react-hot-toast"
import { Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MetaData from '../layout/MetaData'

const Register = () => {

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
    })

    const {name, email, password } = user;

    const navigate = useNavigate()

    const [register, {isLoading, error, data}] = useRegisterMutation()

    console.log(data)

    const {isAuthenticated} = useSelector((state) => state.auth)

    useEffect(() => {
      if (isAuthenticated) {
        navigate("/")
      }
      if(error){
        toast.error(error?.data?.message)
      }

    }, [error]);

    const onChange = (e) => {
      setUser({ ...user, [e.target.name]: e.target.value });
    };

      const submitHandler = (e) => {
          e.preventDefault();
  
          const signUpData = {
            name,
            email,
            password,
          } 
  
          register(signUpData);

      }

  return (
    <> 
    <MetaData title ={'Register'} />
     <div class="row wrapper">
      <div class="col-10 col-lg-5">
        <form
          class="shadow rounded bg-body"
          action="your_submit_url_here"
          method="post"
          enctype="multipart/form-data"
          onSubmit={submitHandler}
        >
          <h2 class="mb-4">Register</h2>

          <div class="mb-3">
            <label htmlFor="name_field" class="form-label">Name</label>
            <input
              type="text"
              id="name_field"
              class="form-control"
              name="name"
              value={name}
              onChange={onChange}
            />
          </div>

          <div class="mb-3">
            <label htmlFor="email_field" class="form-label">Email</label>
            <input
              type="email"
              id="email_field"
              class="form-control"
              name="email"
              value={email}
              onChange={onChange}
            />
          </div>

          <div class="mb-3">
            <label htmlFor="password_field" class="form-label">Password</label>
            <input
              type="password"
              id="password_field"
              class="form-control"
              name="password"
              value={password}
              onChange={onChange}
            />
          </div>

          <button id="register_button" type="submit" class="btn w-100 py-2" disabled={isLoading}>
            REGISTER
          </button>

         {isLoading ? "Creating...": "Register" }
         <br></br>
          <Link to="/login">Already have an account</Link>
        </form>
      </div>
    </div> 
    </> 
  )
}

export default Register
