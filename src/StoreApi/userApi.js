import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "https://fakestoreapi.com";

export const UserApi = createApi({
  reducerPath: "UserApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (user) => ({
        url: "/auth/login",
        method: "POST",
        body: user,
      }),
    }),
  }),
});

export const { useLoginUserMutation } = UserApi;
