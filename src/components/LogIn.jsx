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
      const result = await loginUser(user).unwrap();
      console.log("Login Response from API:", result);
      setToken(result.token);

      console.log("LOGIN MESSAGE:", result.message);
    } catch (error) {
      console.error("Error:", error);
    }
  }
  return (
    <>
      <div className="Container">
        <form onSubmit={submitLogIn}>
          <div className="LogInFormWrapper">
            <label className="LoginFormLabel">
              User Name:
              <input
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              ></input>
            </label>
            <label className="LoginFormLabel">
              Password:
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </label>
          </div>
          <label className="LogInbutton">
            <button type="submit">Submit</button>
          </label>
        </form>
      </div>
    </>
  );
}

export default LogInUser;
