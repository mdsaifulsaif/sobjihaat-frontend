import { baseApi } from "./baseApi";

export const shippingApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // Zones
        getZones: builder.query({
            query: () => '/shipping/local',
            providesTags: ['Shipping'],
        }),
        
    }),
});

export const {
    useGetZonesQuery,
} = shippingApi;
