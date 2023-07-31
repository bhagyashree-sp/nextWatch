import { Link } from "react-router-dom";
import "./index.css";

const TrendingItem = (props) => {
  const { videoItem } = props;
  const { publishedAt, thumbnailUrl, title, viewCount, channelName, id } =
    videoItem;

  const currentYear = new Date().getFullYear();
  const publishedYear = new Date(publishedAt).getFullYear();

  const yearsAgo = currentYear - publishedYear;

  return (
    <Link to={`/videos/${id}`} className="trending-link-container">
      <img
        src={thumbnailUrl}
        alt="thumbnail"
        className="thumbnail-trending-image"
      />
      <div className="trending-channel-container">
        <div>
          <h1 className="trending-title">{title}</h1>
          <p className="trending-channel-name">{channelName}</p>
          <ul className="views-container">
            <li className="video-views">{viewCount} views</li>
            <li className="video-posted">{yearsAgo} years ago</li>
          </ul>
        </div>
      </div>
    </Link>
  );
};

export default TrendingItem;
