import { apiSlice } from './apiSlice';
import { HEROS_URL, UPLOAD_URL } from '../constants';

export const herosApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getHeros: builder.query({
      query: (params) => ({
        url: HEROS_URL,
        params,
      }),
      keepUnusedDataFor: 5,
    }),
    getHeroDetails: builder.query({
      query: (heroId) => ({
        url: `${HEROS_URL}/${heroId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createHero: builder.mutation({
      query: () => ({
        url: HEROS_URL,
        method: 'POST',
      }),
      invalidatesTags: ['Hero'],
    }),
    updateHero: builder.mutation({
      query: (data) => ({
        url: `${HEROS_URL}/${data.heroId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Hero'],
    }),
    uploadHeroImage: builder.mutation({
      query: (data) => ({
        url: UPLOAD_URL,
        method: 'POST',
        body: data,
      }),
    }),
    deleteHero: builder.mutation({
      query: (heroId) => ({
        url: `${HEROS_URL}/${heroId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetHerosQuery,
  useGetHeroDetailsQuery,
  useCreateHeroMutation,
  useUpdateHeroMutation,
  useUploadHeroImageMutation,
  useDeleteHeroMutation,
} = herosApiSlice;
