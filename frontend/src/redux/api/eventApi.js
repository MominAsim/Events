import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const eventApi = createApi({
    reducerPath: 'eventApi',
    baseQuery: fetchBaseQuery({baseUrl: "/api"}),
    tagTypes: ["Event", "AdminEvents"],
    keepUnusedDataFor: 60,
    endpoints: (builder) => ({
        getEvents: builder.query({
            query: (params) => ({ 
            url: "/events",
            params: {
                page: params?.page,
                keyword: params?.keyword,
                category: params?.category,
                "price[gte]": params.min,
                "price[lte]": params.max,
                "ratings[gte]": params?.ratings,
            }
        }),
        }),
        getEventDetails: builder.query({
            query: (id) => `/events/${id}`,
            providesTags: ["Event"]
        }),

        getAdminEvents: builder.query({
          query: () => `/admin/events`,
          providesTags: ['AdminEvents']
      }),

      createEvent: builder.mutation({
        query(body) {
          return {
            url: "/admin/events",
            method: "POST",
            body,
          };
        },
        invalidatesTags: ['AdminEvents']
      }),

      updateEvent: builder.mutation({
        query({ id, body }) {
          return {
            url: `/admin/events/${id}`,
            method: "PUT",
            body,
          };
        },
        invalidatesTags: ["Event", "AdminEvents"],
      }),

      deleteEvent: builder.mutation({
        query(id) {
          return {
            url: `/admin/events/${id}`,
            method: "DELETE",
          };
        },
        invalidatesTags: ["Event", "AdminEvents"],
      }),
    }),
    });

export const { 
  useGetEventsQuery, 
  useGetEventDetailsQuery, 
  useGetAdminEventsQuery,
  useCreateEventMutation,
  useUpdateEventMutation,
  useDeleteEventMutation,
} = eventApi;