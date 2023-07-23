import { Routes, Route } from "react-router-dom";
import "./App.css";
import LoginRoute from "./components/LoginRoute";
import HomeRoute from "./components/HomeRoute";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginRoute />} />
      <Route path="/" element={<HomeRoute />} />
    </Routes>
  );
};

export default App;
