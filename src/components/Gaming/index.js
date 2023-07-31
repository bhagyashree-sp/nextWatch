import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { SiYoutubegaming } from "react-icons/si";
import SideBar from "../SideBar";
import Header from "../Header";
import "./index.css";
import GamingCard from "../GamingCard";

const Gaming = () => {
  const [gamingList, setGamingList] = useState([]);

  const getGamingList = async () => {
    const url = "https://apis.ccbp.in/videos/gaming";
    const jwtToken = Cookies.get("jwt_token");
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: "GET",
    };
    const response = await fetch(url, options);
    const data = await response.json();
    //console.log(data);

    const updatedData = data.videos.map((eachGameItem) => ({
      id: eachGameItem.id,
      title: eachGameItem.title,
      thumbnailUrl: eachGameItem.thumbnail_url,
      viewCount: eachGameItem.view_count,
    }));
    setGamingList(updatedData);
  };

  useEffect(() => {
    getGamingList();
  }, []);

  return (
    <div className="outside-container">
      <Header />
      <div className="inner-container">
        <SideBar />
        <div className="gaming-container">
          <div className="gaming-header">
            <SiYoutubegaming className="gaming-icon" />
            <h1 className="gaming-icon-heading">Gaming</h1>
          </div>
          <div className="gaming-list-container">
            {gamingList.map((videoItem) => (
              <GamingCard key={videoItem.id} videoItem={videoItem} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gaming;
