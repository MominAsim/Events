import React, { useEffect, useState } from 'react'
import {useGetEventDetailsQuery} from '../../redux/api/eventApi'
import { useParams } from 'react-router-dom'
import Loader from '../layout/Loader'
import toast from 'react-hot-toast'
import MetaData from '../layout/MetaData'
import  NotFound  from '../layout/NotFound'

const EventDetails = () => {
  const params = useParams();

  const {data, isLoading, error, isError} = useGetEventDetailsQuery(params?.id);
  const event = data?.event;

  useEffect(()=>{
    if(isError){
      toast.error(error?.data?.message)
    }
  }, [isError])

  if (isLoading){
   return <Loader />
  }

  if(error && error?.status == 404){
    return <NotFound />
  }

  return (
    <> 
    <MetaData title ={event?.name} />
      <div className="col-12 col-lg-5 mt-5">
        <h3> {event?.name} </h3>
        <p id="product_id">Event Id #{event?._id}</p>
        <hr />

        <p id="product_price">Starting Time:{" "}{event?.timeStart}</p>
        <p id="product_price">Ending Time:{" "}{event?.timeEnd}</p>
        <hr />

        <p id="product_price">{""}{event?.day},{" "}{event?.date} - {event?.month} - {event?.year}</p>
        <hr />

        <h4 className="mt-2">Description:</h4>
        <p>
         {event?.description}
        </p>

        <hr />
        <p id="product_seller mb-3">Event Created By: <strong>{event?.user}</strong></p>

        <hr />
        <p>{event?.updatedAt?.substring(0,10)}</p>

      </div>
    </>
  )
}

export default EventDetails