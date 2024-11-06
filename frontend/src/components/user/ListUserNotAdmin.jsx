import React, { useEffect } from 'react'
import Loader from '../layout/Loader'
import toast from 'react-hot-toast';
import {MDBDataTable} from 'mdbreact';
import MetaData from '../layout/MetaData'
import { useGetAllUsersQuery, } from '../../redux/api/userApi';
import {Link} from "react-router-dom";
import "../../css/addMeeting.css"

const ListUserNotAdmin = () => {
    const {data, isLoading, error} = useGetAllUsersQuery();

   useEffect(() => {
        if(error){
          toast.error(error?.data?.message)
        }

      }, [error,]);

      const setUsers = () => {
        const users = {
            columns: [
                {
                    label: 'Email',
                    field: 'email',
                    sort: "asc",
                },
                {
                  label: 'Names',
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

        data?.users?.forEach((user) => {
            users.rows.push({
                email: `${user?.email?.substring(0, 15)}...`,
                name: user?.name,
                actions: (
                <> 
                <Link to={`/add-event/${user?._id}`} className="btn btn-outline-primary"> 
                <i className="fas fa-plus"></i>
                </Link>

                <Link to={`/show-schedule/${user?._id}`} className="btn btn-outline-primary" id='actions-all-users-id'> 
                <i className="fas fa-user"></i>
                </Link>
                
                </>
            ),
            });
        });

        return users
      }

      if(isLoading) return <Loader />;

    return (
      <>
    <MetaData title ={'All Users'} />
    <div>
    <h1 className='my-5'>Select A User</h1>

    <MDBDataTable 
    data={setUsers()}
    className='px-3'
    id='listUserId'
    bproducted
    striped
    hover
    />
    </div>
    </>)}

export default ListUserNotAdmin
