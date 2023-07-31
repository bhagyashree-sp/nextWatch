import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import ReactPlayer from "react-player";
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import { MdPlaylistAdd } from "react-icons/md";
import Header from "../Header";
import SideBar from "../SideBar";
import "./index.css";

const VideoItemDetailsRoute = () => {
  const [videoDetails, setVideoDetails] = useState({});
  const [isLiked, setIsLiked] = useState(false);
  const [isDisLiked, setIsDisLiked] = useState(false);

  const jwtToken = Cookies.get("jwt_token");
  const { id } = useParams();
  const getDetails = async () => {
    const url = `https://apis.ccbp.in/videos/${id}`;
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };
    const response = await fetch(url, options);
    const data = await response.json();
    const data1 = data.video_details;
    const updatedData = {
      id: data1.id,
      title: data1.title,
      videoUrl: data1.video_url,
      thumnbnailURl: data1.thumbnail_url,
      name: data1.channel.name,
      profileImageUrl: data1.channel.profile_image_url,
      subscriberCount: data1.channel.subscriber_count,
      viewCount: data1.view_count,
      publishedAt: data1.published_at,
      description: data1.description,
    };

    console.log(updatedData);
    setVideoDetails(updatedData);
  };

  useEffect(() => {
    getDetails();
  }, [id]);

  const {
    title,
    videoUrl,
    name,
    profileImageUrl,
    subscriberCount,
    viewCount,
    publishedAt,
    description,
  } = videoDetails;

  const currentYear = new Date().getFullYear();
  const publishedYear = new Date(publishedAt).getFullYear();

  const yearsAgo = currentYear - publishedYear;

  const onClickLike = () => {
    setIsLiked((prevIsLiked) => !prevIsLiked);
    setIsDisLiked(false);
  };

  const onClickDisLike = () => {
    setIsDisLiked((prevIsDisLiked) => !prevIsDisLiked);
    setIsLiked(false);
  };

  return (
    <div className="outside-container">
      <Header />
      <div className="inner-container">
        <SideBar />
        <div className="video-item-content-container">
          <div className="player-container">
            <ReactPlayer url={videoUrl} width="100%" />
          </div>
          <h1 className="video-detail-heading">{title}</h1>
          <div className="video-detail-views-likes-container">
            <ul className="views-container">
              <li className="video-views">{viewCount} views</li>
              <li className="video-posted">{yearsAgo} years ago</li>
            </ul>

            <div className="video-detail-likes-container">
              <button
                className={
                  isLiked
                    ? "like-action-container active-like"
                    : "like-action-container"
                }
                onClick={onClickLike}
              >
                <AiOutlineLike className="like-action-icon" />
                <p className="like-action-text">Like</p>
              </button>
              <button
                className={
                  isDisLiked
                    ? "like-action-container active-dislike"
                    : "like-action-container"
                }
                onClick={onClickDisLike}
              >
                <AiOutlineDislike className="like-action-icon" />
                <p className="like-action-text">Dislike</p>
              </button>
              <button className="like-action-container">
                <MdPlaylistAdd className="like-action-icon" />
                <p className="like-action-text">Save</p>
              </button>
            </div>
          </div>
          <hr className="horizontal-ruler" />
          <div className="channel-container">
            <img
              src={profileImageUrl}
              alt="channel-profile-logo"
              className="profile-image"
            />
            <div className="channel-information">
              <h1 className="video-detail-channel-name">{name}</h1>
              <p className="video-detail-channel-subscribers">
                {subscriberCount} subscribers
              </p>
              <p className="video-detail-channel-description">{description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoItemDetailsRoute;
