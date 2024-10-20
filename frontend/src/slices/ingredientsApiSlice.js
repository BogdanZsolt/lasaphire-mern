import { apiSlice } from './apiSlice';
import { INGREDIENTS_URL, UPLOAD_URL } from '../constants';

export const ingredientsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getIngredients: builder.query({
      query: (params) => ({
        url: INGREDIENTS_URL,
        params,
      }),
      keepUnusedDataFor: 5,
    }),
    getIngredientDetails: builder.query({
      query: (ingredientId) => ({
        url: `${INGREDIENTS_URL}/${ingredientId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    getIngredientAlphabets: builder.query({
      query: () => ({
        url: `${INGREDIENTS_URL}/alphabets`,
      }),
      keepUnusedDataFor: 5,
    }),
    createIngredient: builder.mutation({
      query: () => ({
        url: INGREDIENTS_URL,
        method: 'POST',
      }),
      invalidatesTags: ['Ingredient'],
    }),
    updateIngredient: builder.mutation({
      query: (data) => ({
        url: `${INGREDIENTS_URL}/${data.ingredientId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Ingredient'],
    }),
    uploadIngredientImage: builder.mutation({
      query: (data) => ({
        url: UPLOAD_URL,
        method: 'POST',
        body: data,
      }),
    }),
    deleteIngredient: builder.mutation({
      query: (ingredientId) => ({
        url: `${INGREDIENTS_URL}/${ingredientId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetIngredientsQuery,
  useGetIngredientDetailsQuery,
  useGetIngredientAlphabetsQuery,
  useCreateIngredientMutation,
  useUpdateIngredientMutation,
  useUploadIngredientImageMutation,
  useDeleteIngredientMutation,
} = ingredientsApiSlice;
