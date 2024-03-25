import { useGetUserByIdQuery } from "../StoreApi";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AddMoneyToAccount from "./AddMoneytoAccount";

export const AccountPage = ({ token }) => {
  const { userId } = useParams();
  const [refresh, setRefresh] = useState(false);

  const navigate = useNavigate();
  const { data, error, isLoading, refetch } = useGetUserByIdQuery({
    userId,
    token,
  });

  useEffect(() => {
    if (refresh) {
      refetch();
      setRefresh(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [refresh, refetch]);

  const handleClick = () => {
    navigate(`/orderHistory`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isLoading) {
    return <div>Loading..</div>;
  }
  if (error) {
    return <div>{error.message}</div>;
  }
  const triggerRefresh = () => setRefresh(true);
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
          <p>Current Balance: ${data.moneyNum.toFixed(2)}</p>
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
        <button
          onClick={() => handleClick()}
          className="ViewOrderHistoryButton"
        >
          <p>View Order History</p>
        </button>
      </div>
      <div className="AddMunnyToAccountContainer">
        <AddMoneyToAccount
          onMoneyAdded={triggerRefresh}
          userId={userId}
          token={token}
        />
      </div>
    </>
  );
};

export default AccountPage;
