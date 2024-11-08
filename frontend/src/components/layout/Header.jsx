import React from 'react'
import Search from '../layout/Search'
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import '../../css/Header.css'
import '../../../src/App.css'

import { useGetMeQuery } from '../../redux/api/userApi'
import { useLazyLogoutQuery } from '../../redux/api/authApi';

export default function Header() {

  const navigate = useNavigate()

  const {isLoading} = useGetMeQuery();

  const [logout] = useLazyLogoutQuery();

  const { user } = useSelector((state) => state.auth) 

  const logoutHandler = () =>{
    logout();
    navigate(0);
  }

  return (
    <nav className="navbar row">
      <div className="col-12 col-md-3 ps-5" id='header-div-id'>
        <div className="navbar-brand">
          <a href="/">
            <img src="../images/logo-no-bg.png" alt="Event Planner" className='header-logo'/>
          </a>
        </div>
      </div>    
      <div className="col-12 col-md-6 mt-2 mt-md-0" id='search-parent-div'>
        <Search />
      </div>  

      <div className="col-12 col-md-3 mt-4 mt-md-0 text-center" id='cart-login-user-div'>
        {user ? (
                  <div className="ms-4 dropdown">
                  <button
                    className="btn dropdown-toggle text-white"
                    type="button"
                    id="dropDownMenuButton"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <figure className="avatar avatar-nav">
                      <img
                        src={user?.avatar ? user?.avatar?.url : "../images/default_avatar.jpg"}
                        alt="User Avatar"
                        className="rounded-circle" 
                      />
                    </figure>
                    <span>{user?.name}</span>        
                    </button>
                  <div className="dropdown-menu w-100" aria-labelledby="dropDownMenuButton">

                    {user?.role === 'admin' && (
                    <Link className="dropdown-item" to="/admin/events">Admin</Link>
                    )}
                
                    <Link className="dropdown-item" to="/me/profile"> Profile </Link>

                    {/* <Link className="dropdown-item" to="/users"> Schedule Meeting </Link>

                    <Link className="dropdown-item" to="/my-schedule">My Schedule</Link> */}

                    <Link className="dropdown-item text-danger" onClick={logoutHandler} to="/"> Logout </Link>
                  </div>
                </div>
       ): (
         !isLoading && (
          <>
          <br></br>
          <Link to="/login" className="btn ms-4" id="login_btn">
            <button className='button-login'>
            Login
            </button>
            </Link>    
            </>  
         )
       )} 
      </div>
    </nav>
  );
};
