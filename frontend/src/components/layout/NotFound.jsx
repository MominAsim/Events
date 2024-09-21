import React from 'react'
import {Link} from "react-router-dom";
import MetaData from '../layout/MetaData'

const NotFound = () => {
  return (
    <>
    <MetaData title={'This Page Does Not Exist'} />
      <div className="row">
      <div className="d-flex justify-content-center page-not-found-wrapper">
        <img
          src="/images/404.svg"
          height="550"
          width="550"
          alt="404_not_found"
          className='not-found-image'
        />
      </div>
      <h5 className="text-center">
        Page Not Found. Go to <Link to="/">Homepage</Link>
      </h5>
    </div>
   </>  
)
}

export default NotFound
