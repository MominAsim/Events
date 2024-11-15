import React, { useEffect, useState } from 'react'
import toast from "react-hot-toast"
import { navigate, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MetaData from '../layout/MetaData'
import { useSearchParams, useParams } from 'react-router-dom';
import { useVerifyTokenMutation } from '../../redux/api/authApi'
import {useLoginMutation} from '../../redux/api/authApi'

const VerifyEmail = () => {
    
    const navigate = useNavigate()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")

    const [verifyToken, { isLoading, error, isSuccess}] = useVerifyTokenMutation()

    useEffect(() => {
      if(error){
        toast.error(error?.data?.message)
      }
      if(isSuccess){
        toast.success("Email Verified successfully")
        navigate("/login")
      }
    }, [error, isSuccess]);

    const submitHandler = (e) => {
        e.preventDefault();

        const verifyData = {
          email,
          password
        }
        verifyToken(verifyData);
      }

  return (
    <>
    <MetaData title ={'Email Verification'} />
    <div className="row wrapper">
    <div className="col-10 col-lg-5">
      <form className="shadow rounded bg-body" onSubmit={submitHandler}>
        <h2 className="mb-4">Email Verification</h2>
        <div className="mb-3">
          <label htmlFor="email_field" className="form-label">Email</label>
          <input
            type="email"
            id="email_field"
            className="form-control"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password_field" className="form-label">Password</label>
          <input
            type="password"
            id="password_field"
            className="form-control"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <a href="/password/forgot" className="float-end mb-4">Forgot Password?</a>

        <button id="login_button" type="submit" className="btn w-100 py-2" disabled={isLoading} >
          {isLoading ? "Verifying...": "Verify Email"}
        </button>
      </form>
    </div>
  </div>
    </>
  )
}
export default VerifyEmail
