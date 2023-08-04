import { Link } from "react-router-dom";
import { useContext } from "react";
import context from "../../context/context";
import "./index.css";

const TrendingItem = (props) => {
  const { videoItem } = props;
  const { id, title, thumbnailUrl, viewCount } = videoItem;
  const { dark } = useContext(context);

  return (
    <Link to={`/videos/${id}`} className="gaming-card-conatiner">
      <img
        src={thumbnailUrl}
        alt="thumbnail"
        className="gaming-card-thumbnail"
      />
      <h1 className={dark ? "gaming-title gaming-title-dark" : "gaming-title"}>
        {title}
      </h1>
      <p className="gaming-card-views">{viewCount} watching worldwide</p>
    </Link>
  );
};

export default TrendingItem;
