// import { baseApi } from "./baseApi";

// export const orderApi = baseApi.injectEndpoints({
//     endpoints: (builder) => ({
//         getAdminOrders: builder.query({
//             query: (params) => ({
//                 url: '/orders/admin/all',
//                 method: 'GET',
//                 params,
//             }),
//             providesTags: ['Orders'],
//         }),
//         getOrderStats: builder.query({
//             query: () => ({
//                 url: '/orders/admin/stats',
//                 method: 'GET',
//             }),
//             providesTags: ['Orders'],
//         }),
//         getAdminOrderById: builder.query({
//             query: (id) => ({
//                 url: `/orders/admin/${id}`,
//                 method: 'GET',
//             }),
//             providesTags: ['Orders'],
//         }),
//         updateOrderStatus: builder.mutation({
//             query: ({ id, ...data }) => ({
//                 url: `/orders/admin/${id}/status`,
//                 method: 'PATCH',
//                 body: data,
//             }),
//             invalidatesTags: ['Orders'],
//         }),
//         updatePaymentStatus: builder.mutation({
//             query: ({ id, ...data }) => ({
//                 url: `/orders/admin/${id}/payment`,
//                 method: 'PATCH',
//                 body: data,
//             }),
//             invalidatesTags: ['Orders'],
//         }),
//         addAdminNote: builder.mutation({
//             query: ({ id, note }) => ({
//                 url: `/orders/admin/${id}/note`,
//                 method: 'PATCH',
//                 body: { note },
//             }),
//             invalidatesTags: ['Orders'],
//         }),
//         createOrder: builder.mutation({
//             query: (data) => ({
//                 url: '/orders',
//                 method: 'POST',
//                 body: data,
//             }),
//             invalidatesTags: ['Orders'],
//         }),
//         getMyOrders: builder.query({
//             query: (params) => ({
//                 url: '/orders/my',
//                 method: 'GET',
//                 params,
//             }),
//             providesTags: ['Orders'],
//         }),
//     }),
// });

// export const {
//     useGetAdminOrdersQuery,
//     useGetOrderStatsQuery,
//     useGetAdminOrderByIdQuery,
//     useUpdateOrderStatusMutation,
//     useUpdatePaymentStatusMutation,
//     useAddAdminNoteMutation,
//     useCreateOrderMutation,
//     useGetMyOrdersQuery,
// } = orderApi;


import { baseApi } from "./baseApi";

export const orderApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // ===== User endpoints =====
        createOrder: builder.mutation({
            query: (data) => ({
                url: '/order/place-order', // ✅ ঠিক করা হলো
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Orders'],
        }),
        getMyOrders: builder.query({
            query: (params) => ({
                url: '/order/my-orders', // ✅ ঠিক করা হলো
                method: 'GET',
                params,
            }),
            providesTags: ['Orders'],
        }),
        getMyOrderById: builder.query({
            query: (id) => ({
                url: `/order/my-orders/${id}`, // ✅ নতুন যোগ
                method: 'GET',
            }),
            providesTags: ['Orders'],
        }),
        cancelOrder: builder.mutation({
            query: (id) => ({
                url: `/order/cancel/${id}`, // ✅ নতুন যোগ
                method: 'PATCH',
            }),
            invalidatesTags: ['Orders'],
        }),

        // ===== Admin endpoints =====
        getAdminOrders: builder.query({
            query: (params) => ({
                url: '/order/admin/all', // ✅ ঠিক করা হলো
                method: 'GET',
                params,
            }),
            providesTags: ['Orders'],
        }),
        updateOrderStatus: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `/order/admin/status/${id}`, // ✅ ঠিক করা হলো (id/status → status/id)
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['Orders'],
        }),
        // ⚠️ getOrderStats, getAdminOrderById, updatePaymentStatus, addAdminNote
        // এগুলোর জন্য Backend এ কোনো route এখনো নেই - বাদ দিলাম, backend বানালে যোগ করবে

        // ===== Rider endpoints (নতুন যোগ করলাম, তোমার route file অনুযায়ী) =====
        getAvailableOrders: builder.query({
            query: () => ({
                url: '/order/available-orders',
                method: 'GET',
            }),
            providesTags: ['Orders'],
        }),
        getMyAssignedOrders: builder.query({
            query: () => ({
                url: '/order/rider/my-orders',
                method: 'GET',
            }),
            providesTags: ['Orders'],
        }),
        acceptOrder: builder.mutation({
            query: (id) => ({
                url: `/order/rider/${id}/accept`,
                method: 'PATCH',
            }),
            invalidatesTags: ['Orders'],
        }),
        rejectOrder: builder.mutation({
            query: (id) => ({
                url: `/order/rider/${id}/reject`,
                method: 'PATCH',
            }),
            invalidatesTags: ['Orders'],
        }),
        markOutForDelivery: builder.mutation({
            query: (id) => ({
                url: `/order/rider/${id}/out-for-delivery`,
                method: 'PATCH',
            }),
            invalidatesTags: ['Orders'],
        }),
        markDelivered: builder.mutation({
            query: (id) => ({
                url: `/order/rider/${id}/delivered`,
                method: 'PATCH',
            }),
            invalidatesTags: ['Orders'],
        }),
    }),
});

export const {
    useCreateOrderMutation,
    useGetMyOrdersQuery,
    useGetMyOrderByIdQuery,
    useCancelOrderMutation,
    useGetAdminOrdersQuery,
    useUpdateOrderStatusMutation,
    useGetAvailableOrdersQuery,
    useGetMyAssignedOrdersQuery,
    useAcceptOrderMutation,
    useRejectOrderMutation,
    useMarkOutForDeliveryMutation,
    useMarkDeliveredMutation,
} = orderApi;