import { useContext, useState } from "react";
import { MdDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import context from "../../context/context";
import "./index.css";

const Header = () => {
  const { dark, toggleDark } = useContext(context);

  return (
    <div className="header">
      {dark ? (
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png"
          alt="dark-theme"
          className="app-logo"
        />
      ) : (
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
          alt="light-theme"
          className="app-logo"
        />
      )}
      <div className="threeicons">
        {dark ? (
          <button type="button" onClick={toggleDark} className="theme">
            <MdOutlineLightMode className="icon icon-light" />
          </button>
        ) : (
          <button type="button" onClick={toggleDark} className="theme">
            <MdDarkMode className="icon" />
          </button>
        )}

        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
          alt="profile"
          className="profile-logo"
        />
        <button type="button" className={dark ? "logout-dark" : "logout"}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;
