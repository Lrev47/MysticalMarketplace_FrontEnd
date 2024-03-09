import { useState } from "react";
import { useLoginUserMutation } from "../StoreApi/index.js";
import { useNavigate } from "react-router-dom";
import DisplayUsers from "./SelectUser.jsx";

export function LogInUser({ setToken }) {
  const navigate = useNavigate();

  const [loginUser] = useLoginUserMutation();
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");

  async function submitLogIn(event) {
    event.preventDefault();
    console.log("Submit Pressed");
    try {
      const user = {
        username: userName,
        password: password,
      };

      const result = await loginUser(user).unwrap();
      console.log("Login Response from API:", result);
      setToken(result.token);
    } catch (error) {
      console.error("Error:", error);
    }
  }
  return (
    <>
      <div className="LogInContainer">
        <form onSubmit={submitLogIn}>
          <div className="LogInFormWrapper">
            <label className="LoginFormLabel">
              User Name:
              <input
                className="LoginInput"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              ></input>
            </label>
            <label className="LoginFormLabel">
              Password:
              <input
                className="LoginInput"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </label>
            <label>
              <button className="LogInSubmitbutton" type="submit">
                Submit
              </button>
            </label>
          </div>
        </form>
      </div>

      <div className="SelectUserContainer">
        <DisplayUsers setPassword={setPassword} setUserName={setUserName} />
      </div>
    </>
  );
}

export default LogInUser;
