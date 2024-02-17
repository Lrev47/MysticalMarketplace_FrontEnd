import { useState } from "react";
import { useLoginUserMutation } from "../StoreApi/index.js";
import { useNavigate } from "react-router-dom";

export function LogInUser({ setToken }) {
  const navigate = useNavigate();
  const [loginUser] = useLoginUserMutation();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  async function submitLogIn(event) {
    event.preventDefault();
    console.log("Submit Pressed");
    try {
      const user = {
        username: userName,
        password: password,
      };
      console.log("login users data: ", user);
      const result = loginUser(user).unwrap();
      setToken(result.token);
      console.log("Login Response from API:", result);
      console.log("LOGIN MESSAGE:", result.message);
    } catch (error) {
      console.error("Error:", error);
    }
  }
  return (
    <>
      <div>
        <form onSubmit={submitLogIn}>
          <label>
            Email
            <input
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            ></input>
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </label>
          <label>
            <button type="submit">Submit</button>
          </label>
        </form>
      </div>
    </>
  );
}

export default LogInUser;
