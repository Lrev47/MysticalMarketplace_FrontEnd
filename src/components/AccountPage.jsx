import { useGetUserByIdQuery } from "../StoreApi";
import React from "react";
import { useParams } from "react-router-dom";

export const AccountPage = ({ token }) => {
  const { userId } = useParams();
  console.log("THE USER ID IS", userId);
  console.log("TOKEN IS", token);

  const { data, error, isLoading } = useGetUserByIdQuery({ userId, token });
  console.log({ data, error, isLoading });
  console.log(data);
  if (isLoading) {
    return <div>Loading..</div>;
  }
  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <>
      <div className="UserInfoContainer">
        <img className="AccountImage" src={data.userImageUrl} />
        <div className="UserInfo">
          <h2 className="UserInfoHeader">
            Welcome {data.firstName} {data.lastName}!
          </h2>
          <p></p>
          <p>Email: {data.email}</p>
          <p>Current Munny: ${data.moneyNum.toFixed(2)}</p>
          <p>Favrotie Item: {data.favoriteProduct}</p>
        </div>
      </div>

      <div className="UsernameAndPasswordContainer">
        <p>Username: {data.username}</p>
        Hover over to see password below.
        <p className="userpassword">{data.password}</p>
      </div>
      <div className="AddressContainer">
        <p>Address: {data.address}</p>
        <p>City: {data.city}</p>
        <p> State: {data.state}</p>
        <p>Zipcode: {data.zipcode}</p>
      </div>
      <div className="ViewOrderHistoryContainer">
        <p>View Order History button</p>
      </div>
      <div className="AddMunnyToAccountContainer">Add Munny to Account</div>
    </>
  );
};

export default AccountPage;
