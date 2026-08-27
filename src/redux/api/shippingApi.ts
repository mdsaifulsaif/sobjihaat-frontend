// import { baseApi } from "./baseApi";

// export const shippingApi = baseApi.injectEndpoints({
//     endpoints: (builder) => ({
//         // Zones
//         getZones: builder.query({
//             query: () => '/shipping/local',
//             providesTags: ['Shipping'],
//         }),

//     }),
// });

// export const {
//     useGetZonesQuery,
// } = shippingApi;

import { baseApi } from "./baseApi";

interface ShippingPreviewResponse {
  success: boolean;
  data: {
    shippingCharge: number;
    isFirstOrder: boolean;
  };
}

interface ShippingPreviewArgs {
  deliveryType: "local" | "nationwide";
  subtotal: number;
}

export const shippingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Zones
    getZones: builder.query({
      query: () => "/shipping/local",
      providesTags: ["Shipping"],
    }),

    // ✅ Shipping Charge Preview
    getShippingPreview: builder.query<
      ShippingPreviewResponse,
      ShippingPreviewArgs
    >({
      query: ({ deliveryType, subtotal }) =>
        `/shipping/preview?deliveryType=${deliveryType}&subtotal=${subtotal}`,
      providesTags: ["Shipping"],
    }),
  }),
});

export const { useGetZonesQuery, useGetShippingPreviewQuery } = shippingApi;
