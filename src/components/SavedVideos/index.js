import { useState } from "react";
import { MdPlaylistAdd } from "react-icons/md";
import Header from "../Header";
import SideBar from "../SideBar";
import TrendingItem from "../TrendingItem";
import "./index.css";

const SavedVideos = () => {
  const [savedVideosList, setSavedVideosList] = useState([]);
  return (
    <div className="outside-container">
      <Header />
      <div className="inner-container">
        <SideBar />
        <div className="trending-container">
          <div className="trending-header">
            <MdPlaylistAdd className="trending-icon" />
            <h1 className="trending-icon-heading">Saved Videos</h1>
          </div>
          <div>
            {savedVideosList.length !== 0 ? (
              savedVideosList.map((eachVideo) => (
                <TrendingItem eachVideo={eachVideo} key={eachVideo.id} />
              ))
            ) : (
              <div className="empty-saved-video-conatiner">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
                  alt="empty saved videos"
                  className="empty-saved-image"
                />
                <h1>No saved videos found</h1>
                <p className="empty-saved-videos-description">
                  You can save your videos while watching them
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavedVideos;
