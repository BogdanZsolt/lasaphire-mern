import { apiSlice } from './apiSlice';
import { CONVERT_URL } from '../constants';

export const convertsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    convertCurrency: builder.mutation({
      query: (data) => ({
        url: CONVERT_URL,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useConvertCurrencyMutation } = convertsApiSlice;
