import { apiSlice } from "../../app/api/apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // CREATE - create user
    createUser: builder.mutation({
      query: (user) => ({
        url: "/api/users",
        method: "POST",
        body: { ...user },
      }),
    }),

    // READ - get all users
    getUsers: builder.query({
      query: () => "/api/users",
      keepUnusedDataFor: 5,
    }),

    // READ - get single user
    getSingleUser: builder.query({
      query: (id) => `/api/users/${id}`,
      keepUnusedDataFor: 5,
    }),

    // UPDATE - update user
    updateUser: builder.mutation({
      query: (user) => ({
        url: `/api/users/${user._id}`,
        method: "PATCH",
        body: { ...user },
      }),
    }),

    // DELETE - delete user
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/api/users/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useCreateUserMutation,
  useGetSingleUserQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersApiSlice;
