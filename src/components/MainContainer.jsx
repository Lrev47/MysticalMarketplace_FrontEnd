import { Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";

function MainContainer({ token, setToken }) {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default MainContainer;
