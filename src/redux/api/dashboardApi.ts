// import { baseApi } from './baseApi';

// export const dashboardApi = baseApi.injectEndpoints({
//     endpoints: (builder) => ({
//         getDashboardSummary: builder.query({
//             query: () => '/analytics/dashboard',
//             providesTags: ['Analytics'],
//         }),
//         getRevenueStats: builder.query({
//             query: ({ startDate, endDate }) => ({
//                 url: `/analytics/revenue`,
//                 params: { startDate, endDate },
//             }),
//             providesTags: ['Analytics'],
//         }),
//         getMonthlyRevenue: builder.query({
//             query: () => '/analytics/monthly-revenue',
//             providesTags: ['Analytics'],
//         }),
//         getRecentOrders: builder.query({
//             query: (limit = 10) => `/analytics/recent-orders?limit=${limit}`,
//             providesTags: ['Orders'],
//         }),
//         getTopProducts: builder.query({
//             query: (limit = 10) => `/analytics/top-products?limit=${limit}`,
//             providesTags: ['Products'],
//         }),
//         getSalesByCategory: builder.query({
//             query: () => '/analytics/sales-by-category',
//             providesTags: ['Analytics', 'Products'],
//         }),
//         getOrderStats: builder.query({
//             query: () => '/orders/admin/stats',
//             providesTags: ['Orders'],
//         }),
//         getApiHealth: builder.query({
//             query: () => '/health',
//             providesTags: ['Stats'],
//         }),
//     }),
// });

// export const {
//     useGetDashboardSummaryQuery,
//     useGetRevenueStatsQuery,
//     useGetMonthlyRevenueQuery,
//     useGetRecentOrdersQuery,
//     useGetTopProductsQuery,
//     useGetSalesByCategoryQuery,
//     useGetOrderStatsQuery,
//     useGetApiHealthQuery,
// } = dashboardApi;


// riderDashboardApi.ts
import { baseApi } from './baseApi';

export const riderDashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get available orders
    getAvailableOrders: builder.query({
      query: (params = {}) => ({
        url: '/rider/dashboard/orders/available',
        params,
      }),
      providesTags: ['Orders'],
    }),

    // Get my orders
    getMyOrders: builder.query({
      query: (params = {}) => ({
        url: '/rider/dashboard/orders',
        params,
      }),
      providesTags: ['Orders'],
    }),

    // Get order details
    getOrderDetails: builder.query({
      query: (orderId) => `/rider/dashboard/orders/${orderId}`,
      providesTags: (result, error, id) => [{ type: 'Orders', id }],
    }),

    // Accept order
    acceptOrder: builder.mutation({
      query: (orderId) => ({
        url: `/rider/dashboard/orders/${orderId}/accept`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Orders', 'RiderProfile'],
    }),

    // Mark as picked up
    markOrderPickedUp: builder.mutation({
      query: (orderId) => ({
        url: `/rider/dashboard/orders/${orderId}/pickup`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Orders', 'RiderProfile'],
    }),

    // Mark as delivered
    markOrderDelivered: builder.mutation({
      query: (orderId) => ({
        url: `/rider/dashboard/orders/${orderId}/deliver`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Orders', 'RiderProfile', 'Payout'],
    }),

    // Cancel order
    cancelOrder: builder.mutation({
      query: ({ orderId, body }) => ({
        url: `/rider/dashboard/orders/${orderId}/cancel`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Orders', 'RiderProfile'],
    }),
  }),
});

export const {
  useGetAvailableOrdersQuery,
  useGetMyOrdersQuery,
  useGetOrderDetailsQuery,
  useAcceptOrderMutation,
  useMarkOrderPickedUpMutation,
  useMarkOrderDeliveredMutation,
  useCancelOrderMutation,
} = riderDashboardApi;