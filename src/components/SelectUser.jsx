import { useGetAllUsersQuery } from "../StoreApi/index";

export function DisplayUsers() {
  const { data, error, isLoading } = useGetAllUsersQuery();
  console.log(data);
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>error fetching users.</p>;

  return (
    <div className="selectUserContainer">
      {data &&
        data.map((user) => (
          <div
            onClick={() => handleClick(user.id)}
            className="UserContainer"
            key={user.id}
          >
            <p>{user.username}</p>
            <img
              className="selectUserImage"
              src={user.userImageUrl}
              alt={user.username}
            />
            <div className="UserImageOverlay">{user.name}</div>
          </div>
        ))}
    </div>
  );
}

export default DisplayUsers;
