import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setIsAuthenticated, setLoading, setUser } from '../features/userSlice';

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({baseUrl: "/api"}),
    tagTypes: ["User", "AdminUsers", "AdminUser"],
    endpoints: (builder) => ({
        getMe: builder.query({
            query: (id) => `/me`,
            transformResponse: (result) => result.user,
            async onQueryStarted(args, { dispatch, queryFulfilled }){
                try {
                   const {data} = await queryFulfilled;
                   dispatch(setUser(data));
                   dispatch(setIsAuthenticated(true));
                   dispatch(setLoading(false))
                } catch (error) {
                    dispatch(setLoading(false))
                    console.log(error);
                }
            },
            providesTags: ["User"],
            }),
            updateProfile: builder.mutation({
                query(body) {
                  return{
                    url: "/me/update",
                    method: "PUT",
                    body,
                  };
                },
                invalidatesTags: ['User']
        }),
        uploadAvatar: builder.mutation({
            query(body) {
              return{
                url: "/me/upload_avatar",
                method: "PUT",
                body,
              };
            },
            invalidatesTags: ["User"]
    }),
    updatePassword: builder.mutation({
      query(body) {
        return{
          url: "/password/update",
          method: "PUT",
          body,
        };
      },
}),
forgotPassword: builder.mutation({
  query(body) {
    return{
      url: "/password/forgot",
      method: "POST",
      body,
    };
  },
}),

resetPassword: builder.mutation({
  query({ token, body }) {
    return{
      url: `/password/reset/${token}`,
      method: "PUT",
      body,
    };
  },
}),

getAllUsers: builder.query({
  query: () => `/users`,
  providesTags: ["Users"],
}),

updateUserNotAdmin: builder.mutation({
  query({ id, body }) {
    return {
      url: `/add-event/${id}`,
      method: "PUT",
      body,
    };
  },
  invalidatesTags: ["Users"],
}),


getAdminUsers: builder.query({
  query: () => `/admin/users`,
  providesTags: ["AdminUsers"],
}),

getUserDetails: builder.query({
  query: (id) => `/admin/users/${id}`,
  providesTags: ["AdminUser"],
}),

updateUser: builder.mutation({
  query({ id, body }) {
    return {
      url: `/admin/users/${id}`,
      method: "PUT",
      body,
    };
  },
  invalidatesTags: ["AdminUsers"],
}),

deleteUser: builder.mutation({
  query(id) {
    return {
      url: `/admin/users/${id}`,
      method: "DELETE",
    };
  },
  invalidatesTags: ["AdminUsers"],
}),

getSchedule: builder.query({
  query: (id) => `/show-schedule/${id}`,
  providesTags: ["AdminUser"],
}),

}),
});

export const { 
  useGetMeQuery, 
  useUpdateProfileMutation, 
  useUploadAvatarMutation, 
  useUpdatePasswordMutation, 
  useForgotPasswordMutation, 
  useResetPasswordMutation,
  useGetAllUsersQuery,
  useUpdateUserNotAdminMutation,
  useGetAdminUsersQuery,
  useGetUserDetailsQuery,
  useGetScheduleQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;