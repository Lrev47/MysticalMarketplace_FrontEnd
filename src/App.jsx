import { useState } from "react";
import MainContainer from "./components/MainContainer";
import TopNav from "./components/TopNav";
import React from "react";
import TopNavTwo from "./components/NavBar2";
import Footer from "./components/Footer";

function App() {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);
  const [orderId, setOrderId] = useState(null);
  return (
    <>
      <TopNav token={token} userId={userId} />
      <TopNavTwo token={token} />
      <MainContainer
        orderId={orderId}
        setOrderId={setOrderId}
        userName={userName}
        token={token}
        setUserName={setUserName}
        setToken={setToken}
        userId={userId}
        setUserId={setUserId}
      />
      <Footer />
    </>
  );
}

export default App;
