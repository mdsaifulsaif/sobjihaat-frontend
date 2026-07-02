import { baseApi } from './baseApi';

export const riderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ==================== RIDER APPLICATION ====================
    applyForRider: builder.mutation({
      query: ({ body, files }) => {
        const formData = new FormData();

        // Text fields
        Object.keys(body).forEach((key) => {
          if (body[key] !== undefined) {
            if (key === 'preferredAreas') {
              formData.append(key, JSON.stringify(body[key]));
            } else {
              formData.append(key, body[key]);
            }
          }
        });

        // File
        if (files?.nidImage?.[0]) {
          formData.append('nidImage', files.nidImage[0]);
        }

        return {
          url: '/rider/apply',
          method: 'POST',
          body: formData,
        };
      },
      invalidatesTags: ['RiderApplication'],
    }),

    getMyApplication: builder.query({
      query: () => '/rider/my-application',
      providesTags: ['RiderApplication'],
    }),

    getAllRiderApplications: builder.query({
      query: (params = {}) => ({
        url: '/rider/admin/applications/all',
        params,
      }),
      providesTags: ['RiderApplication'],
    }),

    approveApplication: builder.mutation({
      query: (id) => ({
        url: `/rider/admin/${id}/approve`,
        method: 'PATCH',
      }),
      invalidatesTags: ['RiderApplication'],
    }),

    rejectApplication: builder.mutation({
      query: (id) => ({
        url: `/rider/admin/${id}/reject`,
        method: 'PATCH',
      }),
      invalidatesTags: ['RiderApplication'],
    }),

    // ==================== RIDER PROFILE & OPERATIONS ====================
    getMyRiderProfile: builder.query({
      query: () => '/rider/my-profile',
      providesTags: ['RiderProfile'],
    }),

    updateRiderStatus: builder.mutation({
      query: (body) => ({
        url: '/rider/status',
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['RiderProfile'],
    }),

    updateRiderLocation: builder.mutation({
      query: (body) => ({
        url: '/rider/location',
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['RiderProfile'],
    }),

    getAllRiders: builder.query({
      query: (params = {}) => ({
        url: '/rider/admin/all',
        params,
      }),
      providesTags: ['Riders'],
    }),

    getRiderById: builder.query({
      query: (id) => `/rider/admin/${id}`,
      providesTags: (result, error, id) => [{ type: 'Riders', id }],
    }),

    updateRiderAssignedAreas: builder.mutation({
      query: ({ id, body }) => ({
        url: `/rider/admin/${id}/areas`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Riders'],
    }),

    toggleRiderActiveStatus: builder.mutation({
      query: ({ id, body }) => ({
        url: `/rider/admin/${id}/active-status`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Riders'],
    }),
  }),
});

export const {
  // Rider Application
  useApplyForRiderMutation,
  useGetMyApplicationQuery,
  useGetAllRiderApplicationsQuery,
  useApproveApplicationMutation,
  useRejectApplicationMutation,

  // Rider Profile
  useGetMyRiderProfileQuery,
  useUpdateRiderStatusMutation,
  useUpdateRiderLocationMutation,

  // Admin Rider Management
  useGetAllRidersQuery,
  useGetRiderByIdQuery,
  useUpdateRiderAssignedAreasMutation,
  useToggleRiderActiveStatusMutation,
} = riderApi;