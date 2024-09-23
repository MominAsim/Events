import React from 'react'
import {Link} from "react-router-dom";
import MetaData from '../layout/MetaData'

const EventItem = ({event, columnSize}) => {
  return (
    <> 
    <MetaData title ={event?.name} />
        <div className={`col-sm-12 col-md-6 col-lg-${columnSize} my-3`}>
          <div className="card p-3 rounded">
            <div className="card-body ps-3 d-flex justify-content-center flex-column">
              <h5 className="card-title">
                <Link to= {`/event/${event?._id}`}>{event?.name}</Link>
              </h5>

              <p className="card-text mt-2">{event?.date}-{event?.month?.substring(0,3)}-{event?.year}</p>
 
              <p className="card-text mt-2">{event?.timeStart} {" "} - {" "}{event?.timeEnd}</p>
              <Link to = {`/event/${event?._id}`} id="view_btn" className="btn btn-block">
                View Details
              </Link>
            </div>
          </div>
        </div>
        </>
  )
}

export default EventItem
