import { useState } from "react";
import { MdDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import "./index.css";

const Header = () => {
  const [isdarkMode, setDarkMode] = useState(false);

  const onClickTheme = () => {
    setDarkMode(!isdarkMode);
  };

  return (
    <div className="header">
      {isdarkMode ? (
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png"
          alt="dark-theme"
        />
      ) : (
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
          alt="light-theme"
        />
      )}
      <div className="threeicons">
        {isdarkMode ? (
          <button type="button" onClick={onClickTheme} className="theme">
            <MdOutlineLightMode className="icon" />
          </button>
        ) : (
          <button type="button" onClick={onClickTheme} className="theme">
            <MdDarkMode className="icon" />
          </button>
        )}

        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
          alt="profile"
          className="profile-logo"
        />
        <button type="button" className="logout">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;
