import { useNavigate } from "react-router-dom";
import { useGetAllUsersQuery } from "../StoreApi";
import { useEffect, useState } from "react";

export const AccountPage = ({ userName }) => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const {
    data: allUsersData,
    error: allUsersError,
    isLoading: allUsersLoading,
  } = useGetAllUsersQuery();

  useEffect(() => {
    if (allUsersData && userName) {
      const foundCurrentUser = allUsersData.find(
        (user) => user.username === userName
      );

      console.log("Found currentUser:", foundCurrentUser);
      console.log(foundCurrentUser.address?.city);
      setCurrentUser(foundCurrentUser);
    }
  }, [allUsersData, userName]);

  if (allUsersLoading) {
    return <div>Loading..</div>;
  }
  if (allUsersError) {
    return <div>{allUsersError.message}</div>;
  }

  return (
    <div className="singleProductContainer">
      {currentUser ? (
        <>
          <p>City: {currentUser.address?.city}</p>
          <p>Number: {currentUser.address?.number}</p>
          <p>Street: {currentUser.address?.street}</p>
          <p>Zipcode: {currentUser.address?.zipcode}</p>
          <p>Email: {currentUser.email}</p>
          <p>First Name: {currentUser.name?.firstname}</p>
          <p>Last Name: {currentUser.name?.lastname}</p>
          <p>Password: {currentUser.password}</p>
          <p>Phone: {currentUser.phone}</p>
          <p>Username: {currentUser.username}</p>
        </>
      ) : (
        <p>User not found.</p>
      )}
    </div>
  );
};

export default AccountPage;
