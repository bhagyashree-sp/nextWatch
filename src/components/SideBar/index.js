import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { HiFire } from "react-icons/hi";
import { SiYoutubegaming } from "react-icons/si";
import { MdPlaylistAdd } from "react-icons/md";
import "./index.css";

const SideBar = () => {
  return (
    <div className="side-bar-container">
      <div className="three-links">
        <Link className="linkstyle">
          <AiFillHome className="icon-style" />
          <h1 className="heading">Home</h1>
        </Link>
        <Link className="linkstyle">
          <HiFire className="icon-style" />
          <h1 className="heading">Trending</h1>
        </Link>
        <Link className="linkstyle">
          <SiYoutubegaming className="icon-style" />
          <h1 className="heading">Gaming</h1>
        </Link>
        <Link className="linkstyle">
          <MdPlaylistAdd className="icon-style" />
          <h1 className="heading">Saved Videos</h1>
        </Link>
      </div>
    </div>
  );
};

export default SideBar;
