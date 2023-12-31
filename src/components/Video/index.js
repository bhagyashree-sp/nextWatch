import { Link } from "react-router-dom";
import { useContext } from "react";
import "./index.css";
import context from "../../context/context";

const Video = (props) => {
  const { video } = props;
  const {
    publishedAt,
    thumbnailUrl,
    title,
    viewCount,
    channelName,
    profileImageUrl,
    id,
  } = video;

  const { dark } = useContext(context);

  const currentYear = new Date().getFullYear();
  const publishedYear = new Date(publishedAt).getFullYear();

  const yearsAgo = currentYear - publishedYear;

  return (
    <Link to={`/videos/${id}`} className="video-container">
      <img src={thumbnailUrl} alt="thumbnail" className="thumbnail-image" />
      <div className="channel-container">
        <img
          src={profileImageUrl}
          alt="channelProfile"
          className="profile-image"
        />
        <div>
          <h1 className={dark ? "title title-dark" : "title"}>{title}</h1>
          <h1 className="channel-name">{channelName}</h1>
          <ul className="views-container">
            <li className="video-views">{viewCount} views</li>
            <li className="video-posted">{yearsAgo} years ago</li>
          </ul>
        </div>
      </div>
    </Link>
  );
};

export default Video;
