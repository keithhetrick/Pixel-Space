import { apiSlice } from "../../app/api/apiSlice";

export const postsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // GET - get all posts
    getPosts: builder.query({
      query: () => "/api/post",
      keepUnusedDataFor: 5,
      providesTags: ["Posts"],
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
    }),
  }),
});

export const { useGetPostsQuery } = postsApiSlice;
