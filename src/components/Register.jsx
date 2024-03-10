import { useRegisterUserMutation } from "../StoreApi/userApi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function RegisterForm({ setToken }) {
  const navigate = useNavigate();
  const [registerUser] = useRegisterUserMutation();

  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [roomNum, setRoomNum] = useState(0);
  const [zipcode, setZipcode] = useState("");
  const [phoneNum, setPhoneNum] = useState(0);

  async function submitRegister(event) {
    event.preventDefault();
    console.log("form Submit pressed!");
    try {
      const name = {
        firstname: firstName,
        lastname: lastName,
      };
      const user = {
        email: email,
        username: userName,
        password: password,
        name: name,
      };
      const address = {
        city: city,
        street: street,
        number: roomNum,
        zipcode: zipcode,
      };
      const phone = { phone: phoneNum };

      const result = await registerUser(user, address, phone).unwrap();
      setToken(result.token);
      console.log(user);
      console.log(address);
      console.log("API response:", result);
    } catch (error) {
      console.error("Error:", error);
    }
  }
  return (
    <>
      <div className="Container">
        <form className="RegisterForm" onSubmit={submitRegister}>
          <div className="FormWrapper">
            <div className="UserInfo">
              <label>
                First Name{" "}
                <input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </label>
              <label>
                Last Name{" "}
                <input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </label>
              <label>
                User Name
                <input
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </label>
              <label>
                Email
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              <label>
                Password
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
            </div>
            <div className="UserInfo">
              <label>
                Street
                <input
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                />
              </label>
              <label>
                Room Number
                <input
                  value={roomNum}
                  onChange={(e) => setRoomNum(Number(e.target.value))}
                />
              </label>
              <label>
                City
                <input value={city} onChange={(e) => setCity(e.target.value)} />
              </label>
              <label>
                Zip
                <input
                  value={zipcode}
                  onChange={(e) => setZipcode(e.target.value)}
                />
              </label>
              <label>
                Phone Number
                <input
                  value={phoneNum}
                  onChange={(e) => setPhoneNum(e.target.value)}
                />
              </label>
            </div>
          </div>
          <label className="registerbutton">
            <button type="submit">submit</button>
          </label>
        </form>
      </div>
    </>
  );
}
