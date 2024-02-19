import { useNavigate } from "react-router-dom";
import { useGetUserByIdQuery, useGetAllUsersQuery } from "../StoreApi";
import { useEffect, useState } from "react";

export const AccountPage = ({ userId, setUserId, userName }) => {
  const navigate = useNavigate();
  // const [ready, setReady] = useState(false);
  const {
    data: allUsersData,
    error: allUsersError,
    isLoading: allUsersLoading,
  } = useGetAllUsersQuery();
  const [localUserId, setLocalUserId] = useState(userId);
  const {
    data: userData,
    error: userError,
    isLoading: isUserLoading,
  } = useGetUserByIdQuery(localUserId, {
    skip: !localUserId,
  });

  useEffect(() => {
    console.log("Checking for UserName in allUserDaata", userName);
    if (allUsersData && userName) {
      const currentUser = allUsersData.find(
        (user) => user.username === userName
      );

      console.log("Found currentUser:", currentUser);
      if (currentUser && currentUser.id !== userId) {
        console.log("The Current User Id is:", currentUser.id);
        setUserId(currentUser.id);
        setLocalUserId(currentUser.id);
      }
    }
  }, [allUsersData, userName, setUserId]);

  useEffect(() => {
    if (ready && userId) {
      navigate(`/Account/${userId}`);
    }
  }, [ready, userId, navigate]);

  if (allUsersLoading || isUserLoading) {
    return <div>Loading..</div>;
  }
  if (allUsersError || userError) {
    return <div>{allUsersError.message || userError.message}</div>;
  }

  console.log("TEST2", allUsersData);
  console.log("DATA TYPE:", typeof allUsersData);
  console.log("GetSingleFunction User ID:", userId);
  console.log("Current User's Data:", userData);

  return <div>Almost there</div>;
};

export default AccountPage;
