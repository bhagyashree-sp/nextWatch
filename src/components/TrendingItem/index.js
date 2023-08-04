import { Link } from "react-router-dom";
import { useContext } from "react";
import "./index.css";
import context from "../../context/context";

const TrendingItem = (props) => {
  const { videoItem } = props;
  const { publishedAt, thumbnailUrl, title, viewCount, channelName, id } =
    videoItem;

  const currentYear = new Date().getFullYear();
  const publishedYear = new Date(publishedAt).getFullYear();

  const yearsAgo = currentYear - publishedYear;
  const { dark } = useContext(context);
  return (
    <Link to={`/videos/${id}`} className="trending-link-container">
      <img
        src={thumbnailUrl}
        alt="thumbnail"
        className="thumbnail-trending-image"
      />
      <div className="trending-channel-container">
        <h1
          className={
            dark ? "trending-title trending-title-dark" : "trending-title"
          }
        >
          {title}
        </h1>
        <p className="trending-channel-name">{channelName}</p>
        <ul className="views-container">
          <li className="video-views">{viewCount} views</li>
          <li className="video-posted">{yearsAgo} years ago</li>
        </ul>
      </div>
    </Link>
  );
};

export default TrendingItem;
