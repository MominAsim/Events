import React, { useEffect } from 'react'
import { useGetEventsQuery } from '../redux/api/eventApi'
import EventItem from '../components/events/EventItem.jsx'
import Loader from '../components/layout/Loader.jsx'
import toast from 'react-hot-toast'
import CustomPagination from '../components/layout/CustomPagination.jsx'
import MetaData from '../components/layout/MetaData'
import {useSearchParams} from 'react-router-dom'

const Home = () => {

  let [searchParams] = useSearchParams()
  const page = searchParams.get("page") || 1;
  const keyword = searchParams.get("keyword") || "";
  const params = { page, keyword };

  const {data, isLoading, error, isError} = useGetEventsQuery(params);
   
  useEffect(()=>{
    if(isError){
      toast.error(error?.data?.message)
    }
  }, [isError])

  const columnSize = keyword ? 4 : 3

  if (isLoading){
   return <Loader />
  }

  return (
    <>
    <MetaData title = {'All Events'} />
    <div className="row">
    <div className={keyword ? "col-6 col-md-9" : "col-12 col-sm-6 col-md-12"}>
    <br></br>
    <br></br>

    <h1 id="product_heading" className="text-secondary">  
       School Events
   </h1>

    <section id="products" className="mt-5">
    <div className="row">
      {data?.events?.map((event) => (
        <EventItem event={event} columnSize = {columnSize}/>
      ))}
    </div>
    </section>
    <CustomPagination resPerPage={data?.resPerPage} filteredProductsCount={data?.filteredProductsCount}/>
    </div>
    </div>
    </>
  )
}

export default Home
