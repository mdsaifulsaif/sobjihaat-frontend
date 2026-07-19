// import { baseApi } from "./baseApi";

// export const reviewApi = baseApi.injectEndpoints({
//     endpoints: (builder) => ({
//         getAllReviews: builder.query({
//             query: (params) => ({
//                 url: '/reviews/admin/all',
//                 method: 'GET',
//                 params
//             }),
//             providesTags: ['Reviews']
//         }),
//         getReviewStats: builder.query({
//             query: () => ({
//                 url: '/reviews/admin/stats',
//                 method: 'GET'
//             }),
//             providesTags: ['Reviews']
//         }),
//         updateReviewStatus: builder.mutation({
//             query: ({ id, status }) => ({
//                 url: `/reviews/admin/${id}/status`,
//                 method: 'PATCH',
//                 body: { status }
//             }),
//             invalidatesTags: ['Reviews']
//         }),
//         addAdminReply: builder.mutation({
//             query: ({ id, reply }) => ({
//                 url: `/reviews/admin/${id}/reply`,
//                 method: 'POST',
//                 body: { reply }
//             }),
//             invalidatesTags: ['Reviews']
//         }),
//         deleteReview: builder.mutation({
//             query: (id) => ({
//                 url: `/reviews/${id}`,
//                 method: 'DELETE'
//             }),
//             invalidatesTags: ['Reviews']
//         }),
//         // For product page
//         getProductReviews: builder.query({
//             query: ({ productId, ...params }) => ({
//                 url: `/reviews/product/${productId}`,
//                 method: 'GET',
//                 params
//             }),
//             providesTags: (result, error, { productId }) => [{ type: 'Reviews', id: productId }]
//         }),
//     })
// });

// export const {
//     useGetAllReviewsQuery,
//     useGetReviewStatsQuery,
//     useUpdateReviewStatusMutation,
//     useAddAdminReplyMutation,
//     useDeleteReviewMutation,
//     useGetProductReviewsQuery
// } = reviewApi;


import { baseApi } from "./baseApi";

export const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    // User: Create review
    createReview: builder.mutation({
      query: (data) => ({
        url: '/reviews/add-review',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Reviews'],
    }),

    // Get all reviews (Public/User)
    getReviews: builder.query({
      query: (params) => ({
        url: '/reviews',
        method: 'GET',
        params,
      }),
      providesTags: ['Reviews'],
    }),

    // Get review by id
    getReviewById: builder.query({
      query: (id) => `/reviews/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Reviews', id }],
    }),

    // For product page (User)
    getProductReviews: builder.query({
      query: ({ productId, ...params }) => ({
        url: `/reviews/product/${productId}`,
        method: 'GET',
        params,
      }),
      providesTags: (_result, _error, { productId }) => [
        { type: 'Reviews', id: productId },
      ],
    }),
      // ✅ Get Featured Reviews (Public)
    getFeaturedReviews: builder.query({
      query: (params = { limit: 6 }) => ({
        url: '/reviews/featured',
        method: 'GET',
        params,
      }),
      providesTags: ['Reviews'],
    }),

    // ✅ Admin: Toggle Featured
    toggleFeaturedReview: builder.mutation({
      query: (id) => ({
        url: `/reviews/admin/${id}/featured`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Reviews'],
    }),
  }),
});

export const {
  useCreateReviewMutation,
  useGetReviewByIdQuery,
  useGetProductReviewsQuery,
  useGetFeaturedReviewsQuery,
  useToggleFeaturedReviewMutation,
} = reviewApi;