import { useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";
import { HiFire } from "react-icons/hi2";
import SideBar from "../SideBar";
import Header from "../Header";
import "./index.css";
import TrendingItem from "../TrendingItem";
import context from "../../context/context";

const Trending = () => {
  const [trendingList, setTrendingList] = useState([]);
  const { dark } = useContext(context);

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
