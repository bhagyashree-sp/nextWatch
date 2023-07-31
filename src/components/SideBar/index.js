import { Link, useLocation } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { HiFire } from "react-icons/hi";
import { SiYoutubegaming } from "react-icons/si";
import { MdPlaylistAdd } from "react-icons/md";
import "./index.css";

const SideBar = () => {
  const { pathname } = useLocation();
  console.log(pathname);

  return (
    <div className="side-bar-container">
      <div className="three-links">
        <Link
          to="/"
          className={pathname === "/" ? "linkstyle" : "non-link-style"}
        >
          <AiFillHome className="icon-style" />
          <h1 className="heading">Home</h1>
        </Link>
        <Link
          to="/trending"
          className={pathname === "/trending" ? "linkstyle" : "non-link-style"}
        >
          <HiFire className="icon-style" />
          <h1 className="heading">Trending</h1>
        </Link>
        <Link
          to="/gaming"
          className={pathname === "/gaming" ? "linkstyle" : "non-link-style"}
        >
          <SiYoutubegaming className="icon-style" />
          <h1 className="heading">Gaming</h1>
        </Link>
        <Link
          className={
            pathname === "/saved-videos" ? "linkstyle" : "non-link-style"
          }
        >
          <MdPlaylistAdd className="icon-style" />
          <h1 className="heading">Saved Videos</h1>
        </Link>
      </div>
      <div className="footer-logo-container">
        <h1 className="footer-heading">CONTACT US</h1>
        <div className="three-logo-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
            alt="facebook logo"
            className="logo"
          />
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
            alt="twitter logo"
            className="logo"
          />
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
            alt="linked in logo"
            className="logo"
          />
        </div>
        <p className="footer-content">
          Enjoy!Now to see your channels and recommendations!
        </p>
      </div>
    </div>
  );
};

export default SideBar;
