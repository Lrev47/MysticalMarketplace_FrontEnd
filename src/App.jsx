import { useState } from "react";
import MainContainer from "./components/MainContainer";
import TopNav from "./components/TopNav";
import React from "react";

function App() {
  const [token, setToken] = useState(null);

  return (
    <>
      <TopNav />
      <MainContainer token={token} setToken={setToken} />
    </>
  );
}

export default App;
