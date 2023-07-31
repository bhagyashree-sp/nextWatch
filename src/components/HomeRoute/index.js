import { useState, useEffect } from "react";
import { GrFormClose } from "react-icons/gr";
import { AiOutlineSearch } from "react-icons/ai";
import Header from "../Header";
import "./index.css";
import Cookies from "js-cookie";
import Video from "../Video";
import SideBar from "../SideBar";

const HomeRoute = () => {
  const [searchList, setSearchList] = useState("");
  const [videosList, setVideosList] = useState([]);

  const onChangeSearch = (event) => {
    setSearchList(event.target.value);
  };

  const getVideosList = async () => {
    const jwtToken = Cookies.get("jwt_token");
    const url = `https://apis.ccbp.in/videos/all?search=${searchList}`;
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: "GET",
    };
    const response = await fetch(url, options);
    const data = await response.json();
    // console.log(data);

    const updatedData = data.videos.map((eachItem) => ({
      id: eachItem.id,
      publishedAt: eachItem.published_at,
      thumbnailUrl: eachItem.thumbnail_url,
      title: eachItem.title,
      viewCount: eachItem.view_count,
      channelName: eachItem.channel.name,
      profileImageUrl: eachItem.channel.profile_image_url,
    }));

    setVideosList(updatedData);
  };

  useEffect(() => {
    getVideosList();
  }, [searchList]);

  return (
    <div className="outside-container">
      <Header />
      <div className="inner-container">
        <SideBar />
        <div className="home-container">
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

            <button type="button" className="close-icon">
              <GrFormClose className="close" />
            </button>
          </div>

          <div className="search-container">
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
            <div className="video-list">
              {videosList.map((video) => (
                <Video key={video.id} video={video} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeRoute;
