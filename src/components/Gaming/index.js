import { useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";
import { SiYoutubegaming } from "react-icons/si";
import SideBar from "../SideBar";
import Header from "../Header";
import "./index.css";
import GamingCard from "../GamingCard";
import context from "../../context/context";
import { ThreeDots } from "react-loader-spinner";
import FailureView from "../FailureView";

const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  isLoading: "LOADING",
};

const Gaming = () => {
  const [gamingList, setGamingList] = useState([]);
  const { dark } = useContext(context);
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);

  const getGamingList = async () => {
    setApiStatus(apiStatusConstants.isLoading);
    const url = "https://apis.ccbp.in/videos/gaming";
    const jwtToken = Cookies.get("jwt_token");
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: "GET",
    };
    const response = await fetch(url, options);
    if (response.ok) {
      const data = await response.json();
      //console.log(data);
      const updatedData = data.videos.map((eachGameItem) => ({
        id: eachGameItem.id,
        title: eachGameItem.title,
        thumbnailUrl: eachGameItem.thumbnail_url,
        viewCount: eachGameItem.view_count,
      }));
      setGamingList(updatedData);
      setApiStatus(apiStatusConstants.success);
    } else {
      setApiStatus(apiStatusConstants.failure);
    }
  };

  useEffect(() => {
    getGamingList();
  }, []);

  const handleRetry = () => {
    getGamingList();
  };

  const renderSucessView = () => {
    if (gamingList.length !== 0) {
      return gamingList.map((videoItem) => (
        <GamingCard key={videoItem.id} videoItem={videoItem} />
      ));
    } else {
      return (
        <div className="failure-view">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
            alt="no videos"
            className="failure-image"
          />
          <h1
            className={
              dark
                ? "failure-heading dark-failure-heading"
                : "failure-heading light-failure-heading"
            }
          >
            No Search results found
          </h1>
          <p className="failure-description">
            Try different key words or remove search filter
          </p>
          <p className="no-videos-retry">Retry</p>
        </div>
      );
    }
  };

  const renderFailureView = () => <FailureView handleRetry={handleRetry} />;

  const renderLoaderView = () => (
    <div className="loader">
      <ThreeDots color="#3b82f6" height="80" width="80" />
    </div>
  );

  const renderView = () => {
    switch (apiStatus) {
      case apiStatusConstants.isLoading:
        return renderLoaderView();
      case apiStatusConstants.success:
        return renderSucessView();
      case apiStatusConstants.failure:
        return renderFailureView();
    }
  };

  return (
    <div
      className={
        dark ? "outside-container outside-container-dark" : "outside-container"
      }
    >
      <Header />
      <div className="inner-container">
        <SideBar />
        <div className="gaming-container">
          <div
            className={
              dark ? "gaming-header gaming-header-dark" : "gaming-header"
            }
          >
            <SiYoutubegaming
              className={dark ? " gaming-icon gaming-icon-dark" : "gaming-icon"}
            />
            <h1
              className={
                dark
                  ? "gaming-icon-heading gaming-icon-heading-dark"
                  : "gaming-icon-heading"
              }
            >
              Gaming
            </h1>
          </div>
          <div
            className={
              dark
                ? "gaming-list-container gaming-list-container-dark"
                : "gaming-list-container"
            }
          >
            {renderView()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gaming;
