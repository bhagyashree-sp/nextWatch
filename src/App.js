import { Routes, Route } from "react-router-dom";
import "./App.css";
import LoginRoute from "./components/LoginRoute";
import HomeRoute from "./components/HomeRoute";
import VideoItemDetailsRoute from "./components/VideoItemDetailsRoute";
import Trending from "./components/Trending";
import Gaming from "./components/Gaming";
import SavedVideos from "./components/SavedVideos";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginRoute />} />
      <Route path="/" element={<HomeRoute />} />
      <Route path="/videos/:id" element={<VideoItemDetailsRoute />} />
      <Route path="/trending" element={<Trending />} />
      <Route path="/gaming" element={<Gaming />} />
      <Route path="/saved-videos" element={<SavedVideos />} />
    </Routes>
  );
};

export default App;
