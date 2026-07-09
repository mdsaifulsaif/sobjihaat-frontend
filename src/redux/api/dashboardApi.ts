
import { baseApi } from "./baseApi";

export const riderDashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get Dashboard Overview
    getDashboardOverview: builder.query({
      query: (params = { range: "today" }) => ({
        url: "/rider-dashboard/overview",
        method: "GET",
        params,
      }),
      providesTags: ["Dashboard"],
    }),
    // Get available orders
    getAvailableOrders: builder.query({
      query: (params = {}) => ({
        url: "/rider/dashboard/orders/available",
        params,
      }),
      providesTags: ["Orders"],
    }),

    // Get my orders
    getMyOrders: builder.query({
      query: (params = {}) => ({
        url: "/rider/dashboard/orders",
        params,
      }),
      providesTags: ["Orders"],
    }),

    // Get order details
    getOrderDetails: builder.query({
      query: (orderId) => `/rider/dashboard/orders/${orderId}`,
      providesTags: (result, error, id) => [{ type: "Orders", id }],
    }),

    // Accept order
    acceptOrder: builder.mutation({
      query: (orderId) => ({
        url: `/rider/dashboard/orders/${orderId}/accept`,
        method: "PATCH",
      }),
      invalidatesTags: ["Orders", "RiderProfile"],
    }),

    // Mark as picked up
    markOrderPickedUp: builder.mutation({
      query: (orderId) => ({
        url: `/rider/dashboard/orders/${orderId}/pickup`,
        method: "PATCH",
      }),
      invalidatesTags: ["Orders", "RiderProfile"],
    }),

    // Mark as delivered
    markOrderDelivered: builder.mutation({
      query: (orderId) => ({
        url: `/rider/dashboard/orders/${orderId}/deliver`,
        method: "PATCH",
      }),
      invalidatesTags: ["Orders", "RiderProfile", "Payout"],
    }),

    // Cancel order
    cancelOrder: builder.mutation({
      query: ({ orderId, body }) => ({
        url: `/rider/dashboard/orders/${orderId}/cancel`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Orders", "RiderProfile"],
    }),
  }),
});

export const {
  useGetDashboardOverviewQuery,
  useGetAvailableOrdersQuery,
  useGetMyOrdersQuery,
  useGetOrderDetailsQuery,
  useAcceptOrderMutation,
  useMarkOrderPickedUpMutation,
  useMarkOrderDeliveredMutation,
  useCancelOrderMutation,
} = riderDashboardApi;
