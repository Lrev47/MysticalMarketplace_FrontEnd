import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "http://localhost:8080/api";

export const UserApi = createApi({
  reducerPath: "UserApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (user) => ({
        url: "/login",
        method: "POST",
        body: user,
      }),
    }),
    registerUser: builder.mutation({
      query: (user) => ({
        url: "/users",
        method: "POST",
        body: user,
      }),
    }),

    updateMoneyByUserId: builder.mutation({
      query: ({ userId, moneyNum }) => ({
        url: `/users/AddMoney`,
        method: "PATCH",
        body: { userId, moneyNum },
      }),
    }),

    updateUserMoney: builder.mutation({
      query: ({ userId, totalBalance }) => ({
        url: `/users/deductMoney`,
        method: "PATCH",

        body: {
          userId,
          totalBalance,
        },
      }),
    }),

    getAllUsers: builder.query({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
    }),
    getUserById: builder.query({
      query: ({ userId, token }) => ({
        url: `/users/${userId}`,
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }),
    }),
  }),
});

export const {
  useLoginUserMutation,
  // useRegisterUserMutation,
  useGetUserByIdQuery,
  useGetAllUsersQuery,
  useUpdateMoneyByUserIdMutation,
  useUpdateUserMoneyMutation,
} = UserApi;
