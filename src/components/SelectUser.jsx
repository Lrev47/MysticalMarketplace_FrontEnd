import { useGetAllUsersQuery } from "../StoreApi/index";
import React from "react";

export function DisplayUsers({ setUserName, setPassword }) {
  const { data, error, isLoading } = useGetAllUsersQuery();

  const handleClick = (user) => {
    setUserName(user.username);
    setPassword(user.password);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching users.</p>;

  return (
    <>
      <h2 className="DisplayUsers__selectUserheading">Select User</h2>
      <div className="DisplayUsers__selectUserContainer">
        {data.map((user) => (
          <div
            onClick={() => handleClick(user)}
            className="DisplayUsers__UserContainer"
            key={user.id}
          >
            <img
              className="DisplayUsers__selectUserImage"
              src={user.userImageUrl}
              alt={user.username}
            />
            <div className="DisplayUsers__UserImageOverlay">
              {user.username}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default DisplayUsers;
