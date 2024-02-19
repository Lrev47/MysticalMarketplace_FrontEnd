import { useState } from "react";
import { useLoginUserMutation } from "../StoreApi/index.js";
import { useNavigate } from "react-router-dom";

export function LogInUser({ setToken, setUserName }) {
  const navigate = useNavigate();
  const [loginUser] = useLoginUserMutation();
  const [loginUserName, setLoginUserName] = useState("johnd");
  const [password, setPassword] = useState("m38rmF$");

  async function submitLogIn(event) {
    event.preventDefault();
    console.log("Submit Pressed");
    try {
      const user = {
        username: loginUserName,
        password: password,
      };

      console.log("Login Users Data: ", user);
      console.log("User Name:", user.username);
      setUserName(user.username);
      const result = await loginUser(user).unwrap();
      console.log("Login Response from API:", result);
      setToken(result.token);
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
                // placeholder="johnd"
                value="johnd"
                onChange={(e) => setLoginUserName(e.target.value)}
              ></input>
            </label>
            <label className="LoginFormLabel">
              Password:
              <input
                // placeholder="m38rmF$"
                type="password"
                value="m38rmF$"
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
