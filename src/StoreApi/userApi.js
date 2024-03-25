import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "https://capstone-backend-87g4.onrender.com/api";

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
      query: (userId, moneyNum, token) => ({
        url: `/users/${userId}`,
        method: "PATCH",
        body: { moneyNum: moneyNum },
      }),
    }),

    updateUserMoney: builder.mutation({
      query: ({ userId, moneyNum, token }) => ({
        url: `/users/${userId}`,
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
        body: {
          moneyNum: moneyNum,
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
