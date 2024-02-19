import { useState } from "react";
import MainContainer from "./components/MainContainer";
import TopNav from "./components/TopNav";
import React from "react";

function App() {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);
  return (
    <>
      <TopNav token={token} userId={userId} />
      <MainContainer
        userName={userName}
        userId={userId}
        token={token}
        setUserName={setUserName}
        setUserId={setUserId}
        setToken={setToken}
      />
    </>
  );
}

export default App;
