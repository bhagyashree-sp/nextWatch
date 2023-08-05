import { useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";
import { HiFire } from "react-icons/hi2";
import SideBar from "../SideBar";
import Header from "../Header";
import "./index.css";
import TrendingItem from "../TrendingItem";
import context from "../../context/context";
import { ThreeDots } from "react-loader-spinner";
import FailureView from "../FailureView";

const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  isLoading: "LOADING",
};

const Trending = () => {
  const [trendingList, setTrendingList] = useState([]);
  const { dark } = useContext(context);
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);

  const getTrendingList = async () => {
    setApiStatus(apiStatusConstants.isLoading);
    const url = "https://apis.ccbp.in/videos/trending";
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
      // console.log(data);

      const updatedData = data.videos.map((eachVideoItem) => ({
        id: eachVideoItem.id,
        publishedAt: eachVideoItem.published_at,
        thumbnailUrl: eachVideoItem.thumbnail_url,
        title: eachVideoItem.title,
        viewCount: eachVideoItem.view_count,
        channelName: eachVideoItem.channel.name,
        profileImageUrl: eachVideoItem.channel.profile_image_url,
      }));
      setTrendingList(updatedData);
      setApiStatus(apiStatusConstants.success);
    } else {
      setApiStatus(apiStatusConstants.failure);
    }
  };

  useEffect(() => {
    getTrendingList();
  }, []);

  const handleRetry = () => {
    getTrendingList();
  };

  const renderLoaderView = () => (
    <div className="loader">
      <ThreeDots color="#3b82f6" height="80" width="80" />
    </div>
  );

  const renderSucessView = () => {
    if (trendingList.length !== 0) {
      return trendingList.map((videoItem) => (
        <TrendingItem key={videoItem.id} videoItem={videoItem} />
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

  const renderView = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderSucessView();
      case apiStatusConstants.failure:
        return renderFailureView();
      case apiStatusConstants.isLoading:
        return renderLoaderView();
      default:
        return null;
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
        <div className="trending-container">
          <div
            className={
              dark ? "trending-header trending-header-dark" : "trending-header"
            }
          >
            <HiFire
              className={
                dark ? "trending-icon trending-icon-dark" : "trending-icon"
              }
            />
            <h1
              className={
                dark
                  ? "trending-icon-heading trending-icon-heading-dark"
                  : "trending-icon-heading"
              }
            >
              Trending
            </h1>
          </div>
          <div
            className={
              dark
                ? "trending-list-container trending-list-container-dark"
                : "trending-list-container"
            }
          >
            {renderView()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trending;
