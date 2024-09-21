import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { userApi } from '../api/userApi'
import toast from "react-hot-toast"
import {navigate, useNavigate } from 'react-router-dom';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({baseUrl: "/api"}),
    endpoints: (builder) => ({
        register: builder.mutation({
            query(body) {
                return {
                    url: "/register",
                    method: "POST",
                    body,
                }
            },
            async onQueryStarted(args, {dispatch, queryFulfilled,}){
                try {
                 await queryFulfilled
                 await dispatch(userApi.endpoints.getMe.initiate(null))
                 toast.success("Verification email sent to your gmail" );
                } catch (error) {
                    console.log(error);
                }
            },
        }),

        login: builder.mutation({
            query(body) {
                return {
                    url: "/login",
                    method: "POST",
                    body,
                }
            },
            async onQueryStarted(args, {dispatch, queryFulfilled,}){
                try {
                 await queryFulfilled
                 await dispatch(userApi.endpoints.getMe.initiate(null))
                 toast.success("Successfully Logged In")
                } catch (error) {
                    console.log(error);
                }
            }
        }),

        verifyToken: builder.mutation({
            query(body, token, id) {
              return{
                url: `/confirm/${token}/${id}`,
                method: "POST",
                body,
              };
            },
          }),

        logout: builder.query({
            query: () => "/logout",
        }),
    }),
});

export const { useLoginMutation, useRegisterMutation, useLazyLogoutQuery, useVerifyTokenMutation} = authApi;