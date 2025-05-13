import { apiSlice } from './apiSlice';
const SHIPPINGS_URL = '/api/shippings';

export const shippingsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getShippings: builder.query({
      query: (params) => ({
        url: SHIPPINGS_URL,
        params,
      }),
      keepUnusedDataFor: 5,
    }),
    getShippingDetails: builder.query({
      query: (country) => ({
        url: `${SHIPPINGS_URL}/${country}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createShipping: builder.mutation({
      query: (data) => ({
        url: SHIPPINGS_URL,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Shipping'],
    }),
    updateShipping: builder.mutation({
      query: (data) => ({
        url: `${SHIPPINGS_URL}/${data.country}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Shipping'],
    }),
    deleteShipping: builder.mutation({
      query: (country) => ({
        url: `${SHIPPINGS_URL}/${country}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetShippingsQuery,
  useGetShippingDetailsQuery,
  useCreateShippingMutation,
  useUpdateShippingMutation,
  useDeleteShippingMutation,
} = shippingsApiSlice;
