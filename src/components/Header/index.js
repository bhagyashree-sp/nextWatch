import { useContext, useState } from "react";
import { MdDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import context from "../../context/context";
import Popup from "reactjs-popup";
import "./index.css";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Header = () => {
  const { dark, toggleDark } = useContext(context);
  const navigate = useNavigate();

  const handleLogo = () => {
    navigate("/");
  };

  const onClickConfirm = () => {
    Cookies.remove("jwt_token");
    navigate("/login");
  };

  return (
    <div className="header">
      <button
        type="button"
        className="logo-button-container"
        onClick={handleLogo}
      >
        <img
          src={
            dark
              ? "https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png"
              : "https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
          }
          alt="logo"
          className="app-logo"
        />
      </button>
      <div className="threeicons">
        <button type="button" onClick={toggleDark} className="theme-button">
          {dark ? (
            <MdOutlineLightMode className="theme-icon dark-theme" />
          ) : (
            <MdDarkMode className="theme-icon light-theme" />
          )}
        </button>

        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
          alt="profile"
          className="profile-logo"
        />
        <div className="pop-up-container">
          <Popup
            modal
            trigger={
              <button type="button" className={dark ? "btn btn-dark" : "btn"}>
                Logout
              </button>
            }
          >
            {(close) => (
              <div
                className={
                  dark ? "pop-up-content pop-up-content-dark" : "pop-up-content"
                }
              >
                <p
                  className={
                    dark
                      ? "pop-up-message pop-up-message-dark"
                      : "pop-up-message"
                  }
                >
                  Are you sure you want to logout?
                </p>
                <div className="pop-up-buttons">
                  <button
                    type="button"
                    onClick={() => close()}
                    className={
                      dark
                        ? "cancel-button cancel-button-dark"
                        : "cancel-button"
                    }
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    onClick={onClickConfirm}
                    className={
                      dark
                        ? "confirm-button confirm-button-dark"
                        : "confirm-button"
                    }
                  >
                    Confirm
                  </button>
                </div>
              </div>
            )}
          </Popup>
        </div>
      </div>
    </div>
  );
};

export default Header;
