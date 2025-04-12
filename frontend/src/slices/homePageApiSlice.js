import { apiSlice } from './apiSlice';
const HOMEPAGE_URL = '/api/homepage';

export const homePageApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getHomePage: builder.query({
      query: (params) => ({
        url: HOMEPAGE_URL,
        params,
      }),
      keepUnusedDataFor: 5,
    }),
    updateHomePage: builder.mutation({
      query: (data) => ({
        url: HOMEPAGE_URL,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['HomePage'],
    }),
  }),
});

export const { useGetHomePageQuery, useUpdateHomePageMutation } =
  homePageApiSlice;
