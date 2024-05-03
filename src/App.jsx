import { useState } from "react";
import MainContainer from "./components/MainContainer";
import TopNav from "./components/TopNav";
import React from "react";
// import TopNavTwo from "./components/NavBar2";
import Footer from "./components/Footer";

function App() {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [orders, setOrders] = useState([]);
  return (
    <>
      <TopNav token={token} userId={userId} />
      {/* <TopNavTwo token={token} userId={userId} /> */}
      <MainContainer
        orderId={orderId}
        setOrderId={setOrderId}
        orders={orders}
        setOrders={setOrders}
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
