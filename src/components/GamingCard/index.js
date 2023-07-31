import { Link } from "react-router-dom";
import "./index.css";

const TrendingItem = (props) => {
  const { videoItem } = props;
  const { id, title, thumbnailUrl, viewCount } = videoItem;

  return (
    <Link to={`/videos/${id}`} className="gaming-card-conatiner">
      <img
        src={thumbnailUrl}
        alt="thumbnail"
        className="gaming-card-thumbnail"
      />
      <h1 className="gaming-title">{title}</h1>
      <p className="gaming-card-views">{viewCount} watching worldwide</p>
    </Link>
  );
};

export default TrendingItem;
