import React, { useEffect } from 'react'
import Loader from '../layout/Loader'
import toast from 'react-hot-toast';
import {MDBDataTable} from 'mdbreact';
import MetaData from '../layout/MetaData'
import { useGetAdminUsersQuery, useDeleteUserMutation } from '../../redux/api/userApi';
import AdminLayout from '../layout/AdminLayout'
import {Link, useNavigate, useSearchParams} from "react-router-dom";

const ListUsers = () => {
    const {data, isLoading, error} = 
    useGetAdminUsersQuery();

   const [deleteUser, {error: deleteError, isLoading: isDeleteLoading, isSuccess}] = 
   useDeleteUserMutation()
   
   useEffect(() => {
        if(error){
          toast.error(error?.data?.message)
        }
        if(deleteError){
            toast.error(deleteError?.data?.message)
          }
        if(isSuccess){
            toast.success("User Deleted")
          }

      }, [error, deleteError, isSuccess]);
  
      const deleteUserHandler = (id) => {
        deleteUser(id)
      }

      const setUsers = () => {
        const users = {
            columns: [
                {
                    label: 'Email',
                    field: 'email',
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
                email: user?.email,
                actions: (
                <> 
                <Link to={`/admin/users/${user?._id}`} className="btn btn-outline-primary" > 
                <i className="fa fa-pencil"></i>
                </Link>
                
                <button className="btn btn-outline-danger ms-2 "id='user-delete-button' onClick={() => deleteUserHandler(user?._id)}disabled={isDeleteLoading}>
                <i className="fa fa-trash" id='user-delete-button-logo'></i>
                </button>
                </>
            ),
            });
        });

        return users
      }

      if(isLoading) return <Loader />;

    return (
    <AdminLayout> 
    <MetaData title ={'ALL USERS (ADMIN)'} />
    <div>
    <h1 className='my-5'>{data?.user?.length} Users</h1>

    <MDBDataTable 
    data={setUsers()}
    className='px-3'
    id='listUserId'
    bproducted
    striped
    hover
    />
    </div>
</AdminLayout>
)}

export default ListUsers
