import { useState } from "react";
import MainContainer from "./components/MainContainer";
import TopNav from "./components/TopNav";
import React from "react";
import TopNavTwo from "./components/NavBar2";
import Footer from "./components/Footer";

function App() {
  const [token, setToken] = useState(null);

  const [userName, setUserName] = useState(null);
  return (
    <>
      <TopNav token={token} />
      <TopNavTwo token={token} />
      <MainContainer
        userName={userName}
        token={token}
        setUserName={setUserName}
        setToken={setToken}
      />
      <Footer />
    </>
  );
}

export default App;
