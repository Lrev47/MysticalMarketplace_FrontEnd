import { useState } from "react";
import MainContainer from "./components/MainContainer";
import TopNav from "./components/TopNav";
import React from "react";

function App() {
  const [token, setToken] = useState(null);

  const [userName, setUserName] = useState(null);
  return (
    <>
      <TopNav token={token} />
      <MainContainer
        userName={userName}
        token={token}
        setUserName={setUserName}
        setToken={setToken}
      />
    </>
  );
}

export default App;
