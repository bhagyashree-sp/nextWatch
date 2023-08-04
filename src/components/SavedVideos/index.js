import { useState } from "react";
import { MdPlaylistAdd } from "react-icons/md";
import Header from "../Header";
import SideBar from "../SideBar";
import TrendingItem from "../TrendingItem";
import "./index.css";
import Context from "../../context/context";
import { useContext } from "react";

const SavedVideos = () => {
  const { savedVideosList, dark } = useContext(Context);
  return (
    <div
      className={
        dark ? "outside-container outside-container-dark" : "outside-container"
      }
    >
      <Header />
      <div className="inner-container">
        <SideBar />
        <div className="trending-container">
          <div
            className={
              dark ? "trending-header trending-header-dark" : "trending-header"
            }
          >
            <MdPlaylistAdd className="trending-icon" />
            <h1
              className={
                dark
                  ? "trending-icon-heading trending-icon-heading-dark"
                  : "trending-icon-heading"
              }
            >
              Saved Videos
            </h1>
          </div>
          <div
            className={
              dark
                ? "trending-list-container trending-list-container-dark"
                : "trending-list-container"
            }
          >
            {savedVideosList.length !== 0 ? (
              savedVideosList.map((videoItem) => (
                <TrendingItem videoItem={videoItem} key={videoItem.id} />
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
