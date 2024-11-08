import React, { useEffect } from 'react'
import { useGetEventsQuery } from '../redux/api/eventApi'
import EventItem from '../components/events/EventItem.jsx'
import Loader from '../components/layout/Loader.jsx'
import Filters from '../components/layout/Filters.jsx'
import toast from 'react-hot-toast'
import CustomPagination from '../components/layout/CustomPagination.jsx'
import MetaData from '../components/layout/MetaData'
import {useSearchParams} from 'react-router-dom'

const Home = () => {
  let [searchParams] = useSearchParams()
  const page = searchParams.get("page") || 1;
  const keyword = searchParams.get("keyword") || "";
  const min = searchParams.get("min")
  const max = searchParams.get("max") 
  const category = searchParams.get("category") 
  const ratings = searchParams.get("ratings") 

  const params = { page, keyword };
  
  min !== null && (params.min = min);
  max !== null && (params.max = max);
  category !== null && (params.category = category);
  ratings !== null && (params.ratings = ratings);

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
    {keyword && (
      <div className='col-6 col-md-3 mt-5'>
       <Filters />
      </div>
    )}
    <div className={keyword ? "col-6 col-md-9" : "col-12 col-sm-6 col-md-12"}>

    <h1 id="products_heading" className="text-secondary">
      {keyword
      ? `${data?.events?.length} Events found with The name of "${keyword}"`
      : "Latest Products"}
    </h1>

    <section id="products" className="mt-5">
    <div className="row">
      {data?.events?.map((event) => (
        <EventItem event={event} columnSize = {columnSize}/>
      ))}
    </div>
    </section>
    <CustomPagination resPerPage={data?.resPerPage} filteredEventsCount={data?.filteredEventsCount}/>
    </div>
    </div>

    </>
  )
}

export default Home
