import { useNavigate } from "react-router-dom";
import { useGetUserByIdQuery } from "../StoreApi";

export const AccountPage = ({ token, userId }) => {
  const navigate = useNavigate();
  const { data, error, isLoading } = useGetUserByIdQuery(userId, token);

  if (isLoading) {
    return <div>Loading..</div>;
  }
  if (error) {
    return <div>{error.message}</div>;
  }
  console.log(data);
  return (
    <div className="singleProductContainer">
      <h2>HELLO WORLD</h2>
    </div>
  );
};

export default AccountPage;
