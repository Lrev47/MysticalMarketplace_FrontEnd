import { useGetUserByIdQuery } from "../StoreApi";
import React from "react";
import { useParams } from "react-router-dom";

export const AccountPage = ({ token }) => {
  const { userId } = useParams();
  const { data, error, isLoading } = useGetUserByIdQuery(userId, { token });
  console.log(data);
  if (isLoading) {
    return <div>Loading..</div>;
  }
  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div className="singleProductContainer">
      <h2>test</h2>
    </div>
  );
};

export default AccountPage;
