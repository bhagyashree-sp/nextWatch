import { useState, useEffect, useContext } from "react";
import { GrFormClose } from "react-icons/gr";
import { AiOutlineSearch } from "react-icons/ai";
import Header from "../Header";
import "./index.css";
import Cookies from "js-cookie";
import Video from "../Video";
import SideBar from "../SideBar";
import context from "../../context/context";
import { ThreeDots } from "react-loader-spinner";
import FailureView from "../FailureView";

const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  isLoading: "LOADING",
};

const HomeRoute = () => {
  const [searchList, setSearchList] = useState("");
  const [videosList, setVideosList] = useState([]);
  const [showModal, setShowModal] = useState(true);
  const { dark } = useContext(context);
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);

  const onChangeSearch = (event) => {
    setSearchList(event.target.value);
  };

  const getVideosList = async () => {
    setApiStatus(apiStatusConstants.isLoading);
    const jwtToken = Cookies.get("jwt_token");
    const url = `https://apis.ccbp.in/videos/all?search=${searchList}`;
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: "GET",
    };
    const response = await fetch(url, options);
    if (response.ok === true) {
      const data = await response.json();
      const updatedData = data.videos.map((eachItem) => ({
        id: eachItem.id,
        publishedAt: eachItem.published_at,
        thumbnailUrl: eachItem.thumbnail_url,
        title: eachItem.title,
        viewCount: eachItem.view_count,
        channelName: eachItem.channel.name,
        profileImageUrl: eachItem.channel.profile_image_url,
      }));
      setApiStatus(apiStatusConstants.success);
      setVideosList(updatedData);
    } else {
      setApiStatus(apiStatusConstants.failure);
    }
  };

  useEffect(() => {
    getVideosList();
  }, [searchList]);

  const onClickCloseIcon = () => {
    // console.log("clicked");
    setShowModal(false);
  };

  const handleRetry = () => {
    getVideosList();
  };

  const renderLoaderView = () => (
    <div className="loader">
      <ThreeDots color="#3b82f6" height="80" width="80" />
    </div>
  );

  const renderSucessView = () => {
    if (videosList.length !== 0) {
      return videosList.map((video) => <Video key={video.id} video={video} />);
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
        <div className="home-container">
          {showModal && (
            <div className="modal">
              <div>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                  alt="light-theme"
                />
                <p className="home-heading">
                  Buy Nxt Watch Premium prepaid plans with UPI
                </p>
                <h2 className="get-now-Heading">GET IT NOW</h2>
              </div>

              <button
                type="button"
                className="close-icon"
                onClick={onClickCloseIcon}
              >
                <GrFormClose className="close" />
              </button>
            </div>
          )}

          <div
            className={
              dark
                ? "search-container search-container-dark"
                : "search-container"
            }
          >
            <div className="search-bar">
              <input
                type="search"
                placeholder="Search"
                onChange={onChangeSearch}
                value={searchList}
                className="search-input"
              />
              <button type="button" className="search-button">
                <AiOutlineSearch />
              </button>
            </div>
            <div className="video-list">{renderView()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeRoute;
