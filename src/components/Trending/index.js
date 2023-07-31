import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { HiFire } from "react-icons/hi2";
import SideBar from "../SideBar";
import Header from "../Header";
import "./index.css";
import TrendingItem from "../TrendingItem";

const Trending = () => {
  const [trendingList, setTrendingList] = useState([]);

  const getTrendingList = async () => {
    const url = "https://apis.ccbp.in/videos/trending";
    const jwtToken = Cookies.get("jwt_token");
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: "GET",
    };
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data);

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
  };

  useEffect(() => {
    getTrendingList();
  }, []);

  return (
    <div className="outside-container">
      <Header />
      <div className="inner-container">
        <SideBar />
        <div className="trending-container">
          <div className="trending-header">
            <HiFire className="trending-icon" />
            <h1 className="trending-icon-heading">Trending</h1>
          </div>
          <div className="trending-list-container">
            {trendingList.map((videoItem) => (
              <TrendingItem key={videoItem.id} videoItem={videoItem} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trending;
