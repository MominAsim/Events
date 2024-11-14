import React, { useEffect } from 'react'
import Loader from '../layout/Loader'
import toast from 'react-hot-toast';
import {MDBDataTable} from 'mdbreact';
import {Link, useNavigate, useSearchParams} from "react-router-dom";
import MetaData from '../layout/MetaData'
import { useDeleteEventMutation, useGetAdminEventsQuery } from '../../redux/api/eventApi';
import AdminLayout from '../layout/AdminLayout'

const ListEvents = () => {
    const {data, isLoading, error} = useGetAdminEventsQuery();

    const [deleteEvent, {isLoading: isDeleteLoading, error: deleteError, isSuccess }] = useDeleteEventMutation()

    useEffect(() => {
        if(error){
          toast.error(error?.data?.message)
        }
        if(deleteError){
            toast.error(deleteError?.data?.message)
          }
        if(isSuccess){
            toast.success("Event Deleted")
          }

      }, [error, deleteError, isSuccess]);
  
      const deleteEventHandler = (id) => {
         deleteEvent(id)
      }

      const setEvents = () => {
        const events = {
            columns: [
                {
                    label: 'Name',
                    field: 'name',
                    sort: "asc",
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    sort: "asc",
                },
            ],
            rows: [],
        };

        data?.events?.forEach((event) => {
            events.rows.push({
                // id: `${event?._id?.substring(0, 8)}...`,
                name: `${event?.name}`,
                actions: (
                <> 
                <Link to={`/admin/events/${event?._id}`} className="btn btn-outline-primary" > 
                <i className="fa fa-pencil"></i>
                </Link>

                <button className="btn btn-outline-danger ms-2" onClick={() => deleteEventHandler(event?._id)} disabled={isDeleteLoading}> 
                <i className="fa fa-trash"></i>
                </button>
                </>
            ),
            });
        });

        return events
      }

      if(isLoading) return <Loader />;

    return (
    <AdminLayout> 
    <MetaData title ={'All Admin Events'} />
    <div>
    <h1 className='my-5'>{data?.events?.length} Events</h1>

    <MDBDataTable 
    data={setEvents()}
    className='px-3'
    bevented
    striped
    hover
    />
    </div>
</AdminLayout>
)}

export default ListEvents
