import { apiSlice } from './apiSlice';
import { COUNTRIES_URL } from '../constants';

export const countriesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCountries: builder.query({
      query: (params) => ({
        url: COUNTRIES_URL,
        params,
      }),
      keepUnusedDataFor: 5,
    }),
    getCountryDetails: builder.query({
      query: (country) => ({
        url: `${COUNTRIES_URL}/${country}`,
      }),
      keepUnusedDataFor: 5,
    }),
    getCityListOfCountry: builder.query({
      query: (country) => ({
        url: `${COUNTRIES_URL}/${country}/cities`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useGetCountriesQuery,
  useGetCountryDetailsQuery,
  useGetCityListOfCountryQuery,
} = countriesApiSlice;
