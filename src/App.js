import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import LoginRoute from "./components/LoginRoute";
import HomeRoute from "./components/HomeRoute";
import VideoItemDetailsRoute from "./components/VideoItemDetailsRoute";
import Trending from "./components/Trending";
import Gaming from "./components/Gaming";
import SavedVideos from "./components/SavedVideos";
import Context from "./context/context";

const App = () => {
  const [savedVideosList, setSavedVideosList] = useState([]);
  const [dark, setDark] = useState(false);

  const addVideoToSavedVideoList = (video) => {
    setSavedVideosList((prevList) => [...prevList, video]);
  };

  const removeSavedVideoList = (video) => {
    setSavedVideosList((prevList) =>
      prevList.filter((eachVideoItem) => eachVideoItem.id !== video.id)
    );
  };

  const toggleDark = () => {
    setDark((prevState) => !prevState);
  };

  return (
    <Context.Provider
      value={{
        savedVideosList,
        addVideoToSavedVideoList,
        removeSavedVideoList,
        dark,
        toggleDark,
      }}
    >
      <Routes>
        <Route path="/login" element={<LoginRoute />} />
        <Route path="/" element={<HomeRoute />} />
        <Route path="/videos/:id" element={<VideoItemDetailsRoute />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/gaming" element={<Gaming />} />
        <Route path="/saved-videos" element={<SavedVideos />} />
      </Routes>
    </Context.Provider>
  );
};

export default App;
