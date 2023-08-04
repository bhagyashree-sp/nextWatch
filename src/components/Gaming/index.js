import { useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";
import { SiYoutubegaming } from "react-icons/si";
import SideBar from "../SideBar";
import Header from "../Header";
import "./index.css";
import GamingCard from "../GamingCard";
import context from "../../context/context";

const Gaming = () => {
  const [gamingList, setGamingList] = useState([]);
  const { dark } = useContext(context);

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
