

// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { getSession } from 'next-auth/react';

// const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

// export const baseApi = createApi({
//     reducerPath: 'api',
//     baseQuery: fetchBaseQuery({
//         baseUrl: API_URL,
//         credentials: 'include', // Cookie পাঠানোর জন্য জরুরি
//         prepareHeaders: async (headers) => {
//             try {
//                 const session = await getSession();

//                 if (session?.accessToken) {
//                     headers.set('authorization', `Bearer ${session.accessToken}`);
//                 }
//             } catch (error) {
//                 console.error("Session fetch error in RTK Query:", error);
//             }

//             if (!headers.has('Content-Type')) {
//                 headers.set('Content-Type', 'application/json');
//             }

//             return headers;
//         },
//     }),
//     tagTypes: [
//         'Stats', 'Orders', 'Products', 'Users', 'Analytics', 'PageContent',
//         'SiteContent', 'Categories', 'Payments', 'Shipping', 'Coupons',
//         'Reviews', 'Brands', 'Complaints', 'Area', 'Rider',
//         'RiderApplication', 'User', 'StoreSetting', 'Riders', 'RiderProfile'
//     ],
//     endpoints: () => ({}),
// });


import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getSession } from 'next-auth/react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export const baseApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL,
        credentials: 'include',
        prepareHeaders: async (headers) => {
            try {
                const session = await getSession();

                if (session?.accessToken) {
                    headers.set('authorization', `Bearer ${session.accessToken}`);
                }
            } catch (error) {
                console.error("Session fetch error in RTK Query:", error);
            }

            // ❌ Content-Type জোর করে বসানো বাদ দেওয়া হলো
            // fetchBaseQuery নিজে থেকেই JSON body হলে application/json বসায়,
            // আর FormData হলে browser নিজে multipart boundary বসায়।
            // ম্যানুয়ালি সেট করলে avatar upload ভেঙে যায়।

            return headers;
        },
    }),
    tagTypes: [
        'Stats', 'Orders', 'Products', 'Users', 'Analytics', 'PageContent',
        'SiteContent', 'Categories', 'Payments', 'Shipping', 'Coupons',
        'Reviews', 'Brands', 'Complaints', 'Area', 'Rider',
        'RiderApplication', 'User', 'StoreSetting', 'Riders', 'RiderProfile','Brand'
    ],
    endpoints: () => ({}),
});









// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { getSession } from 'next-auth/react';

// const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

// export const baseApi = createApi({
//     reducerPath: 'api',
//     baseQuery: fetchBaseQuery({
//         baseUrl: API_URL,
//         credentials: 'include',
//         prepareHeaders: async (headers) => {
//             // NextAuth session theke token neya
//             const session = await getSession();
//             const token = session?.accessToken;

//             if (token) {
//                 headers.set('authorization', `Bearer ${token}`);
//             }

//             if (!headers.has('Content-Type')) {
//                 headers.set('Content-Type', 'application/json');
//             }

//             return headers;
//         },
//     }),
//     tagTypes: [
//         'Stats', 
//         'Orders', 
//         'Products', 
//         'Users', 
//         'Analytics', 
//         'PageContent', 
//         'SiteContent', 
//         'Categories', 
//         'Payments', 
//         'Shipping', 
//         'Coupons', 
//         'Reviews', 
//         'Brands', 
//         'Complaints',
//         'Area',
//         'Rider', 
//         'RiderApplication',
//         'User',
//         'StoreSetting',
//         'Riders',
//         'RiderProfile'
//     ],
//     endpoints: () => ({}),
// });