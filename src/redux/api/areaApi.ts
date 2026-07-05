import { baseApi } from './baseApi';

export const areaApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get All Areas
    getAllAreas: builder.query({
      query: (params = {}) => ({
        url: '/area',
        params,
      }),
      providesTags: ['Area'],
    }),

    // Get Single Area
    getSingleArea: builder.query({
      query: (id) => `/area/${id}`,
      providesTags: (result, error, id) => [{ type: 'Area', id }],
    }),

    // Create Area (Admin)
    createArea: builder.mutation({
      query: (body) => ({
        url: '/area/admin/create',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Area'],
    }),

    // Update Area (Admin)
    updateArea: builder.mutation({
      query: ({ id, body }) => ({
        url: `/area/admin/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: (result, error, { id }) => ['Area', { type: 'Area', id }],
    }),

    // Delete Area (Admin)
    deleteArea: builder.mutation({
      query: (id) => ({
        url: `/area/admin/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Area'],
    }),
  }),
});

export const {
  useGetAllAreasQuery,
  useGetSingleAreaQuery,
  useCreateAreaMutation,
  useUpdateAreaMutation,
  useDeleteAreaMutation,
} = areaApi;