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
  if (error) return <p>error fetching users.</p>;
  console.log(data);

  return (
    <>
      <h2 className="selectUserheading"> Select User</h2>
      <div className="selectUserContainer">
        {data.map((user) => (
          <div
            onClick={() => handleClick(user)}
            className="UserContainer"
            key={user.id}
          >
            <img
              className="selectUserImage"
              src={user.userImageUrl}
              alt={user.username}
            />
            <div className="UserImageOverlay">{user.username}</div>
          </div>
        ))}
      </div>
    </>
  );
}
export default DisplayUsers;
